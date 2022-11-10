<template>
  <div>
    <div v-show="showMe">
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
          <p class="data-title">Premi Dasar Eksisting</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.coverages ? $convertCurrency(myPolicy.policyWithCode.coverages[0].currentPremium.stdPremAf) : 0 }} 
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">
            Premi Top Up Berkala Eksisting
          </p>
          <p class="data-value">
            {{ "1230123" }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Total Premi</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.coverages ? $convertCurrency(myPolicy.policyWithCode.coverages[0].currentPremium.totalPremAf) : 0 }} 
          </p>
        </div>
      </div>

      <br />
      <v-divider></v-divider>
      <br />

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Perubahan Premi Dasar</p>
            <div class="form-input">
              <input
                type="number"
                class="form-control"
                v-model="form.basePrem"
              />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Perubahan Premi Top Up Berkala</p>
            <div class="form-input">
              <input
                type="number"
                class="form-control"
                v-model="form.topUpPrem"
              />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Total Premi</p>
            <div class="form-input">
              <input
                :disabled="true"
                type="number"
                class="form-control"
                v-model="form.totalPrem"
              />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
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
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">Unggah Dokumen Tambahan (Opsional)</p>
            <input
              type="file"
              ref="inputDocumentImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addDocumentImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputDocumentImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.documentAttachment.name }}</small>
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">Isi Formulir Kesehatan</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showModalHealth = !showModalHealth"
          >
            Formulir Kesehatan
          </button>
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
                  Perubahan Premi total secara tidak langsung akan mempengaruhi Uang Pertanggungan
                </li>
                <li>
                  Dianjurkan Mengajukan transaksi penambahan atau penurunan Uang Pertanggung apabila Total premi naik atau turun
                </li>
              </ul>
          </div>
        </div>
      </div>

      <ValidationMessage :validation-message="validationMessage" />

      <div class="row">
        <div class="col-12">
          <button
            class="btn btn-primary btn-save float-right"
            @click.prevent="save()"
          >
            <save-icon></save-icon> Simpan
          </button>
        </div>
      </div>
    </div>

    <HealthDeclarationFormModal
      :show="showModalHealth"
      :default-value="form.healthQuestionnaire"
      @submit="form.healthQuestionnaire = $event"
      @close="showModalHealth = false"
    />
  </div>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "periodicaly-top-up",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    if ($nuxt.$route.name != "periodicaly-top-up") {
      this.showMe = false;
    } else {
      this.showMe = true;
    }
  },
  data() {
    return {
      validationMessage: [],
      showModalHealth: false,
      validationAddInvesment: [],
      form: {
        basePrem: null,
        topUpPrem: null,
        totalPrem: null,
        healthQuestionnaire: [],
        ktpSelfieAttachment: {},
        documentAttachment: {},
      },
      modal: {
        message: "",
        show: false,
        button: {
          text: "Tutup",
          redirect_link: "/transaction/submission",
          redirect_type: "spa",
        },
      },
      showMe: true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      limitPages: [5, 10, 15, 20, 25],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name != "periodicaly-top-up") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  mounted() {
    var contractInvest = [];

    this.myPolicy.policyWithCode.coverages.forEach((item) => {
      if (item?.contractInvests.length > 0) {
        contractInvest = contractInvest.concat(item.contractInvests);
      }
    });

    this.investment_types = contractInvest.map((item) => ({
      value: item.fundCode,
      text: this.$fundName(item.fundCode),
    }));
  },
  computed: {
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  methods: {
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
    async addDocumentImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadDocumentFile",
          { file: e.target.files[0] }
        );
        this.form.documentAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.form.basePrem) {
        this.validationMessage.push("Premium Dasar diperlukan");
      }
      if (!this.form.topUpPrem) {
        this.validationMessage.push("Top Up Berkala diperlukan");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
      if (this.form.healthQuestionnaire.length < 1) {
        this.validationMessage.push("Form Kesehatan diperlukan");
      }
    },
    save: async function () {
      this.validate();
      if (this.validationMessage.length <= 0) {
        this.$store.commit(
          "submission_transaction/periodicaly_top_up/setPeriodicalyTopUp",
          this.form
        );
        this.$router.push({
          path: "./periodicaly-top-up/resume",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bank_option {
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
