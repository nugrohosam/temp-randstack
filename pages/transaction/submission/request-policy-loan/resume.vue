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

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Nomor Rekening Manfaat</p>
        <p class="data-value">
          {{ myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? myPolicy.policyWithCode.refundPayeeBankAccount[0].bankAccount : "-" }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Nama Pemegang Rekening Manfaat</p>
        <p class="data-value">
          {{ myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? myPolicy.policyWithCode.refundPayeeBankAccount[0].accoName : "-" }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Bank</p>
        <p class="data-value">
          {{ myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? myPolicy.policyWithCode.refundPayeeBankAccount[0].bankName : "-" }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Batas Pinjaman Polis</p>
        <p class="data-value">Rp 12.000.000</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Pinjaman</p>
        <div class="data-value">
          <div class="form-input">
            <input
              type="text"
              class="outlined"
              placeholder="200.000"
              :value="getRequestPolicyLoan.loanAmount"
              disabled
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
        <p class="data-value">
          {{ getRequestPolicyLoan.ktpSelfieAttachment }}
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
  name: "request-policy-loan-resume",
  computed: {
    myPolicy () {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getRequestPolicyLoan () {
      return this.$store.getters["submission_transaction/policy_loan/getRquestPolicyLoan"];
    }
  },
  methods: {
    async submit () {
      const result = await this.$store.dispatch(
        "submission_transaction/policy_loan/applyPolicyLoan"
      );
      if (result && result.success == true) {
        this.$router.push({
          path: "/transaction/submission/request-policy-loan/thankyou",
        });
      }
    },
  },
};
</script>
