<template>
  <div>
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

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tanggal Jatuh Tempo Polis</p>
        <p class="data-value">{{ $formatDate(dueDatePremi) }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Premi yang ditagihkan</p>
        <p class="data-value">
          {{
            $currencyName(myPolicy.policyWithCode.currency)
          }}
          {{ $convertCurrency(totalPremAll(myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null))) }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Metode Pembayaran</p>
        <p class="data-value">
          {{ $labelPaymentMethod(myPolicy.policyWithCode.payerAccounts[0].paymentMethod) }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Frekuensi Pembayaran Saat Ini</p>
        <p class="data-value">
          {{
            $paymentFrequency(
              myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).currentPremium.paymentFreq
            ) || "-"
          }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2 d-flex">Masa Pembayaran Premi</p>
        <p class="data-value">{{ $formatDate(myPolicy.policyWithCode.lockedPeriodDate) }}</p>
      </div>
    </div>

    <hr class="my-4" />

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Frekuensi Pembayaran Baru</p>
        <p class="data-value">
          {{
            $paymentFrequency(getChangePaymentFreq.paymentFreq) || "-"
          }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
        <div class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showKtpSelfiePreview"
          >
            Lihat
          </button>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted"
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
                Perhatian !
              </div>
              <br>
          <ul>
            <li>- Jumlah Premi yang harus dibayarkan akan disesuaikan dengan frekuensi pembayaran yang dipilih</li>
          </ul>
        </div>
      </div>
    </div>

    <ValidationMessage :validation-message="validationMessage" />

    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary btn-save float-right" @click="submit">
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
import resumePageMixin from "@/mixins/resumePage";
import InfoPanel from "../../../../components/InfoPanel.vue";
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  components: {
    SaveIcon,
    InfoIcon,
    InfoPanel
  },
  mixins: [resumePageMixin],
  data() {
    return {
      accepted: false,
      validationMessage: [],
      image_preview: {
        src: "",
        show: false,
      },
    };
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Perubahan Frekuensi Pembayaran",
      sub: "Perubahan Frekuensi Pembayaran",
    });
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    paidupDatePremi() {
      return (
        this.myPolicy.policyWithCode.coverages.find(
          (x) => x.masterProduct == null
        )?.paidupDate || "-"
      );
    },
    dueDatePremi() {
      return (
        this.myPolicy.policyWithCode.coverages.find(
          (x) => x.masterProduct == null
        )?.coverageExtend?.dueDate || "-"
      );
    },
    getChangePaymentFreq() {
      return this.$store.getters[
        "submission_transaction/change_payment_freq/getChangePaymentFreq"
      ];
    },
  },
  methods: {
    showKtpSelfiePreview: function () {
      if (this.getChangePaymentFreq.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangePaymentFreq.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.accepted) {
        this.validationMessage.push(
          "Setujui transaksi untuk memproses pengajuan"
        );
      }
    },
    totalPremAll: (item) => {
      return item
        ? item.currentPremium.stdPremAf +
            (item.recurringTopup?.topupAmount || 0)
        : 0;
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/change_payment_freq/changePaymentFreq"
        );
        if (result && result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path:
              "/transaction/submission/change-payment-freq/thankyou?transaction_ids=" +
              transactionIds.join(","),
          });
        }
      }
    },
  },
};
</script>