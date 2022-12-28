<template>
  <div>
    <form @submit.prevent="save">
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
            <div class="form-input">
              <input
                type="number"
                class="outlined"
                v-model="form.loanAmount"
                placeholder="200.xxx.xxx"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
          <input
            type="file"
            ref="inputSelfieKtpImage"
            v-show="false"
            accept="image/*"
            @change="(e) => addSelfieKtpImage(e)"
          />
          <button
            class="btn btn-primary-outlined"
            @click.prevent="$refs.inputSelfieKtpImage.click()"
          >
            Unggah
          </button>
          <small>{{ form.ktpSelfieAttachment.name }}</small>
          <br />
          <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
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
              <li>
                - Pastikan nomor rekening yang tercantum sudah sesuai, jika
                tidak silahkan hubungi Customer Care 1-500-045
              </li>
              <li>- Pinjaman Polis akan dikenakan biaya bunga</li>
            </ul>
          </div>
        </div>
      </div>

      <ValidationMessage :validation-message="validationMessage" />

      <div class="row">
        <div class="col-12">
          <button class="btn btn-primary btn-save float-right" type="submit">
                        <save-icon></save-icon> Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  name: "request-policy-loan",
  components: {
    SaveIcon,
    InfoIcon,
  },
  data() {
    return {
      form: {
        loanAmount: null,
        ktpSelfieAttachment: {},
      },
      validationMessage: [],
    };
  },
  mounted() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Pengajuan Pinjaman Polis",
    });
    
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
  },
  methods: {
    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadSelieKtpFile",
          {
            file: e.target.files[0],
          }
        );
        this.form.ktpSelfieAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    validate() {
      this.validationMessage = [];
      if (!this.form.loanAmount) {
        this.validationMessage.push("Pinjaman diperlukan");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    save() {
      this.validate();
      if (this.validationMessage.length) return false;
      this.$store.commit(
        "submission_transaction/policy_loan/setRequestPolicyLoan",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/request-policy-loan/resume",
      });
    },
  },
};
</script>
