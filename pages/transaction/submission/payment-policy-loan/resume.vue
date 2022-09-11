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
          xxxxxxxx
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
        <p class="data-title mb-2">Batas Pinjaman Polis</p>
        <div class="data-value">
          <v-select
            :items="bankList"
            v-model="getPaymentPolicyLoan.accontId"
            label="Nama Bank"
            solo
          ></v-select>
        </div>
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
    bankList () {
      if (this.myPolicy.policyWithCode.payerBankAccount.length) {
        return this.myPolicy.policyWithCode.payerBankAccount.map((item) => ({
          text: item.bankName,
          value: item.accountId
        }))
      }
      return []
    },
    getPaymentPolicyLoan () {
      return this.$store.getters["submission_transaction/policy_loan/getPaymentPolicyLoan"];
    }
  },
  methods: {
    async submit () {
      const result = await this.$store.dispatch(
        "submission_transaction/policy_loan/repaymentPolicyLoan"
      );
      console.log('result ', result)
      if (result && result.success == true) {
        this.$router.push({
          path: "/transaction/submission/payment-policy-loan/thankyou",
        });
      }
    },
  },
};
</script>
