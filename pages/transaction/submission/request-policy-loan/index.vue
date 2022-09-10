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
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Nomor Rekening Manfaat</p>
          <p class="data-value">
            {{ this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].bankAccount : "-" }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Nama Pemegang Rekening Manfaat</p>
          <p class="data-value">
            {{ this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].accoName : "-" }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank</p>
          <p class="data-value">
            {{ this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].bankName : "-" }}
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
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input
                  type="number"
                  class="outlined"
                  v-model="form.loanAmount"
                  placeholder="200.000"
                />
                <br />
                <span class="text-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
        </div>
      </div>
  
      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
          <ValidationProvider rules="required|image" v-slot="{ validate, errors }">
            <input
              type="file"
              ref="inputSelfieKtpImage"
              v-show="false"
              accept="image/*"
              @change="(e) => {
                validate(e)
                addSelfieKtpImage(e)
              }"
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputSelfieKtpImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.ktpSelfieAttachment }}</small>
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
            type="submit"
          >
            Simpan
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: "request-policy-loan",
  data () {
    return {
      form: {
        loanAmount: null,
        ktpSelfieAttachment: ''
      }
    }
  },
  methods: {
    async addSelfieKtpImage (e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch("submission_transaction/uploadSelieKtpFile", {
          file: e.target.files[0],
        });
        this.form.ktpSelfieAttachment = result.name
      }
    },
    save () {
      // patch to action
      this.$store.commit('submission_transaction/policy_loan/setRequestPolicyLoan', this.form)
      this.$router.push({ path: "./request-policy-loan/resume" });
    },
  },
};
</script>
