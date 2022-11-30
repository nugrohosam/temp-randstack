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
    </v-data-table>

    <v-data-table
      :headers="tableMerger.headers"
      mobile-breakpoint="480"
      hide-default-footer
      :items="tableMerger.body"
      class="mb-4"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>
    </v-data-table>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Lihat Foto Selfie dengan KTP</p>
        <button
          class="btn btn-primary-outlined"
          @click.prevent="showSelfieKtpPreview"
        >
          Lihat Foto
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-12 d-flex">
        <v-checkbox
          v-model="accepted"
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
          v-model="accepted"
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

    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary btn-save float-right">
          <save-icon></save-icon> Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
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
          { text: "Jenis Dana Investasi", value: "" },
          { text: "Komposisi Fund", value: "" },
        ],
        body: [],
      },
      form: {
        ktpSelfieAttachment: "",
      },
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getTransferofFund() {
      s;
      return this.$store.getters[
        "submission_transaction/transfer_of_fund/getTransferOfFund"
      ];
    },
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
  },
  methods: {
    showSelfieKtpPreview: function () {
      if (this.getTransferofFund.selfieKtpFile) {
        this.image_preview.src = URL.createObjectURL(
          this.getTransferofFund.selfieKtpFile
        );
        this.image_preview.show = true;
      }
    },
  },
};
</script>
