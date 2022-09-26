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
        <p class="data-title mb-2">Tanggal Jatuh Tempo</p>
        <p class="data-value">{{ dueDatePremi }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Status Cuti Premi</p>
        <p class="data-value">{{ myPolicy.policyWithCode.holidayIndi == "Y" ? "Ya" : "Tidak"}}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Masa Akhir Pembayaran Premi</p>
        <p class="data-value">{{ paidupDatePremi }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Masa Wajib Bayar Premi</p>
        <p class="data-value">{{ myPolicy.policyWithCode.lockedPeriodDate }}</p>
      </div>
    </div>

    <hr class="my-4" />

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tanggal Awal Cuti Premi</p>
        <p class="data-value">{{ getCutiPremi.startPremiumHolidayDate }}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tanggal Akhir Cuti Premi</p>
        <p class="data-value">{{ getCutiPremi.endPremiumHolidayDate }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
        <div class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showSelfieKtpPreview"
          >
            Lihat
          </button>
        </div>
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
          <a class="bni-primary no-border" href="">Baca selengkapnya</a>
        </p>
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

    <ValidationMessage :validation-message="validationMessage" />

    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary btn-save float-right" @click="submit">
          Simpan
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
export default {
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
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    paidupDatePremi() {
      return this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null)?.paidupDate || '-'
    },
    dueDatePremi() {
      return this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null)?.coverageExtend?.dueDate || '-'
    },
    getCutiPremi() {
      return this.$store.getters[
        "submission_transaction/cuti_premi/getCutiPremi"
      ];
    },
  },
  methods: {
    showSelfieKtpPreview: function () {
      if (this.getCutiPremi.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getCutiPremi.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.accepted) {
        this.validationMessage.push("Setujui transaksi untuk memproses pengajuan");
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/cuti_premi/changePremiumHoliday"
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
