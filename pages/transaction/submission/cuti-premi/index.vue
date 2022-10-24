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
          <p class="data-value">{{ $formatDate(dueDatePremi) }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Status Cuti Premi</p>
          <p class="data-value">{{ myPolicy.policyWithCode.holidayIndi == "Y" ? "Ya" : "Tidak"}}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Masa Akhir Pembayaran Premi</p>
          <p class="data-value">{{ $formatDate(paidupDatePremi) }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2 d-flex">Masa Wajib Bayar Premi&nbsp
            <span>
              <VDropdown :distance="6" :skidding="-190">
                <button>
                  <info-icon class="ic-primary mr-2"></info-icon>
                </button>
                <template #popper>
                  <div style="width: 240px; border-radius: 40px">
                    <InfoPanel :style="'max-height: 420px;'" :information="'Pengajuan cuti tidak bisa diajukan jika masa wajib bayar premi masih di atas tanggal awal pengajuan cuti premi'" />
                  </div>
                </template>
              </VDropdown>
            </span>
          </p>
          <p class="data-value">{{ $formatDate(myPolicy.policyWithCode.lockedPeriodDate) }}</p>
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

      <div v-if="!isSetHoliday" class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Awal Cuti Premi Sebelumnya</p>
          <div class="data-value">
            {{ $formatDate(form.oldStartPremiumHolidayDate) }}
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Akhir Cuti Premi Sebelumnya</p>
          <div class="data-value">
            {{ $formatDate(form.oldEndPremiumHolidayDate) }}
          </div>
        </div>
      </div>

      <hr class="my-4" v-if="!isSetHoliday" />

      <div v-if="form.status != 'cancel'" class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Awal Cuti Premi Yang Diajukan</p>
          <div class="data-value">
            {{ startFixHolidayDate }}
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Akhir Cuti Premi Yang Diajukan</p>
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
              <div class="d-flex">
                <info-icon class="ic-primary mr-2"></info-icon>
                Perhatian !
              </div>
              <br>
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
import { InfoIcon } from "vue-feather-icons";
import InfoPanel from "../../../../components/InfoPanel.vue";

export default {
  components: {
    InfoIcon,
    InfoPanel
  },  
  name: "cuti-premi",
  data() {
    return {
      form: {
        status: "",
        startPremiumHolidayDate: "",
        endPremiumHolidayDate: "",
        oldStartPremiumHolidayDate: "",
        oldEndPremiumHolidayDate: "",
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
      return this.myPolicy.policyWithCode.coverages?.find(x => x?.masterProduct == null || false)?.coverageExtend?.dueDate || '-'
    },
    paidupDatePremi() {
      return this.myPolicy.policyWithCode.coverages?.find(x => x?.masterProduct == null || false)?.paidupDate || '-'
    },
    startFixHolidayDate() {
      const dueDate = new Date(this.dueDatePremi)
      return this.$formatDate(dueDate)
    },
  },
  mounted() {
    const date = this.myPolicy.policyWithCode.holidayIndi == "Y" ? this.myPolicy.policyWithCode.holidayEndDate : this.form.endPremiumHolidayDate;
    this.form.endPremiumHolidayDate = date != "" ? date.slice(0,10) : "";

    if (!this.isSetHoliday) {
      this.form.oldStartPremiumHolidayDate = this.myPolicy.policyWithCode.holidayStartDate;
      this.form.oldEndPremiumHolidayDate = this.myPolicy.policyWithCode.holidayEndDate;
    }
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
      if (this.form.status != "cancel") {
        if (this.form.status == "set" && !this.form.startPremiumHolidayDate) {
          this.validationMessage.push("Tanggal Awal Cuti Premi diperlukan");
        }
        if (!this.form.endPremiumHolidayDate) {
          this.validationMessage.push("Tanggal Akhir Cuti Premi diperlukan");
        }
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    save() {
      const dueDate = new Date(this.dueDatePremi)
      this.form.startPremiumHolidayDate = this.$moment(dueDate).format("YYYY-MM-DD");
      this.form.endPremiumHolidayDate = this.myPolicy.policyWithCode.holidayIndi == "Y" && this.form.status == "cancel" ? this.myPolicy.policyWithCode.holidayEndDate : this.form.endPremiumHolidayDate;
      this.form.endPremiumHolidayDate = this.$moment(this.form.endPremiumHolidayDate).format("YYYY-MM-DD")
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
