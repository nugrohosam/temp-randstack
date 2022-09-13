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
          <p class="data-title mb-2">Tanggal Jatuh Tempo</p>
          <p class="data-value">xx/xx/xxxx</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Status Cuti Premi</p>
          <p class="data-value">XX</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Masa Akhir Pembayaran Premi</p>
          <p class="data-value">xx/xx/xxxx</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Masa Wajib Bayar Premi</p>
          <p class="data-value">xx/xx/xxxx</p>
        </div>
      </div>

      <hr class="my-4" />

      <div class="row">
        <div class="col-12">
          <ValidationProvider
            v-if="!isSetHoliday"
            rules="required"
            v-slot="{ errors }"
          >
            <v-radio-group v-model="form.status" row>
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Awal Cuti Premi</p>
          <div class="data-value">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                type="date"
                class="outlined form-control"
                v-model="form.startPremiumHolidayDate"
              />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
            <br />
            <p class="data-title">
              Awal cuti Premi tidak boleh kurang dari Tanggal sistem / Hari ini
            </p>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Akhir Cuti Premi</p>
          <div class="data-value">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                type="date"
                class="outlined form-control"
                v-model="form.endPremiumHolidayDate"
              />
              <span class="text-error">{{ errors[0] }}</span>
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
              <li>Polis tidak dalam masa Cuti Premi Otomatis</li>
              <li>Polis tidak dalam masa Must Pay Period</li>
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
  </ValidationObserver>
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
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    isSetHoliday() {
      return this.myPolicy.policyWithCode.holidayIndi === "N";
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
    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadAttachment",
          { file: e.target.files[0], type: "KTPSELFIE" }
        );
        this.form.ktpSelfieAttachment = e.target.files[0];
      }
    },
    save() {
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
