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
          {{ $formatDate(loan() && loan().creationDate) }}
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
      <div class="col-lg-12 col-sm-12">
        <div class="message-bar rounded-lg">
          <p><b>Perhatian !</b></p>
          <ul>
            <li>Pembayaran dilakukan di hari yang sama</li>
          </ul>
        </div>
      </div>
    </div>

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
export default {
  name: "payment-policy-loan-resume",
  data() {
    return {
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
  methods: {
    loan() {
      return this.myPolicyLoanInfo?.loanAndDepositInfo?.loanAccountInfo.length > 0 ? this.myPolicyLoanInfo?.loanAndDepositInfo?.loanAccountInfo[0] : null;
    },
    loanDate() {
      return this.loan()?.creationDate ?? "-";
    },
    loanAmount() {
      return this.loan()?.capitalBalance ?? "-";
    },
    bankName(virtualAccountNumber) {
      if (this.myPolicy.policyWithCode.virtualAccountInfo.length) {
        return this.myPolicy.policyWithCode.virtualAccountInfo.find(
          (x) => x.virtualAccountNumber == virtualAccountNumber
        ).bankName;
      }
      return "-";
    },
    showSelfieKtpPreview: function () {
      if (this.getPaymentPolicyLoan.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getPaymentPolicyLoan.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    async submit() {
      const result = await this.$store.dispatch(
        "submission_transaction/policy_loan/repaymentPolicyLoan"
      );
      if (result && result.success == true) {
        this.$router.push({
          path: "/transaction/submission/payment-policy-loan/thankyou",
        });
      }
    },
  },
};
</script>
