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
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Informasi Virtual Account</p>
        <p class="data-value">
          {{ getPaymentPolicyLoan.virtualAccountNumber }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Hutang Pinjaman Polis</p>
        <p class="data-value">{{ $convertCurrency(loanAmount()) }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tanggal Pinjaman Polis</p>
        <p class="data-value">
            {{ this.loanDate() }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Bank</p>
        <p class="data-value">
          {{ bankName(getPaymentPolicyLoan.virtualAccountNumber) }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Bukti Transfer</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showTransferAttachmentPreview"
          >
            Lihat
          </button>
        </p>
      </div>
    </div>

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
            <li>- Pembayaran dilakukan di hari yang sama</li>
          </ul>
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
import { SaveIcon } from "vue-feather-icons";
import resumePageMixin from "@/mixins/resumePage";
export default {
  name: "payment-policy-loan-resume",
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
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getPaymentPolicyLoan() {
      return this.$store.getters[
        "submission_transaction/policy_loan/getPaymentPolicyLoan"
      ];
    },
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Pembayaran Pinjaman Polis",
      sub: "Pengajuan Pinjaman Nilai Tunai Polis",
    });
  },
  destroyed() {
    this.$store.commit("submission_transaction/removeCurrentHeaderTitle");
  },
  methods: {
    loan() {
      return this.myPolicyLoanInfo?.loanAndDepositInfo?.loanAccountInfo.length >
        0
        ? this.myPolicyLoanInfo?.financialInfo?.plBalance
        : null;
    },
    loanAccountInfo() {
      return this.myPolicyLoanInfo?.loanAndDepositInfo?.loanAccountInfo.length >
        0
        ? this.myPolicyLoanInfo?.loanAndDepositInfo?.loanAccountInfo[0]?.creationDate
        : null;
    },
    loanDate() {
      return this.$formatDate(this.loanAccountInfo()) || "-"
    },
    loanAmount() {
      return this.loan() ?? "-";
    },
    bankName(virtualAccountNumber) {
      if (this.myPolicy.policyWithCode.virtualAccountInfo.length) {
        return this.myPolicy.policyWithCode.virtualAccountInfo.find(
          (x) => x.virtualAccountNumber == virtualAccountNumber
        ).bankName;
      }
      return "-";
    },
    showTransferAttachmentPreview() {
      if (this.getPaymentPolicyLoan.transferAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getPaymentPolicyLoan.transferAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showKtpSelfiePreview: function () {
      if (this.getPaymentPolicyLoan.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getPaymentPolicyLoan.ktpSelfieAttachment.file
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
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/policy_loan/repaymentPolicyLoan"
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
