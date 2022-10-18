<template>
  <div>
    <div v-show="showMe">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyHolder.person.firstName }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Polis</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyNumber }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Nomor Rekening Saat Ini</p>
          <p class="data-value">
            {{
              this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
              this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
                ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0]
                    .bankAccount
                : "-"
            }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">
            Nama Pemilik Nomor Rekening Manfaat Saat Ini
          </p>
          <p class="data-value">
            {{
              this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
              this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
                ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0]
                    .accoName
                : "-"
            }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank Saat Ini</p>
          <p class="data-value">
            {{
              this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
              this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
                ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0]
                    .bankName
                : "-"
            }}
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <p class="data-title">Jenis dan Dana Investasi yang dimiliki</p>
        </div>
        <div class="col-12">
          <template>
            <v-data-table
              :headers="table.headers"
              mobile-breakpoint="480"
              hide-default-footer
              :items="contractInvests(myPolicy.policyWithCode.coverages)"
            >
              <template v-slot:item.no="{ index }">
                {{ index + 1 }}
              </template>
              <template v-slot:item.investmentType="{ item }">
                {{ (item.fundCode && $fundName(item.fundCode)) || "-" }}
              </template>
              <template v-slot:item.currency="{ item }">
                {{ $currencyName(myPolicy.policyWithCode.currency) }}
              </template>
              <template v-slot:item.totalUnit="{ item }">
                {{ (item && $convertCurrency(item.accumUnits)) || 0 }}
              </template>
              <template v-slot:item.priceUnit="{ item }">
                {{
                  item &&
                  $convertCurrency(
                    getFundPrices(
                      myPolicy.policyWithCode.fundPrices,
                      item.fundCode
                    )
                  )
                }}
              </template>
              <template v-slot:item.nabDate="{ item }">
                {{
                  getFundPriceDate(
                    myPolicy.policyWithCode.fundPrices,
                    item.fundCode
                  )
                }}
              </template>
              <template v-slot:item.totalInvestment="{ item }">
                {{
                  item &&
                  $convertCurrency(
                    item.accumUnits *
                      getFundPrices(
                        myPolicy.policyWithCode.fundPrices,
                        item.fundCode
                      )
                  )
                }}
              </template>
              <template v-slot:body.append>
                <tr>
                  <td colspan="5"></td>
                  <td>Total</td>
                  <td>{{ $convertCurrency(sumTotalInvestemnt) }}</td>
                </tr>
              </template>
            </v-data-table>
          </template>
        </div>
      </div>
      
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Jenis Dana Investasi yang Dipilih *</p>
          <v-select
            :items="investment_types"
            v-model="investment_choosen"
            dense
            outlined
            class="investment_type_option"
            @input="validationAddInvesment = []"
          ></v-select>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Nilai Penarikan</p>
          <div class="form-input">
            <input
              type="text"
              class="outlined"
              v-model="amount"
              placeholder="200.xxx.xxx"
            />
          </div>
        </div>
      </div>

      <ValidationMessage :validation-message="validationAddInvesment" />
      
      <div class="row">
        <div class="col-4">
          <button
            class="btn btn-primary-outlined w-100 btn-add-investment"
            @click.prevent="addInvestment()"
          >
            {{
              !!form.items.find((item) => item.fundCode === investment_choosen)
                ? "Ubah"
                : "Tambah"
            }}
          </button>
        </div>
      </div>

      <br />
      <v-divider></v-divider>
      <br />

      <div class="row" v-if="form.items.length > 0">
        <div class="col-lg-6 col-sm-12">
          <p class="data-value">
            Data Pengajuan Penarikan Sebagian Dana Investasi
          </p>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">No</th>
                  <th class="text-left">Nama Fund</th>
                  <th class="text-left">Nilai Penarikan</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in form.items" :key="item.fundCode">
                  <td>{{ i + 1 }}</td>
                  <td>
                    <b>{{ $fundName(item.fundCode) }}</b>
                  </td>
                  <td>
                    <b
                      >{{ $currencyName(myPolicy.policyWithCode.currency) }}
                      {{ $convertCurrency(item.applyAmount) }}</b
                    >
                  </td>
                  <td>
                    <button
                      class="btn btn-primary-outlined mt-3 w-100 btn-add-investment"
                      @click.prevent="removeInvestment(i)"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>Total</td>
                  <td>
                    {{
                      `${$currencyName(
                        myPolicy.policyWithCode.currency
                      )} ${$convertCurrency(totalWithdraw)}`
                    }}
                  </td>
                  <td>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
            <input
              type="file"
              ref="inputSelfieKtpImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addSelfieKtpImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputSelfieKtpImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.ktpSelfieAttachment.name }}</small>
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <ValidationMessage :validation-message="validationMessage" />

      <div class="row">
        <div class="col-12">
          <button
            class="btn btn-primary btn-save float-right"
            @click.prevent="save()"
          >
            <save-icon></save-icon> Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "withdraw-partial-investment-fund",
  components: { 
    
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    if (
      $nuxt.$route.name !=
      "transaction-submission-withdraw-partial-investment-fund"
    ) {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  beforeMount() {
    this.modal.show = true;
    this.modal.message = "Menu yang anda pilih masih dalam tahap pengembangan";
  },
  data() {
    return {
      validationMessage: [],
      validationAddInvesment: [],
      form: {
        items: [],
        ktpSelfieAttachment: {},
      },
      modal: {
        message: "",
        show: false,
        button: {
          text: "Tutup",
          redirect_link: "/transaction/submission",
          redirect_type: "spa",
        },
      },
      showMe: true,
      investment_choosen: null,
      amount: null,
      items: [],
      totalWithdraw: 0,
      investment_types: [],
      table: {
        headers: [
          { text: "No", value: "no" },
          { text: "Jenis Dana Investasi", value: "investmentType" },
          { text: "Mata Uang", value: "currency" },
          { text: "Jumlah Unit", value: "totalUnit" },
          { text: "Harga Unit", value: "priceUnit" },
          { text: "Tanggal NAB", value: "nabDate" },
          { text: "Total Investasi", value: "totalInvestment" },
        ],
      },
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      limitPages: [5, 10, 15, 20, 25],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-add-investment-fund") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  mounted() {
    var contractInvest = [];

    this.myPolicy.policyWithCode.coverages.forEach((item) => {
      if (item?.contractInvests.length > 0) {
        contractInvest = contractInvest.concat(item.contractInvests);
      }
    });

    this.investment_types = contractInvest.map((item) => ({
      value: item.fundCode,
      text: this.$fundName(item.fundCode),
    }));
  },
  computed: {
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    sumTotalInvestemnt() {
      return this.contractInvests(this.myPolicy.policyWithCode.coverages)
        .map(
          (item) =>
            item.accumUnits *
            this.getFundPrices(
              this.myPolicy.policyWithCode.fundPrices,
              item.fundCode
            )
        )
        .reduce((a, b) => a + b, 0);
    },
  },
  methods: {
    contractInvests(coverages) {
      var contractInvest = [];

      coverages.forEach((item) => {
        if (item?.contractInvests.length > 0) {
          contractInvest = contractInvest.concat(item.contractInvests);
        }
      });

      return contractInvest;
    },
    removeInvestment(i) {
      this.totalWithdraw -= this.form.items[i].applyAmount;
      this.form.items.splice(i, 1);
    },
    addInvestment() {
      this.validationAddInvesment = [];
      if (!this.investment_choosen) {
        this.validationAddInvesment.push("Jenis Dana Investasi perlu dipilih");
        return false;
      }

      const indexObject = this.$indexOfObject(
        this.form.items,
        this.investment_choosen,
        (v) => v.fundCode
      );
      if (indexObject != -1) {
      this.totalWithdraw -= parseFloat(this.form.items[indexObject].applyAmount);
        this.form.items.splice(indexObject, 1, {
          applyAmount: this.amount,
          applyUnits: null,
          fundCode: this.investment_choosen,
        });
        this.totalWithdraw += parseFloat(this.amount);
      } else {
        this.totalWithdraw += parseFloat(this.amount);
        this.form.items.push({
          applyAmount: this.amount,
          applyUnits: null,
          fundCode: this.investment_choosen,
        });
      }

      this.amount = null;
      this.investment_choosen = null;
    },
    getFundPrices(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;

      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? found.bidPrice : 0;
    },
    getFundPriceDate(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;

      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? this.$moment(found.pricingDate).format("DD/MM/Y") : "-";
    },
    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadSelieKtpFile",
          { file: e.target.files[0] }
        );
        this.form.ktpSelfieAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    sumTopUpValue() {
      return this.form.items
        .map((item) => parseFloat(item.applyAmount))
        .reduce((a, b) => a + b, 0);
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
      if (this.form.items.length < 1) {
        this.validationMessage.push(
          "Pilih dana investasi untuk penarikan dana"
        );
      }
    },
    save: async function () {
      this.validate();
      if (this.validationMessage.length <= 0) {
        this.$store.commit(
          "submission_transaction/withdraw_partial_investment_fund/setWithdrawPartialInvestmentFund",
          this.form
        );
        // patch to action
        this.$router.push({
          path: "./withdraw-partial-investment-fund/resume",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .investment_type_option {
    max-width: 250px !important;
  }
  .btn-add-investment {
    max-width: 250px !important;
  }
  .btn-save {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 150px;
    justify-content: center;
  }
</style>
