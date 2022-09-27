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
          <p class="data-title mb-2">Tanggal Jatuh Tempo</p>
          <p class="data-value">{{ dueDatePremi }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Status Cuti Premi</p>
          <p class="data-value">{{ myPolicy.policyWithCode.holidayIndi == "Y" ? "Ya" : "Tidak"}}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Masa Akhir Pembayaran Premi</p>
          <p class="data-value">{{ paidupDatePremi }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Masa Wajib Bayar Premi</p>
          <p class="data-value">{{ myPolicy.policyWithCode.lockedPeriodDate }}</p>
        </div>
      </div>

      <hr class="my-4" />

      <div v-if="!isSetHoliday" class="row">
        <div class="col-12">
          <v-radio-group v-model="form.status" row @change="changeStatus">
            <v-radio
              v-for="(item, index) in radios"
              :key="index"
              color="#F15921"
              v-bind="item"
            ></v-radio>
          </v-radio-group>
        </div>
      </div>

      <div v-if="form.status != 'cancel'" class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Awal Cuti Premi</p>
          <div class="data-value">
            {{ startFixHolidayDate }}
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Akhir Cuti Premi</p>
          <div class="data-value">
            <input
              type="date"
              class="outlined form-control"
              v-model="form.endPremiumHolidayDate"
            />
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Batal</p>
          <div class="data-value">
            <input
              type="date"
              class="outlined form-control"
              :value="$moment().format('YYYY-MM-DD')"
              disabled
            />
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
            <p><b>Perhatian !</b></p>
            <ul>
              <li>Polis tidak dalam masa Cuti Premi Otomatis</li>
              <li>Polis tidak dalam masa Must Pay Period</li>
            </ul>
          </div>
        </div>
      </div>

      <ValidationMessage :validation-message="validationMessage" />

      <div class="row">
        <div class="col-12">
          <button class="btn btn-primary btn-save float-right" type="submit">
            Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  
  name: "cuti-premi",
  data() {
    return {
      form: {
        status: "",
        startPremiumHolidayDate: "",
        endPremiumHolidayDate: "",
        ktpSelfieAttachment: {},
      },
      radios: [
        { label: "Perubahan Tanggal Cuti", value: "change" },
        { label: "Pembatalan Cuti Premi", value: "cancel" },
      ],
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
    isSetHoliday() {
      return this.myPolicy.policyWithCode.holidayIndi === "N";
    },
    dueDatePremi() {
      return this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null)?.coverageExtend?.dueDate || '-'
    },
    paidupDatePremi() {
      return this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null)?.paidupDate || '-'
    },
    startFixHolidayDate() {
      const dueDate = new Date(this.dueDatePremi)
      return this.$moment(dueDate.setMonth(dueDate.getMonth() + 1)).format("YYYY-MM-DD")
    },
  },
  watch: {
    isSetHoliday: {
      handler() {
        this.form.status = this.isSetHoliday ? "set" : "change";
      },
      immediate: true,
    },
  },
  methods: {
    changeStatus() {
      this.form.startPremiumHolidayDate = "";
      this.form.endPremiumHolidayDate = "";
    },
    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadAttachment",
          { file: e.target.files[0], type: "KTPSELFIE" }
        );
        this.form.ktpSelfieAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    validate() {
      this.validationMessage = [];
      if (!this.form.startPremiumHolidayDate) {
        this.validationMessage.push("Tanggal Awal Cuti Premi diperlukan");
      }
      if (!this.form.endPremiumHolidayDate) {
        this.validationMessage.push("Tanggal Akhir Cuti Premi diperlukan");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    save() {
      this.form.startPremiumHolidayDate = this.startFixHolidayDate
      this.validate();
      if (this.validationMessage.length) return false;
      this.$store.commit(
        "submission_transaction/cuti_premi/setCutiPremi",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/cuti-premi/resume",
      });
    },
  },
};
</script>
