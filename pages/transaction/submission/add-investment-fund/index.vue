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
          <p class="data-title mb-2">Informasi Virtual Account</p>
          <v-select
            :items="virtualAccountOptions"
            v-model="form.virtualAccountNumber"
            label="Virtual Account"
            dense
            outlined
          ></v-select>
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
          ></v-select>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Amount Top Up ({{ $currencyName(myPolicy.policyWithCode.currency) }})</p>
          <div class="form-input">
            <input type="number" class="outlined" placeholder="200.xxx.xxx" v-model="investment_amount" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <button
            class="btn btn-primary-outlined w-100 btn-add-investment"
            @click.prevent="addInvestment()"
          >
            {{
              !!form.items.find((item) => item.fund_code === investment_choosen)
                ? "Ubah"
                : "Tambah"
            }}
          </button>
        </div>
      </div>

      <br />
      <v-divider></v-divider>
      <br />
      
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-value">Data Pengajuan Top Up Sekaligus</p>
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
                <tr v-for="(item, i) in form.items" :key="item.name">
                  <template v-if="i < form.items.length">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.amount }}</td>
                    <td>
                      <button
                        class="btn btn-primary-outlined mt-3 w-100 btn-add-investment"
                        @click.prevent="removeInvestment(i)"
                      >
                        Hapus
                      </button>
                    </td>
                  </template>
                </tr>
                <tr v-if="form.items.length > 0">
                  <template>
                    <td colspan="1"></td>
                    <td>
                      <b>Total</b>
                    </td>
                    <td>
                      <b>{{ totalAmount }}</b>
                    </td>
                    <td>
                    </td>
                  </template>
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
            <p class="data-title mb-2">Unggah Bukti Transfer (Jika sudah melakukan transfer)</p>
            <input
              type="file"
              ref="inputTransferImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addTransferImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputTransferImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.transferAttachment.name }}</small>
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
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
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar rounded-lg">
              <div class="d-flex">
                <info-icon class="ic-primary mr-2"></info-icon>
                Perhatian !
              </div>
              <br>
              <ul>
                <li>
                  Amount Top up dan uang yang di transfer harus sama!
                </li>
              </ul>
          </div>
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
  name: "add-investment-fund",
  components: {
    SaveIcon,
    InfoIcon,
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
  data() {
    return {
      form: {
        ktpSelfieAttachment: {},
        transferAttachment: {},
        virtualAccountNumber: null,
        items: [],
      },
      showMe: true,
      investment_types: [],
      investment_amount: null,
      investment_choosen: null,
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
      validationMessage: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      limitPages: [5, 10, 15, 20, 25],
    };
  },
  computed: {
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    totalAmount() {
      return this.form.items.length > 0 ? this.form.items.reduce((a, b) => a + b.amount).amount : 0;  
    },
    virtualAccountOptions() {
      if (this.myPolicy.policyWithCode.virtualAccountInfo.length) {
        return this.myPolicy.policyWithCode.virtualAccountInfo.map((item) => ({
          text: `${item.virtualAccountNumber} - ${item.bankAbbrName}`,
          value: item.virtualAccountNumber,
        }));
      }

      return [];
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
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-add-investment-fund") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
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
    async addTransferImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadTransferFile",
          { file: e.target.files[0] }
        );
        this.form.transferAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
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
    contractInvests(coverages) {
      var contractInvest = [];

      coverages.forEach((item) => {
        if (item?.contractInvests.length > 0) {
          contractInvest = contractInvest.concat(item.contractInvests);
        }
      });

      return contractInvest;
    },
    validate() {
      this.validationMessage = [];
      if (!this.form.virtualAccountNumber) {
        this.validationMessage.push("Virtual Account Number diperlukan");
      }
      if (this.form.items.length < 1) {
        this.validationMessage.push("Dana Topup yang akan diajukan diperlukan");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    save: async function () {
      this.validate();
      if (this.validationMessage.length <= 0) {
        this.$store.commit(
          "submission_transaction/add_investment_fund/setAddInvestmentFund",
          this.form
        );

        // patch to action
        this.$router.push({
          path: "./add-investment-fund/resume",
        });
      }
    },
    removeInvestment(i) {
      this.form.items.splice(i, 1);
    },
    addInvestment: async function () {
      const indexObject = this.$indexOfObject(
        this.form.items,
        this.investment_choosen,
        (v) => v.fund_code
      );

      if (indexObject != -1) {
        this.form.items.splice(indexObject, 1, 
        {
          fund_name: this.$fundName(this.investment_choosen),
          fund_code: this.investment_choosen,
          amount: this.investment_amount,
        })
      } else {
        this.form.items.push({
          fund_name: this.$fundName(this.investment_choosen),
          fund_code: this.investment_choosen,
          amount: this.investment_amount,
        })
      }
      this.investment_choosen = null;
      this.investment_amount = null;
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
