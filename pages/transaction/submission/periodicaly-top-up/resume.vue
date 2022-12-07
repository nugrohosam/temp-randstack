<template>
  <div>
    <BackButton />
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
        <p class="data-title mb-2">Nama Tertanggung</p>
        <p class="data-value">
          {{
            myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).insureds[0].person ? 
            $isNullWithSpace(myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).insureds[0].person ? myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).insureds[0].person.firstName : null) +
            $isNullWithSpace(myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).insureds[0].person ? myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).insureds[0].person.midName : null) +
            $isNullWithSpace(myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).insureds[0].person ? myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).insureds[0].person.lastName : null) : "-"
          }} 
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Existing Birth Date Life Assured</p>
        <p class="data-value">
          {{ (myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).insureds[0].birthDate || "-") }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Existing Main Life Assured Gender</p>
        <p class="data-value">
          {{ myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).insureds[0].gender == "M" ? "Laki Laki" : "Prempuan" }}
        </p>
      </div>
    </div>

    <br />
    <v-divider></v-divider>
    <br />

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Perubahan Premi Dasar</p>
        <p class="data-value">
          {{
            $currencyName(
              myPolicy.policyWithCode.currency
            )
          }}
          {{ $convertCurrency(getPeriodicalyTopUp.basePrem) }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Perubahan Premi Top Up Berkala</p>
        <p class="data-value">
          {{
            $currencyName(
              myPolicy.policyWithCode.currency
            )
          }}
          {{ $convertCurrency(getPeriodicalyTopUp.topUpPrem) }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Total</p>
        <p class="data-value">
          {{
            $currencyName(
              myPolicy.policyWithCode.currency
            )
          }}
          {{ $convertCurrency(getPeriodicalyTopUp.totalPrem) }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showSelfieKtpPreview"
          >
            Lihat
          </button>
        </p>
      </div>
    </div>    
    
    <div class="row" v-if="getPeriodicalyTopUp.documentAttachment.name">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Document</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showDocumentPreview"
          >
            Lihat
          </button>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Ilustrasi</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showIlustrationPreview"
          >
            Lihat
          </button>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <p class="data-title mb-2">Isi Formulir Kesehatan</p>
        <button
          class="btn btn-primary-outlined"
          @click.prevent="showModalHealth = !showModalHealth"
        >
          Lihat
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted1"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya menyetujui transaksi dan kebenaran data yang disampaikan.
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted2"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya <b>tertanggung</b> telah mengisi <b>Health questionnaire</b> dengan benar dan tanpa paksaan, apabila dikemudian hari ditemukan kesalahan pengisian maka saya siap menanggung segala risiko dan akibatnya.
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted3"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya <b>pemegang polis</b> telah mengisi <b>Health questionnaire</b> dengan benar dan tanpa paksaan, apabila dikemudian hari ditemukan kesalahan pengisian maka saya siap menanggung segala risiko dan akibatnya.
        </p>
      </div>
    </div>

    <ValidationMessage :validation-message="validationMessage" />

    <div class="row">
      <div class="col-12">
        <button
          class="btn btn-primary btn-save float-right"
          @click.prevent="submit()"
        >
          Submit
        </button>
      </div>
    </div>

    <ModalImagePreview
      :src="image_preview.src"
      :show="image_preview.show"
      @closeImagePreview="image_preview.show = false"
    />
    
    <HealthDeclarationFormModal
      :show="showModalHealth"
      :default-value="getPeriodicalyTopUp.healthQuestionnaire"
      preview
      @close="showModalHealth = false"
    />
  </div>
</template>

<script>
import resumePageMixin from "@/mixins/resumePage";

export default {
  name: "periodicaly-top-up-resume",
  mixins: [resumePageMixin],
  data() {
    return {
      accepted1: false,
      accepted2: false,
      accepted3: false,
      validationMessage: [],
      showModalHealth: false,
      image_preview: {
        src: "",
        show: false,
      },
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getPeriodicalyTopUp() {
      return this.$store.getters[
        "submission_transaction/periodicaly_top_up/getPeriodicalyTopUp"
      ];
    },
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Perubahan Premi Dasar dan Topup Berkala",
      sub: "Perubahan Premi Dasar dan Topup Berkala",
    });
  },
  destroyed() {
    this.$store.commit("submission_transaction/removeCurrentHeaderTitle");
  },
  methods: {
    showIlustartionPreview: function () {
      if (this.getPeriodicalyTopUp.ilustrationAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getPeriodicalyTopUp.ilustrationAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showSelfieKtpPreview: function () {
      if (this.getPeriodicalyTopUp.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getPeriodicalyTopUp.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showDocumentPreview: function () {
      if (this.getPeriodicalyTopUp.documentAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getPeriodicalyTopUp.documentAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.accepted1){
        this.validationMessage.push(
          "Setujui transaksi untuk memproses pengajuan"
        );
      }
      if(!this.accepted3 || !this.accepted2) {
        this.validationMessage.push(
          "Setujui pernyataan health questionnare untuk memproses pengajuan"
        );
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/periodicaly_top_up/periodicalyTopUp"
        );
        if (result && result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path: "./thankyou?transaction_ids=" + transactionIds.join(","),
          });
        }
      }
    },
  },
};
</script>
