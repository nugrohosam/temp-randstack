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
        <p class="data-value">
          xxxxxxxx
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tanggal Pinjaman Polis</p>
        <p class="data-value">
          xx/xx/xxxx
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
          {{ getPaymentPolicyLoan.ktpSelfieAttachment }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-sm-12">
        <div class="message-bar rounded-lg">
          <p><b>Perhatian !</b></p>
          <ul>
            <li>
              Pastikan nomor rekening yang tercantum sudah sesuai, jika tidak silahkan hubungi Customer Care 1-500-045
            </li>
            <li>
              Pinjaman Polis akan dikenakan biaya bunga
            </li>
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
  </div>
</template>

<script>
export default {
  name: "payment-policy-loan-resume",
  computed: {
    myPolicy () {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getPaymentPolicyLoan () {
      return this.$store.getters["submission_transaction/policy_loan/getPaymentPolicyLoan"];
    }
  },
  methods: {
    bankName (virtualAccountNumber) {
      if (this.myPolicy.policyWithCode.virtualAccountInfo.length) {
        return this.myPolicy.policyWithCode.virtualAccountInfo.find(x => x.virtualAccountNumber == virtualAccountNumber).bankName
      }
      return "-"
    },
    async submit () {
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
