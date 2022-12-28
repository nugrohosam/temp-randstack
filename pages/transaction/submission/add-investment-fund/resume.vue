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
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Informasi Virtual Account</p>
        <p class="data-value">{{ getAddInvestmentFund.virtualAccountNumber }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Fund</th>
                <th class="text-left">Nilai Top Up</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in getAddInvestmentFund.items" :key="item.name">
                <template v-if="i < getAddInvestmentFund.items.length">
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.fund_name }}</td>
                  <td>{{ item.amount }}</td>
                </template>
              </tr>
              <tr v-if="getAddInvestmentFund.items.length > 0">
                <template>
                  <td colspan="1"></td>
                  <td>
                    <b>Total</b>
                  </td>
                  <td>
                    <b>{{ totalAmount }}</b>
                  </td>
                </template>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8 col-sm-12">
        <div class="message-bar d-flex">
          <info-icon class="ic-primary mr-2"></info-icon>
          Nilai investasi akan ter topup kedalam fund yang di pilih
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

    <div class="row" v-if="this.getAddInvestmentFund.transferAttachment.file != null">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Bukti Transfer</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showTransferPreview"
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
                - Amount Top up dan uang yang di transfer harus sama!
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
export default {
  name: "add-investment-fund-resume",
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
    getAddInvestmentFund() {
      return this.$store.getters[
        "submission_transaction/add_investment_fund/getAddInvestmentFund"
      ];
    },
    totalAmount() {
      return this.getAddInvestmentFund.items.length > 0 ? this.getAddInvestmentFund.items.map(a => a.amount).reduce((a, b) => +a + +b) : 0;  
    },
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Pengajuan Penambahan Dana Investasi (Top Up Sekaligus) ",
      sub: "Pengajuan Penambahan Dana Investasi (Top Up Sekaligus) ",
    });
  },
  destroyed() {
    this.$store.commit("submission_transaction/removeCurrentHeaderTitle");
  },
  data() {
    return {
      accepted: null,
      image_preview: {
        src: "",
        show: false,
      },
      validationMessage: [],
    };
  },
  methods: {
    showSelfieKtpPreview: function () {
      if (this.getAddInvestmentFund.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getAddInvestmentFund.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showTransferPreview: function () {
      if (this.getAddInvestmentFund.transferAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getAddInvestmentFund.transferAttachment.file
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
          "submission_transaction/add_investment_fund/addInvestmentFund"
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
