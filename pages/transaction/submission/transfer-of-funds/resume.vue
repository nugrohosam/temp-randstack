<template>
  <div>
    <BackButton />
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Pemegang Polis</p>
        <p class="data-value">
          {{ $isNullWithSpace(
                        myPolicy.policyWithCode.policyHolder.person.firstName
            ) +
            $isNullWithSpace(
              myPolicy.policyWithCode.policyHolder.person.midName
            ) +
            $isNullWithSpace(
              myPolicy.policyWithCode.policyHolder.person.lastName
            ) }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nomor Polis</p>
        <p class="data-value">
          {{ myPolicy.policyWithCode.policyNumber }}
        </p>
      </div>
    </div>
      
    <v-data-table
      :headers="tableResult.headers"
      mobile-breakpoint="480"
      hide-default-footer
      :items="getTransferofFund.items"
      class="mb-4"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.from="{ item }">
        {{ $fundName(item.from) }}
      </template>
      <template v-slot:item.to="{ item }">
        {{ $fundName(item.to) }}
      </template>
      <template v-slot:body.append>
        <tr>
          <td colspan="2"></td>
          <td>Total</td>
          <td>{{ totalUnitChoosen }}</td>
        </tr>
      </template>
    </v-data-table>

    <div class="col-md-12">
      <p class="data-title">Alokasi Investasi Premi (Fund Apportionment)</p>
    </div>
    <v-data-table
      :headers="tableMerger.headers"
      mobile-breakpoint="480"
      hide-default-footer
      :items="mergeSwitching(contractInvests(myPolicy.policyWithCode.coverages))"
      class="mb-4"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.investmentType="{ item }">
        {{ (item.fundCode && $fundName(item.fundCode)) || "-" }}
      </template>
      <template v-slot:item.fundComposition="{ item }">
        {{ (item && $convertCurrency(item.percentage)) }}%
      </template>
    </v-data-table>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showKtpSelfiePreview"
          >
            Lihat
          </button>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-12 d-flex">
        <v-checkbox
          v-model="accepted1"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya Setuju bahwa pengajuan ini juga akan merubah alokasi fund pada
          penempatan dana premi berikutnya
        </p>
      </div>
      <div class="col-12 d-flex">
        <v-checkbox
          v-model="accepted2"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya menyetujui transaksi dan kebenaran data yang disampaikan. Baca
          selengkapnya
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-sm-12">
        <div class="message-bar rounded-lg">
          <div class="d-flex">
            <info-icon class="ic-primary mr-2"></info-icon>
            Pembayaran premi selanjutnya akan dialokasikan sesuai dengan
            perubahan yang ada
          </div>
        </div>
      </div>
    </div>

    <ValidationMessage :validation-message="validationMessage" />

    <div class="row">
      <div class="col-12">
        <button
          class="btn btn-primary btn-save float-right"
          @click.prevent="submit()"
        >
        <save-icon></save-icon> Submit
        </button>
      </div>
    </div>

    <ModalImagePreview
      :src="image_preview.src"
      :show="image_preview.show"
      @closeImagePreview="image_preview.show = false"
    />
  </div>
</template>

<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
import resumePageMixin from "@/mixins/resumePage";

export default {  
  name: "transfer-to-fund-resume",
  mixins: [resumePageMixin],
  components: {
    SaveIcon,
    InfoIcon,
  },
  data() {
    return {
      tableResult: {
        headers: [
          { text: "No", value: "no" },
          { text: "Sumber Dana Investasi", value: "from" },
          { text: "Dana Investasi yang akan dipindahkan", value: "to" },
          { text: "Jumlah Unit Dituju", value: "totalUnit" },
        ],
        body: [],
      },
      tableMerger: {
        headers: [
          { text: "No", value: "no" },
          { text: "Jenis Dana Investasi", value: "investmentType" },
          { text: "Komposisi Fund", value: "fundComposition" },
        ],
        body: [],
      },
      accepted1: false,      
      accepted2: false,      
      validationMessage: [],
      image_preview: {
        src: "",
        show: false,
      },
    };
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Pengalihan Dana (Switching)",
      sub: "Pengalihan Dana (Switching)",
    });
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    totalUnitChoosen() {
      return this.getTransferofFund.items.map((item) => +item.totalUnit).reduce((a, b) => a + b, 0);
    },
    getTransferofFund() {
      return this.$store.getters[
        "submission_transaction/transfer_of_fund/getTransferOfFund"
      ];
    },
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    totalUnits() {
      return this.contractInvests(this.myPolicy.policyWithCode.coverages)
        .map(
          (item) =>
            item.accumUnits 
        )
        .reduce((a, b) => a + b, 0);
    },
  },
  methods: {
    mergeSwitching(contractInvests) {
      var newContractInvestCalc = {};
      var newContractInvest = [];
      
      this.getTransferofFund.items.forEach(item => {
        const to = item.to;
        const from = item.from;
        const percentage = this.getAssignRateFund(this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).premInvestRates, from) * (item.percentage / 100);
        newContractInvestCalc[to] = newContractInvestCalc[to] ? newContractInvestCalc[to] + percentage : percentage;
        newContractInvestCalc[from] = newContractInvestCalc[from] ? newContractInvestCalc[from] - percentage : -percentage;
      });

      Object.keys(newContractInvestCalc).forEach((key) => {
        const index = newContractInvest.indexOf({
            fundCode: key,
        })

        const existingFund = this.getAssignRateFund(this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).premInvestRates, key)
        const calc = existingFund ? existingFund + newContractInvestCalc[key] : newContractInvestCalc[key];

        newContractInvest.push({
          fundCode: key,
          percentage: Math.round(100 * calc)
        })
      })

      const movedFund = newContractInvest.map(x => x.fundCode);
      if (movedFund.length > 0){
        const investNotMoved = contractInvests.filter(x => !movedFund.includes(x.fundCode)).map(x => ({fundCode: x.fundCode, accumUnits: x.accumUnits, percentage: 100 * this.getAssignRateFund(this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).premInvestRates, x.fundCode)}));
        newContractInvest.push(...investNotMoved);
      }

      return newContractInvest;
    },
    getFundPrices(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;

      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? found.bidPrice : 0;
    },
    contractInvests(coverages) {
      var contractInvest = [];

      coverages.forEach((item) => {
        if (item?.contractInvests.length > 0) {
          contractInvest = contractInvest.concat(item.contractInvests);
        }
      });

      return contractInvest.filter(item => this.getAssignRateFund(this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).premInvestRates, item.fundCode) > 0);
    },
    getAssignRateFund(premInvestRates = [], fundCode) {
      if (!premInvestRates.length) return 0;

      const found = premInvestRates.find((item) => item.fundCode === fundCode);
      return found?.assignRate || 0;
    },
    showKtpSelfiePreview: function () {
      if (this.getTransferofFund.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getTransferofFund.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    validate: async function () {
      this.validationMessage = [];
      const calcPrecentage = this.mergeSwitching(this.contractInvests(this.myPolicy.policyWithCode.coverages)).map(x => x.percentage).reduce((a, b) => a + b, 0);
      if (calcPrecentage > 100) {
        this.validationMessage.push(
          "Total Alokasi Investasi Premi tidak 100%, adjust untuk membetulkan"
        );
      }
      if (!this.accepted1) {
        this.validationMessage.push(
          "Setujui transaksi untuk memproses pengajuan"
        );
      } else if (!this.accepted2) {
        this.validationMessage.push(
          "Setujui transaksi untuk memproses pengajuan"
        );
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/transfer_of_fund/transferOfFund",
        );
        if (result && result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path: "./thankyou?transaction_ids=" + transactionIds.join(","),
          });
        }
      }
    },
  },
};
</script>
