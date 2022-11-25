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
          {{
            myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
            myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
              ? myPolicy.policyWithCode.refundPayeeBankAccount[0].bankAccount
              : "-"
          }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Nama Pemegang Rekening Manfaat</p>
        <p class="data-value">
          {{
            myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
            myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
              ? myPolicy.policyWithCode.refundPayeeBankAccount[0].accoName
              : "-"
          }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Bank</p>
        <p class="data-value">
          {{
            myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
            myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
              ? myPolicy.policyWithCode.refundPayeeBankAccount[0].bankName
              : "-"
          }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Batas Pinjaman Polis</p>
        <p class="data-value">
          {{
            myPolicyLoanInfo
              ? $convertCurrency(myPolicyLoanInfo.financialInfo.netLoan)
              : "0"
          }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Pinjaman</p>
        <div class="data-value">
          {{ $convertCurrency(getRequestPolicyLoan.loanAmount) }}
        </div>
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
          <p><b>Perhatian !</b></p>
          <ul>
            <li>
              - Pastikan nomor rekening yang tercantum sudah sesuai, jika tidak
              silahkan hubungi Customer Care 1-500-045
            </li>
            <li>- Pinjaman Polis akan dikenakan biaya bunga</li>
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
import resumePageMixin from "@/mixins/resumePage";

export default {
  name: "request-policy-loan-resume",
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
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
    getRequestPolicyLoan() {
      return this.$store.getters[
        "submission_transaction/policy_loan/getRequestPolicyLoan"
      ];
    },
  },
  methods: {
    showSelfieKtpPreview: function () {
      if (this.getRequestPolicyLoan.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getRequestPolicyLoan.ktpSelfieAttachment.file
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
          "submission_transaction/policy_loan/applyPolicyLoan"
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
