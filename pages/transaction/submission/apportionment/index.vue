<template>
  <div>
    <form @submit.prevent="save">
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
      </div>

      <div class="row mb-4">
        <div class="col-md-12">
          <p class="data-title">Alokasi Dana Premi Saat Ini</p>
        </div>
        <div class="col-12">
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
            <template v-slot:item.accumUnits="{ item }">
              {{ (item && $convertCurrency(getAssignRateFund(myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).premInvestRates, item.fundCode) * 100)) }}%
            </template>
            <template v-slot:body.append>
              <tr class="lg:hidden md:hidden">
                <td collspan="2">Total</td>
                <td style="text-align: right">100%</td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4">
          <p class="data-title mb-2">
            Jenis Dana Investasi yang akan Dipilih
          </p>
          <div class="data-value">
            <v-select
              v-model="addItemForm.from"
              :items="invesmentOptions"
              dense
              outlined
            />
          </div>
        </div>
        <div class="col-lg-4">
          <p class="data-title mb-2">
            Komposisi Fund Yang Dirubah
          </p>
          <div class="data-value">
            <input
              type="number"
              class="form-control"
              v-model="addItemForm.percentage"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      <validation-message
        :validation-message="errorMessage.haveInvesmentFrom"
        class="mb-4"
      />

      <button class="btn btn-primary-outlined mt-4" @click.prevent="addItem">Tambah</button>

      <hr class="mb-4" />

      <div class="col-md-12">
        <p class="data-title">Data Perubahan Alokasi Dana Premi Lanjutan</p>
      </div>
      <v-data-table
        :headers="tableResult.headers"
        mobile-breakpoint="480"
        hide-default-footer
        :items="tableResult.body"
        class="mb-4"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.from="{ item }">
          {{ $fundName(item.from) }}
        </template>
        <template v-slot:item.percentage="{ item }">
          {{ item.percentage }}%
        </template>
        <template v-slot:item.action="{ index }">
          <button
            class="btn btn-primary-outlined mt-3 w-100 btn-add-investment"
            @click.prevent="removeItem(index)"
          >
            Hapus
          </button>
        </template>
        <template v-slot:body.append>
          <tr class="lg:hidden sm:hidden">
            <td collspan="3">Total</td>
            <td>{{ totalUnitChoosen }}</td>
          </tr>
        </template>
      </v-data-table>

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
            <p><b>Perhatian !</b></p>
            <ul>
              <li>
                - Pembayaran premi selanjutnya akan <b>dialokasikan sesuai dengan perubahan yang ada</b>
              </li>
              <li>- Maksimal fund yang bisa diubah 4</li>
            </ul>
          </div>
        </div>
      </div>

      <ValidationMessage :validation-message="validationMessage" />

      <div class="row">
        <div class="col-12">
          <button class="btn btn-primary btn-save float-right" type="submit">
            <save-icon></save-icon> Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {  
  name: "apportionment",
  components: {
    SaveIcon,
    InfoIcon,
  },
  data() {
    return {
      table: {
        headers: [
          { text: "No", value: "no" },
          { text: "Jenis Dana Investasi", value: "investmentType" },
          { text: "Komposisi Fund", value: "accumUnits" },
        ],
      },
      tableResult: {
        headers: [
          { text: "No", value: "no" },
          { text: "Jenis Dana Investasi", value: "from" },
          { text: "Komposisi Fund", value: "percentage" },
          { text: "Action", value: "action" },
        ],
        body: [],
      },
      addItemForm: {
        from: "",
        percentage: null,
      },
      form: {
        items: [],
        ktpSelfieAttachment: "",
      },
      validationMessage: [],
      invesmentOptions: [],
      errorMessage: {
        haveInvesmentFrom: [],
      },
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    totalUnits() {
      return this.contractInvests(this.myPolicy.policyWithCode.coverages)
        .map(
          (item) =>
            item.accumUnits 
        )
        .reduce((a, b) => a + b, 0);
    },
    totalPrices() {
      return this.contractInvests(this.myPolicy.policyWithCode.coverages)
        .map(
          (item) => this.getFundPrices(this.myPolicy.policyWithCode.fundPrices, item.fundCode)
        )
        .reduce((a, b) => a + b, 0);
    },
    totalUnitChoosen() {
      return this.tableResult.body.map((item) => +item.totalUnit).reduce((a, b) => a + b, 0);
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
  async mounted() {
    const found = this.myPolicy.policyWithCode.coverages.find(
      (item) => item.masterProduct === null
    );
    const result = await this.$store.dispatch(
      "submission_transaction/getProduct",
      found.productId
    );
    this.invesmentOptions = this.contractInvests(this.myPolicy.policyWithCode.coverages).map(
      (item) => ({'value' : item.fundCode, 'text' : this.$fundName(item.fundCode)}));
  },
  methods: {
    contractInvests(coverages) {
      var contractInvest = [];

      coverages.forEach((item) => {
        if (item?.contractInvests.length > 0) {
          contractInvest = contractInvest.concat(item.contractInvests);
        }
      });

      return contractInvest.filter(item => this.getAssignRateFund(this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).premInvestRates, item.fundCode) > 0);
    },
    getFundPrices(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;

      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? found.bidPrice : 0;
    },
    getAssignRateFund(premInvestRates = [], fundCode) {
      if (!premInvestRates.length) return 0;

      const found = premInvestRates.find((item) => item.fundCode === fundCode);
      return found?.assignRate || 0;
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
    getFundPriceDate(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;
      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? this.$moment(found.pricingDate).format("DD/MM/Y") : "-";
    },
    addItem() {
      this.errorMessage.haveInvesmentFrom = []; 
      const isBodyFill = this.tableResult.body.length > 0;
      const found = isBodyFill ? this.tableResult.body.find(
        (item) => item.from === this.addItemForm.from
      ) : null;

      if (found) {
        this.errorMessage.haveInvesmentFrom.push(
          "Jenis Dana Investasi tujuan yang akan Dipindahkan sudah ditambahkan."
        );
        return false;
      } else if (this.addItemForm.from == null || this.addItemForm.from == "") {
        this.errorMessage.haveInvesmentFrom.push(
          "Jenis Dana Investasi harus dipilih."
        );
        return false;
      } 

      if (this.errorMessage.haveInvesmentFrom.length == 0){
        this.tableResult.body.push(this.addItemForm);
        this.form.items.push(this.addItemForm);
        this.addItemForm = {
          from: "",
          percentage: null,
        };
      }
    },
    validate() {
      this.validationMessage = [];
      if (this.form.items.map(x => x.percentage).reduce((a, b) => +a + +b, 0) != 100) {
        this.validationMessage.push("Komposisi Fund harus sama dengan 100%");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    removeItem(index) {
      this.form.items.splice(index, 1);
      this.tableResult.body.splice(index, 1);
    },
    save() {
      this.validate();
      if (this.validationMessage.length) return false;
      this.$store.commit(
        "submission_transaction/apportionment/setApportionment",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/apportionment/resume",
      })
    },
  },
};
</script>
