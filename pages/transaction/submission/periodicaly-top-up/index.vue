<template>
  <div>
    <div v-show="showMe">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">
            {{ $isNullWithSpace(
                        myPolicy.policyWithCode.policyHolder.person.firstName
            ) +
            $isNullWithSpace(
              myPolicy.policyWithCode.policyHolder.person.midName
            ) +
            $isNullWithSpace(
              myPolicy.policyWithCode.policyHolder.person.lastName
            ) }}
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
          <p class="data-title">Premi Dasar Saat Ini</p>
          <p class="data-value">
          {{
            $currencyName(
              myPolicy.policyWithCode.currency
            )
          }}
          {{ myPolicy.policyWithCode.coverages.find(x => x.riskStatus == 1 && x.masterProduct == null) ? $convertCurrency(myPolicy.policyWithCode.coverages.find(x => x.riskStatus == 1 && x.masterProduct == null).currentPremium.stdPremAf || 0) : "0" }} 
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">
            Premi Top Up Berkala Saat Ini
          </p>
          <p class="data-value">
            {{
              $currencyName(
                myPolicy.policyWithCode.currency
              )
            }}
            {{ myPolicy.policyWithCode.coverages.find(x => x.riskStatus == 1 && x.masterProduct == null) && myPolicy.policyWithCode.coverages.find(x => x.riskStatus == 1 && x.masterProduct == null).recurringTopup ? $convertCurrency(myPolicy.policyWithCode.coverages.find(x => x.riskStatus == 1 && x.masterProduct == null).recurringTopup.topupAmount || 0) : "0" }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Total Premi</p>
          <p class="data-value">
            {{
              $currencyName(
                myPolicy.policyWithCode.currency
              )
            }}
            {{ 
              $convertCurrency(totalPremAll(myPolicy.policyWithCode.coverages.find(x => x.riskStatus == 1 && x.masterProduct == null) || null))
            }} 
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
                min="0"
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
                min="0"
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
                min="0"
                class="form-control"
                v-model="totalPrem"
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

      <div class="row" v-if="!isDecreasePrem">
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

      <div class="row" v-if="!isDecreasePrem">
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
                  - Perubahan Premi total secara tidak langsung akan mempengaruhi Uang Pertanggungan
                </li>
                <li>
                  - Dianjurkan Mengajukan transaksi penambahan atau penurunan Uang Pertanggung apabila Total premi naik atau turun
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
    <NuxtChild />
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
  name: "periodicaly-top-up",
  components: {
    SaveIcon,
    InfoIcon,
  },
  beforeMount() {
    if (this.myPolicy.policyWithCode.riskStatus != 1) {
      this.modal.show = true;
      this.modal.message =
        "Polis Anda sudah tidak aktif transaksi tidak dapat dilakukan, untuk informasi lebih lanjut silahkan menghubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id";
    }
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
        ilustrationAttachment: {},
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
    isDecreasePrem() { 
      return this.totalPrem <= this.totalPremAll(this.myPolicy.policyWithCode.coverages.find(x => x.riskStatus == 1 && x.masterProduct == null))
    },
    totalPrem() {
      if (this.form.basePrem == null && this.form.topUpPrem == null){
        return null
      }
      return +(this.form.basePrem || 0) + +(this.form.topUpPrem || 0)
    }
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
    totalPremAll: (item) => {
      return (
        item ? (item.currentPremium.stdPremAf + (item.recurringTopup?.topupAmount || 0)) : 0
      );
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
    validate: async function () {
      this.validationMessage = [];
      if (!this.isDecreasePrem && !this.form.ilustrationAttachment.name) {
        this.validationMessage.push("Unggah Ilustrasi diperlukan");
      }
      if (!this.form.basePrem) {
        this.validationMessage.push("Premium Dasar diperlukan");
      } else if (this.form.basePrem <= 0) {
        this.validationMessage.push("Premium Dasar harus lebih dr 0");
      }
      if (!this.form.topUpPrem) {
        this.validationMessage.push("Top Up Berkala diperlukan");
      } else if (this.form.topUpPrem <= 0) {
        this.validationMessage.push("Top Up Berkala harus lebih dr 0");
      }
      if (!this.isDecreasePrem && this.form.healthQuestionnaire.length < 1) {
        this.validationMessage.push("Form Kesehatan diperlukan");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    save: async function () {
      this.validate();
      if (this.validationMessage.length <= 0) {
        this.form.totalPrem = this.totalPrem
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
