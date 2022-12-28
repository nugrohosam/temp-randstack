<template>
  <div>
    <BackButton />
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
      
    <div class="col-md-12">
      <p class="data-title">Alokasi Dana Premi Saat Ini</p>
    </div>
    <v-data-table
      :headers="tableExisting.headers"
      mobile-breakpoint="480"
      hide-default-footer
      :items="contractInvests(myPolicy.policyWithCode.coverages)"
      class="mb-4"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.from="{ item }">
        {{ (item.fundCode && $fundName(item.fundCode)) || "-" }}
      </template>
      <template v-slot:item.percentage="{ item }">
        {{ (item && $convertCurrency(getAssignRateFund(myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).premInvestRates, item.fundCode) * 100)) }}%
      </template>
      <template v-slot:body.append>
        <tr>
          <td colspan="1"></td>
          <td>Total</td>
          <td>{{ $convertCurrency(100) }}%</td>
        </tr>
      </template>
    </v-data-table>

    <div class="col-md-12">
      <p class="data-title">Data Perubahan Alokasi Dana Premi Lanjutan</p>
    </div>
    <v-data-table
      :headers="tableResult.headers"
      mobile-breakpoint="480"
      hide-default-footer
      :items="getApportionment.items"
      class="mb-4"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.from="{ item }">
        {{ $fundName(item.from) }}
      </template>
      <template v-slot:item.percentage="{ item }">
        {{ $convertCurrency(item.percentage) }}%
      </template>
      <template v-slot:body.append>
        <tr>
          <td colspan="1"></td>
          <td>Total</td>
          <td>{{ $convertCurrency(totalPercentageChoosen) }}%</td>
        </tr>
      </template>
    </v-data-table>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showSelfieKtpPreview"
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
          penempatan dana premi berikutnya.
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
          Saya menyetujui transaksi dan kebenaran data yang disampaikan.
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
  name: "apportionment-resume",
  mixins: [resumePageMixin],
  components: {
    SaveIcon,
    InfoIcon,
  },
  data() {
    return {
      tableExisting: {
        headers: [
          { text: "No", value: "no" },
          { text: "Sumber Dana Investasi", value: "from" },
          { text: "Dana Investasi Saat Ini", value: "percentage" },
        ],
        body: [],
      },
      tableResult: {
        headers: [
          { text: "No", value: "no" },
          { text: "Sumber Dana Investasi", value: "from" },
          { text: "Dana Investasi yang akan dipindahkan", value: "percentage" },
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
      title: "Resume Perubahan Alokasi Dana Investasi",
      sub: "Perubahan Alokasi Dana Investasi",
    });
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    totalPercentageChoosen() {
      return this.getApportionment.items.map((item) => +item.percentage).reduce((a, b) => +a + +b, 0);
    },
    getApportionment() {
      return this.$store.getters[
        "submission_transaction/apportionment/getApportionment"
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
    getAssignRateFund(premInvestRates = [], fundCode) {
      if (!premInvestRates.length) return 0;

      const found = premInvestRates.find((item) => item.fundCode === fundCode);
      return found?.assignRate || 0;
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

      return contractInvest.filter(item => item.accumUnits > 0);
    },
    showSelfieKtpPreview: function () {
      if (this.getApportionment.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getApportionment.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    validate: async function () {
      this.validationMessage = [];
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
          "submission_transaction/apportionment/apportionment",
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
