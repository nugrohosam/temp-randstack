<template>
  <div>
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
        <p class="data-title mb-2">Profesi Saat Ini</p>
        <p class="data-value">{{ myPolicy.policyWithCode.policyHolder.person.occupCate == 0 ? myPolicy.policyWithCode.policyHolder.person.otherOccupation : myPolicy.policyWithCode.policyHolder.person.occupCateName }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Jabatan Saat Ini</p>
        <p class="data-value">{{ myPolicy.policyWithCode.policyHolder.person.occupCate == 0 ? "-" : (myPolicy.policyWithCode.policyHolder.person.positionLevel || "-") }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Perusahaan Saat Ini</p>
        <p class="data-value">{{ myPolicy.policyWithCode.policyHolder.person.occupCate == 0 ? "-" : (myPolicy.policyWithCode.policyHolder.person.jobCom || "-")}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Industri</p>
        <p class="data-value">
          {{ myPolicy.policyWithCode.policyHolder.person.occupCate == 0 ? myPolicy.policyWithCode.policyHolder.person.otherIndustry : (!myPolicy.policyWithCode.policyHolder.person.industryName ? "-" : myPolicy.policyWithCode.policyHolder.person.industryName)}}</p>
      </div>
    </div>

    <hr class="my-4" />

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tertanggung Yang Dirubah</p>
        <p class="data-value">{{ $isNullWithSpace(myPolicy.policyWithCode.insureds.find(x => x.partyId == this.getChangeOccupation.partyId).person.firstName) + " " + $isNullWithSpace(myPolicy.policyWithCode.insureds.find(x => x.partyId == this.getChangeOccupation.partyId).person.midName) + " " + $isNullWithSpace(myPolicy.policyWithCode.insureds.find(x => x.partyId == this.getChangeOccupation.partyId).person.lastName) }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Profesi Baru</p>
        <p class="data-value">{{ occupations.find(x => x.categoryCode == getChangeOccupation.occupation).name.includes('Other') ? getChangeOccupation.otherOccupation : occupations.find(x => x.categoryCode == getChangeOccupation.occupation).name }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Jabatan Baru</p>
        <p class="data-value">{{ getChangeOccupation.positionLevel }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Perusahaan Baru</p>
        <p class="data-value">{{ getChangeOccupation.company }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Industri Baru</p>
        <p class="data-value">
          {{ getChangeOccupation.industry == '8' ? getChangeOccupation.otherIndustry : industries.find(x => x.industryId == getChangeOccupation.industry).name }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
        <div class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showKtpSelfiePreview"
          >
            Lihat
          </button>
        </div>
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
      <div class="col-lg-12 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted2"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya <b>tertanggung</b> telah mengisi <b>perubahan pekerjaan</b> dengan benar dan tanpa paksaan, apabila dikemudian hari ditemukan kesalahan pengisian maka saya siap menanggung segala risiko dan akibatnya
        </p>
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
            <li>- Pastikan perubahaan pekerjaan sudah di isi dengan benar.</li>
            <li>- Perubahan pekerjaan diisi oleh tertanggung.</li>
            <li>- Premi dapat berubah sesuai dengan jenis pekerjaan.</li>
          </ul>
        </div>
      </div>
    </div>

    <ValidationMessage :validation-message="validationMessage" />

    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary btn-save float-right" @click="submit">
          <save-icon></save-icon> Submit
        </button>
      </div>
    </div>

    <ModalImagePreview
      :src="image_preview.src"
      :show="image_preview.show"
      @closeImagePreview="image_preview.show = false"
    />
  </div>
</template>

<script>
import resumePageMixin from "@/mixins/resumePage";
import InfoPanel from "../../../../../components/InfoPanel.vue";
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  components: {
    SaveIcon,
    InfoIcon,
    InfoPanel
  },
  mixins: [resumePageMixin],
  data() {
    return {
      accepted1: false,
      accepted2: false,
      validationMessage: [],
      image_preview: {
        src: "",
        show: false,
      },
    };
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Perubahan Data Pekerjaan Tertanggung",
      sub: "Perubahan Data Pekerjaan Tertanggung",
    });
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    occupations() {
      return this.$store.getters["submission_transaction/getOccupations"];
    },
    industries() {
      return this.$store.getters["submission_transaction/getIndustries"];
    },
    getChangeOccupation() {
      return this.$store.getters[
        "submission_transaction/change_occupation/getChangeOccupation"
      ];
    },
  },
  methods: {
    showKtpSelfiePreview: function () {
      if (this.getChangeOccupation.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeOccupation.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.accepted1 || !this.accepted2) {
        this.validationMessage.push(
          "Setujui transaksi untuk memproses pengajuan"
        );
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/change_occupation/changeOccupation"
        );
        if (result && result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path:
              "/transaction/submission/change/occupation/thankyou?transaction_ids=" +
              transactionIds.join(","),
          });
        }
      }
    },
  },
};
</script>