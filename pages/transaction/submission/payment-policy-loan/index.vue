<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(save)">
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
            {{ $formatDate(loan() && loan().creationDate) }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank</p>
          <div>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-select
                :items="bankList"
                v-model="form.virtualAccountNumber"
                label="Pilih Bank"
                solo
                :error-messages="errors[0]"
              ></v-select>
            </ValidationProvider>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <input
              type="file"
              ref="inputSelfieKtpImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addSelfieKtpImage(e);
                }
              "
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
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar rounded-lg">
            <p><b>Perhatian !</b></p>
            <ul>
              <li>Pembayaran dilakukan di hari yang sama</li>
              <li>
                Pembayaran bisa dilakukan melalui pemindahbukuan/transfer dari
                Bank mana saja atau melalui ATM bersama, dengan mengisikan nomor
                rekening tujuan Virtual Account tersebut
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <button class="btn btn-primary btn-save float-right" type="submit">
            Simpan
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
  </ValidationObserver>
</template>

<script>
export default {
  name: "payment-policy-loan",
  data() {
    return {
      form: {
        virtualAccountNumber: null,
        ktpSelfieAttachment: {},
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
      sub: "Pengajuan Pinjaman Nilai Tunai Polis",
    });
    if (
      this.myPolicyLoanInfo?.loanAndDepositInfo?.loanAccountInfo?.length === 0
    ) {
      this.modal.show = true;
      this.modal.message = "Maaf anda tidak dapat melakukan pembayaran.";
    }
  },
  destroyed() {
    this.$store.commit("submission_transaction/removeCurrentHeaderTitle");
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
    save() {
      // patch to action
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
