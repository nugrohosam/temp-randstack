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
            {{ this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].bankAccount : "-" }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">
            Nama Pemilik Nomor Rekening Manfaat Saat Ini
          </p>
          <p class="data-value">
            {{ this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].accoName : "-" }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank Saat Ini</p>
          <p class="data-value">
            {{ this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].bankName : "-" }}
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
          ></v-select>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Nilai Penarikan </p>
          <div class="form-input">
            <input type="text" class="outlined" v-model="amount" placeholder="200.xxx.xxx" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <button
            class="btn btn-primary-outlined w-100 btn-add-investment"
            @click.prevent="addInvestment()"
          >
            {{ $indexOfObject(form.items, investment_choosen, v => v.applyUnit) == -1 ? "Tambah" : "Ubah"}}
          </button>
        </div>
      </div>
      <br />
      <v-divider></v-divider>
      <br />
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-value">Data Pengajuan Penarikan Sebagian Dana Investasi</p>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">No</th>
                  <th class="text-left">Nama Fund</th>
                  <th class="text-left">Nilai Top Up</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in form.items" :key="item.applyUnit">
                  <td>{{ i + 1 }}</td>
                  <td>
                    <b>{{ $fundName(item.applyUnit) }}</b>
                  </td>
                  <td>
                    <b>{{ $currencyName(myPolicy.policyWithCode.currency) }} {{ $convertCurrency(item.applyAmount * applyUnit) }}</b>
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
  name: "widthdrawal-partial-investment-fund",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    if (
      $nuxt.$route.name !=
      "transaction-submission-widthdrawal-partial-investment-fund"
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
        if (item.contractInvests.length > 0) {
          contractInvest = contractInvest.concat(item.contractInvests);
        }
      });

    this.investment_types = contractInvest.map(item => ({value: item.fundCode, text: this.$fundName(item.fundCode)}))
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
  },
  methods: {
    contractInvests(coverages) {
      var contractInvest = [];

      coverages.forEach((item) => {
        if (item.contractInvests.length > 0) {
          contractInvest = contractInvest.concat(item.contractInvests);
        }
      });

      return contractInvest;
    },
    removeInvestment(i) {
      this.form.items.splice(i, 1)
    },
    addInvestment() {
      const contractInvests = this.contractInvests(this.myPolicy.policyWithCode.coverages)
      const totalAmount = contractInvests.reduce((a, item) => this.getFundPrices(this.myPolicy.policyWithCode.fundPrices, this.investment_choosen) * item.accumUnits, 0)
      if (totalAmount < this.amount) {
        alert('tidak bisa memasukkan lebih dari fund')
        return;
      }
      
      const fund = contractInvests.find(item => item.fundCode == this.investment_choosen);
      const bidPrice = this.getFundPrices(this.myPolicy.policyWithCode.fundPrices, this.investment_choosen)
      const indexObject = this.$indexOfObject(this.form.items, this.investment_choosen, v => v.applyUnit)
      if (indexObject != -1) {
        this.form.items.splice(indexObject, 1, {
          applyAmount: bidPrice,
          applyUnit: this.amount / fund.accumUnits,
          fundCode: this.investment_choosen
        })
      } else {
        this.form.items.push({
          applyAmount: bidPrice,
          applyUnit: this.amount / fund.accumUnits,
          fundCode: this.investment_choosen
        })
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
    save: async function () {
      // patch to action
      this.$store.commit(
        "submission_transaction/withdraw_partial_investment_fund/setWithdrawPartialInvestmentFund",
        this.form
      );
      // patch to action
      this.$router.push({ path: "./widthdrawal-partial-investment-fund/resume" });
    },
    add: async function () {},
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
