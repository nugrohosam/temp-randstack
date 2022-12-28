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
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Informasi Virtual Account</p>
          <p class="data-value">{{ form.virtualAccountNumber }}</p>
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
          <div>
            <v-select
              :items="bankList"
              v-model="form.virtualAccountNumber"
              label="Pilih Bank"
              solo
            ></v-select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">Unggah Bukti Transfer</p>
          <input
            type="file"
            ref="inputBuktiTransferImage"
            v-show="false"
            accept="image/*"
            @change="(e) => addBuktiTransferImage(e)"
          />
          <button
            class="btn btn-primary-outlined"
            @click.prevent="$refs.inputBuktiTransferImage.click()"
          >
            Unggah
          </button>
          <small>{{ form.transferAttachment.name }}</small>
          <br />
          <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
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
              <li>- Pembayaran dilakukan di hari yang sama</li>
              <li>- Pembayaran bisa dilakukan melalui pemindahbukuan/transfer dari
                Bank mana saja atau melalui ATM bersama, dengan mengisikan nomor
                rekening tujuan Virtual Account tersebut
              </li>
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

    <ModalMessage
      :message="modal.message"
      :show="modal.show"
      :button="modal.button"
      @closeModal="modal.show = false"
    />
  </div>
</template>

<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  name: "payment-policy-loan",
  components: {
    SaveIcon,
    InfoIcon,
  },
  data() {
    return {
      form: {
        virtualAccountNumber: null,
        ktpSelfieAttachment: {},
        transferAttachment: {},
      },
      modal: {
        message: "",
        show: false,
        button: {
          text: "Tutup",
          redirect_link: "/transaction/submission/policy-loan",
          redirect_type: "spa",
        },
      },
      validationMessage: [],
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
    bankList() {
      if (this.myPolicy.policyWithCode.virtualAccountInfo.length) {
        return this.myPolicy.policyWithCode.virtualAccountInfo.map((item) => {
          return {
            text: item.bankName,
            value: item.virtualAccountNumber,
          };
        });
      }
      return [];
    },
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Pembayaran Pinjaman Polis",
      sub: "Pembayaran Pinjaman Nilai Tunai Polis",
    });
    if (
      this.myPolicyLoanInfo?.loanAndDepositInfo?.loanAccountInfo?.length === 0 
      ||
      this.myPolicyLoanInfo?.loanAndDepositInfo?.loanAccountInfo?.length > 0 && this.myPolicyLoanInfo?.financialInfo?.plBalance === 0 
    ) {
      this.modal.show = true;
      this.modal.message = "Maaf anda tidak dapat melakukan pembayaran karena tidak ada pinjaman.";
    }
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
    async addBuktiTransferImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadAttachment",
          { file: e.target.files[0], type: "TRANSFER" }
        );
        this.form.transferAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadSelieKtpFile",
          { file: e.target.files[0] }
        );
        this.form.ktpSelfieAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    validate() {
      this.validationMessage = [];
      if (!this.form.virtualAccountNumber) {
        this.validationMessage.push("Virtual Account Number diperlukan");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    save() {
      this.validate();
      if (this.validationMessage.length) return false;
      this.$store.commit(
        "submission_transaction/policy_loan/setPaymentPolicyLoan",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/payment-policy-loan/resume",
      });
    },
  },
};
</script>
