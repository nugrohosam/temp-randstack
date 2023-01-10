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
          <p class="data-title mb-2">Masa Tahun Premi Saat Ini</p>
          <p class="data-value">{{ (+(paidupDatePremi.substring(0, 4)) - +(issueDatePremi.substring(0, 4))) }} Tahun</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Jatuh Tempo Polis</p>
          <p class="data-value">{{ $formatDate(dueDatePremi) }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Akhir Premi</p>
          <p class="data-value">{{ $formatDate(paidupDatePremi) }}</p>
        </div>
      </div>

      <hr class="my-4" />

      <div class="row">
        <div class="col-lg-4">
          <p class="data-title mb-2">
            Masa Tahun Premi
          </p>
          <div class="data-value">
            <input
              type="number"
              class="form-control"
              v-model="form.term"
              min="0"
              max="100"
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
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">Unggah Ilustrasi</p>
            <input
              type="file"
              ref="inputIlustrationImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addIlustrationImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputIlustrationImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.ilustrationAttachment.name }}</small>
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
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
                <li>- Perubahan Masa Pembayaran Premi akan mempengaruhi berapa premi yang harus dibayar</li>
                <li>- Perubahan Masa Pembayaran Premi dapat menghubungi Pemasar untuk bantuan dan illustrasih</li>
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
import InfoPanel from "../../../../components/InfoPanel.vue";

export default {
  components: {
    SaveIcon,
    InfoIcon,
    InfoPanel
  },  
  name: "cuti-premi",
  data() {
    return {
      form: {
        term: "",
        ktpSelfieAttachment: {},
        ilustrationAttachment: {},
      },
      validationMessage: [],
    };
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Perubahan Masa Pembayaran",
      sub: "Pengajuan Perubahan Masa Pembayaran",
    });
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    dueDatePremi() {
      return (
        this.myPolicy.policyWithCode.coverages.find(
          (x) => x.masterProduct == null
        )?.coverageExtend?.dueDate || "-"
      );
    },
    paidupDatePremi() {
      return this.myPolicy.policyWithCode.coverages?.find(x => x?.masterProduct == null || false)?.paidupDate || '-'
    },
    issueDatePremi() {
      return this.myPolicy.policyWithCode.coverages?.find(x => x?.masterProduct == null || false)?.issueDate || '-'
    }
  },
  methods: {
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
    totalPremAll: (item) => {
      return item
        ? item.currentPremium.stdPremAf +
            (item.recurringTopup?.topupAmount || 0)
        : 0;
    },
    validate() {
      this.validationMessage = [];
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
      if (!this.form.ilustrationAttachment.name) {
        this.validationMessage.push("Unggah Ilustrasi diperlukan");
      }
      if (!this.form.term) {
        this.validationMessage.push("Masa Tahun Premi diperlukan");
      }
    },
    async addIlustrationImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadIlustrationFile",
          { file: e.target.files[0] }
        );
        this.form.ilustrationAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    save() {
      this.validate();
      if (this.validationMessage.length) return false;
      this.$store.commit(
        "submission_transaction/change_term/setChangeTerm",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/change-term/resume",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .payment_freq {
    max-width: 250px !important;
  }
  .btn-add-investment {
    max-width: 250px !important;
  }
  .btn-save {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 150px;
    justify-content: center;
  }
</style>