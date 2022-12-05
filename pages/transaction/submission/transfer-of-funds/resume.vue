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

    <v-data-table
      :headers="tableMerger.headers"
      mobile-breakpoint="480"
      hide-default-footer
      :items="contractInvests(myPolicy.policyWithCode.coverages)"
      class="mb-4"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.investmentType="{ item }">
        {{ (item.fundCode && $fundName(item.fundCode)) || "-" }}
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
          Submit
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
          { text: "Komposisi Fund", value: "" },
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
  },
  methods: {
    contractInvests(coverages) {
      var contractInvest = [];

      coverages.forEach((item) => {
        if (item?.contractInvests.length > 0) {
          contractInvest = contractInvest.concat(item.contractInvests);
        }
      });

      console.log(contractInvest)
      return contractInvest;
    },
    showSelfieKtpPreview: function () {
      if (this.getTransferofFund.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getTransferofFund.ktpSelfieAttachment.file
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
