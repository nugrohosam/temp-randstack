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

    <br>
    <v-divider></v-divider>
    <br>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Nomor Rekening Saat Ini</p>
        <p class="data-value">
          {{
            this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
            this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
              ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0]
                  .bankAccount
              : "-"
          }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">
          Nama Pemilik Nomor Rekening Manfaat Saat Ini
        </p>
        <p class="data-value">
          {{
            this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
            this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
              ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].accoName
              : "-"
          }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Bank Saat Ini</p>
        <p class="data-value">
          {{
            this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
            this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
              ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].bankName
              : "-"
          }}
        </p>
      </div>
    </div>

    <br />
    <v-divider></v-divider>
    <br />

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Nomor Rekening Baru</p>
        <p class="data-value">
          {{ getBenefitAllocation.newNoRek }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Pemilik Nomor Rekening Manfaat Baru</p>
        <p class="data-value">
          {{ getBenefitAllocation.rekOwner }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">
          Nama Cabang Baru
        </p>
        <p class="data-value">
          {{
            getBenefitAllocation.branch
          }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Bank Baru</p>
        <p class="data-value">
          {{
            choosenBank(getBenefitAllocation.bank)
          }}
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

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto KTP</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showKtpPreview"
          >
            Lihat
          </button>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">
          Unggah Foto Halaman Depan Buku Tabungan Yang Baru
        </p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showSavingBookPreview"
          >
            Lihat
          </button>
        </p>
      </div>
    </div>

    <div v-if="getBenefitAllocation.familyAttachment.file" class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">
          {{
            getBenefitAllocation.statusFamilyAttachment === "KK"
              ? "Unggah Kartu Keluarga"
              : "Akte Kelahiran (Pemegang polis)"
          }}
        </p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showFamilyAttachmentPreview"
          >
            Lihat
          </button>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted"
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
      <div class="col-lg-12 col-sm-12">
        <div class="message-bar rounded-lg">
            <div class="d-flex">
              <info-icon class="ic-primary mr-2"></info-icon>
              Perhatian !
            </div>
            <br>
            <ul>
              <li>
                - Pastikan nomor rekening yang tercantum sudah sesuai, jika tidak silahkan hubungi Customer Care 1-500-045
              </li>
              <li>
                - Pengajuan ini hanya untuk manfaat hidup, bonus sehat, akhir asuransi dan anuitas
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
          @click.prevent="submit()"
        >
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
import { SaveIcon, InfoIcon } from "vue-feather-icons";
import resumePageMixin from "@/mixins/resumePage";

export default {
  name: "add-investment-fund-resume",
  mixins: [resumePageMixin],
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    banks() {
      return this.$store.getters["submission_transaction/getBanks"];
    },
    getBenefitAllocation() {
      return this.$store.getters[
        "submission_transaction/benefit_allocation/getBenefitAllocation"
      ];
    },
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Pengajuan gagal transfer / SB / MB / NCB",
      sub: "Pengajuan gagal transfer / SB / MB / NCB",
    });
  },
  destroyed() {
    this.$store.commit("submission_transaction/removeCurrentHeaderTitle");
  },
  data() {
    return {
      validationMessage: [],
      image_preview: {
        src: "",
        show: false,
      },
      accepted: false,
    };
  },
  methods: {
    showSelfieKtpPreview: function () {
      if (this.getBenefitAllocation.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getBenefitAllocation.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showKtpPreview: function () {
      if (this.getBenefitAllocation.ktpAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getBenefitAllocation.ktpAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showSavingBookPreview: function () {
      if (this.getBenefitAllocation.savingBookAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getBenefitAllocation.savingBookAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showFamilyAttachmentPreview: function () {
      if (this.getBenefitAllocation.familyAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getBenefitAllocation.familyAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    choosenBank: function (bankId) {
      return this.banks.find((v) => v.bankId == bankId).name;
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.accepted) {
        this.validationMessage.push(
          "Setujui transaksi untuk memproses pengajuan"
        );
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/benefit_allocation/benefitAllocation"
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
<style lang="scss" scoped>
.btn-save {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 150px;
  justify-content: center;
}
</style>
