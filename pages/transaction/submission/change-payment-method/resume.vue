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
        <p class="data-title mb-2">Jumlah Premi</p>
        <p class="data-value">{{ (+(paidupDatePremi.substring(0, 4)) - +(issueDatePremi.substring(0, 4))) }} Tahun</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tanggal Jatuh Tempo</p>
        <p class="data-value">{{ $formatDate(dueDatePremi) }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Metode Pembayaran Saat Ini</p>
        <p class="data-value">{{ myPolicy.policyWithCode.payerAccounts[0].paymentMethod == 93 ? "VIRTUAL" : "TABUNGAN" }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Jenis Pembayaran</p>
        <p class="data-value">
          {{ $labelPaymentType(myPolicy.policyWithCode.payerAccounts[0].paymentMethod) }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Frekuensi Pembayaran Saat Ini</p>
        <p class="data-value">
          {{
            $paymentFrequency(
              myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).currentPremium.paymentMethod
            ) || "-"
          }}
        </p>
      </div>
    </div>

    <div v-if="myPolicy.policyWithCode.payerAccounts[0].paymentMethod == 30">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Kartu Kredit</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.payerBankAccount[0].bankAccount || "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Masa Kadaluarsa Kartu Kredit</p>
          <p class="data-value">
            {{ $formatCCExpireDate(myPolicy.policyWithCode.payerBankAccount[0].expireDate) }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2 d-flex">Tipe Kartu Kredit</p>
          <p class="data-value">{{ myPolicy.policyWithCode.payerBankAccount[0].creditCardType == "2" ? "MASTER CARD" : "VISA" }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemilik Kartu Kredit</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.payerBankAccount[0].accoName || "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Bank</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.payerBankAccount[0].bankName || "-" }}</p>
        </div>
      </div>
    </div>

    <div v-if="myPolicy.policyWithCode.payerAccounts[0].paymentMethod == 3">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Rekening</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.payerBankAccount[0].bankAccount || "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemilik Rekening</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.payerBankAccount[0].accoName || "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Bank</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.payerBankAccount[0].bankName || "-" }}</p>
        </div>
      </div>
    </div>

    <div v-if="myPolicy.policyWithCode.payerAccounts[0].paymentMethod == 93">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor VA</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.virtualAccountInfo[0].virtualAccountNumber || "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Bank</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.virtualAccountInfo[0].bankName || "-" }}</p>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <div v-if="getChangePaymentMethod.paymentMethod == 30">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Kartu Kredit Baru</p>
          <p class="data-value">
            {{ getChangePaymentMethod.accountCC || "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Masa Kadaluarsa Kartu Kredit Baru</p>
          <p class="data-value">
            {{ getChangePaymentMethod.expireDateCC }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2 d-flex">Tipe Kartu Kredit Baru</p>
          <p class="data-value">{{ getChangePaymentMethod.creditCardType }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemilik Kartu Kredit Baru</p>
          <p class="data-value">
            {{ getChangePaymentMethod.ownerAccount || "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank Perubahan</p>
          <p class="data-value">
            {{ optionBank.find(x => x.value == getChangePaymentMethod.bank) !== undefined  ? optionBank.find(x => x.value == getChangePaymentMethod.bank).text : "-" }}</p>
        </div>
      </div>
    </div>

    <div v-if="getChangePaymentMethod.paymentMethod == 3">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Rekening Baru</p>
          <p class="data-value">
            {{ getChangePaymentMethod.accountDebit || "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemilik Rekening Baru</p>
          <p class="data-value">
            {{ getChangePaymentMethod.ownerAccount || "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank Perubahan</p>
          <p class="data-value">
            {{ optionBank.find(x => x.value == getChangePaymentMethod.bank) !== undefined  ? optionBank.find(x => x.value == getChangePaymentMethod.bank).text : "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Cabang Baru</p>
          <p class="data-value">
            {{ getChangePaymentMethod.branch || "-" }}</p>
        </div>
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

    <div v-if="getChangePaymentMethod.paymentMethod == 93">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor VA Baru</p>
          <p class="data-value">
            {{ getChangePaymentMethod.accountVA || "-" }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank Perubahan</p>
          <p class="data-value">
            {{ optionBank.find(x => x.value == getChangePaymentMethod.bank) !== undefined  ? optionBank.find(x => x.value == getChangePaymentMethod.bank).text : "-" }}</p>
        </div>
      </div>
    </div>

    <div class="row" v-if="getChangePaymentMethod.paymentMethod != 93">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto {{ getChangePaymentMethod.paymentMethod == 3 ? "Halaman Depan Buku Tabungan" : "Foto Kartu Kredit" }}</p>
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

    <div class="row" v-if="getChangePaymentMethod.paymentMethod != 93">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto {{ getChangePaymentMethod.paymentMethod == 3 ? "Scan Surat Otorisasi Debit Rekening" : "Scan Surat Otorisasi Kredit" }}</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showBankAuthorizationPreview"
          >
            Lihat
          </button>
        </p>
      </div>
    </div>

    <div class="row" v-if="getChangePaymentMethod.isPayerRegisteredInPolicy != 93 && !getChangePaymentMethod.isPayerRegisteredInPolicy">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto {{ getChangePaymentMethod.paymentMethod == 3 ? "Scan Surat Otorisasi Debit Rekening" : "Scan Surat Otorisasi Kredit" }}</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showBeneficaryOwnerPreview"
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
            <li>- Untuk Perubahan Pembayaran menggunakan Bank BCA dan Mandiri, mohon menggunakan formulir asli</li>
            <li>- Hubungi kantor layanan atau pemasar terdekat untuk mendapatkan formulir Otorisasi Kredit, formulir Otorisasi Debit Rekening dan formulir Beneficiary Owner</li>
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
import InfoPanel from "../../../../components/InfoPanel.vue";
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
      accepted: false,
      validationMessage: [],
      image_preview: {
        src: "",
        show: false,
      },
    };
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Perubahan Metode Pembayaran",
      sub: "Perubahan Metode Pembayaran",
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
    getChangePaymentMethod() {
      return this.$store.getters[
        "submission_transaction/change_payment_method/getChangePaymentMethod"
      ];
    },
    banks() {
      return this.$store.getters["submission_transaction/getBanks"];
    },
    optionBank() {
      return this.banks.map(v => ({ value: v.bankId, text: v.name }))
    },
    paidupDatePremi() {
      console.log(this.myPolicy.policyWithCode.payerBankAccount[0])
      return this.myPolicy.policyWithCode.coverages?.find(x => x?.masterProduct == null || false)?.paidupDate || '-'
    },
    issueDatePremi() {
      return this.myPolicy.policyWithCode.coverages?.find(x => x?.masterProduct == null || false)?.issueDate || '-'
    }
  },
  methods: {
    showSelfieKtpPreview: function () {
      if (this.getChangePaymentMethod.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangePaymentMethod.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showKtpPreview: function () {
      if (this.getChangePaymentMethod.ktpAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangePaymentMethod.ktpAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showSavingBookPreview: function () {
      if (this.getChangePaymentMethod.savingBookAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangePaymentMethod.savingBookAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showBankAuthorizationPreview: function () {
      if (this.getChangePaymentMethod.bankAuthorizationAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangePaymentMethod.bankAuthorizationAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showBeneficaryOwnerPreview: function () {
      if (this.getChangePaymentMethod.benficaryOwnerAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangePaymentMethod.benficaryOwnerAttachment.file
        );
        this.image_preview.show = true;
      }
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
          "submission_transaction/change_payment_method/changePaymentMethod"
        );
        if (result && result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path:
              "/transaction/submission/change-payment-method/thankyou?transaction_ids=" +
              transactionIds.join(","),
          });
        }
      }
    },
  },
};
</script>