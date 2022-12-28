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
        <p class="data-value">{{ myPolicy.policyWithCode.policyNumber }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Due Date Premium</p>
        <p class="data-value">{{ $formatDate(dueDatePremi) }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Informasi Virtual Account</p>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <v-select
            :items="virtualAccountOptions"
            v-model="getPolicyRecovery.virtualAccountNumber"
            label="Virtual Account"
            dense
            outlined
            :error-messages="errors[0]"
          ></v-select>
        </ValidationProvider>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tagihan Premi</p>
        <p class="data-value">
          {{ $currencyName(myPolicy.policyWithCode.currency) }}
          {{ $convertCurrency(billReinstate) }}
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
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Bukti Transfer</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showTransferAttachmentPreview"
          >
            Lihat
          </button>
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
          Saya <b>tertanggung</b> telah mengisi
          <b>Health questionnaire</b> dengan benar dan tanpa paksaan, apabila
          dikemudian hari ditemukan kesalahan pengisian maka saya siap
          menanggung segala risiko dan akibatnya
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
          Saya <b>pemegang polis</b> telah mengisi
          <b>Health questionnaire</b> dengan benar dan tanpa paksaan, apabila
          dikemudian hari ditemukan kesalahan pengisian maka saya siap
          menanggung segala risiko dan akibatnya
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
              - Pemulihan polis hanya berlaku jika usia dibawah atau sama dengan 2
              tahun sejak tanggal <strong>lapsed date</strong>
            </li>
            <li>
              - Mohon lakukan pembayaran dahulu sebelum melakukan pengajuan
              pemulihan polis
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

    <HealthDeclarationFormModal
      :show="showModalHealth"
      :default-value="getPolicyRecovery.healthQuestionnaire"
      preview
      @close="showModalHealth = false"
    />
  </div>
</template>

<script>
import resumePageMixin from "@/mixins/resumePage";
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  name: "policy-recovery-resume",
  mixins: [resumePageMixin],
  components: {
    SaveIcon,
    InfoIcon,
  },
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
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
    dueDatePremi() {
      return (
        this.myPolicy.policyWithCode.coverages.find(
          (x) => x.masterProduct == null
        )?.coverageExtend?.dueDate || "-"
      );
    },
    billReinstate() {
      var bill = this.myPolicyLoanInfo?.financialInfo?.fullReinstate || 0
      if (bill == 0) {
        const overduePrem = this.myPolicyLoanInfo?.financialInfo?.overduePremium || 0
        const plBalance = this.myPolicyLoanInfo?.financialInfo?.aplBalance || 0
        bill = overduePrem + plBalance
      }

      return bill
    },
    virtualAccountOptions() {
      if (this.myPolicy.policyWithCode.virtualAccountInfo.length) {
        return this.myPolicy.policyWithCode.virtualAccountInfo.map((item) => ({
          text: `${item.virtualAccountNumber} - ${item.bankAbbrName}`,
          value: item.virtualAccountNumber,
        }));
      }
      return [];
    },
    getPolicyRecovery() {
      return this.$store.getters[
        "submission_transaction/policy_recovery/getPolicyRecovery"
      ];
    },
  },
  methods: {
    showTransferAttachmentPreview() {
      if (this.getPolicyRecovery.transferAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getPolicyRecovery.transferAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showSelfieKtpPreview: function () {
      if (this.getPolicyRecovery.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getPolicyRecovery.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.accepted1 || !this.accepted2 || !this.accepted3) {
        this.validationMessage.push(
          "Setujui semua pernyataan transaksi untuk memproses pengajuan"
        );
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/policy_recovery/reinstatement"
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
