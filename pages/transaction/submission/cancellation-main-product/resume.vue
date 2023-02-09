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
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tanggal Penerimaan Polis</p>
        <p class="data-value">
          {{
            myPolicy.policyWithCode.acknowledgeDate
              ? $moment(myPolicy.policyWithCode.acknowledgeDate).format(
                  "DD/MM/Y"
                )
              : "-"
          }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <p class="data-title mb-1">Jenis dan Dana Investasi yang dimiliki</p>
        <template>
          <v-data-table
            :headers="table.headers"
            :items="coveragesSelected"
            mobile-breakpoint="480"
            hide-default-footer
          >
            <template v-slot:item.itemId="{ item }">
              <v-checkbox input-value="true" value disabled></v-checkbox>
            </template>
            <template v-slot:item.issueDate="{ item }">
              {{ $moment(item.issueDate).format("DD/MM/Y") }}
            </template>
            <template v-slot:item.nextPremium.sumAssured="{ item }">
              {{ $convertCurrency(item.nextPremium.sumAssured) }}
            </template>
            <template v-slot:item.currentPremium.totalPremAf="{ item }">
              {{ $convertCurrency(item.currentPremium.totalPremAf) }}
            </template>
            <template v-slot:item.expiryDate="{ item }">
              {{ $moment(item.expiryDate).format("DD/MM/Y") }}
            </template>
            <template v-slot:item.lifeInsured.insured.person="{ item }">
              {{
                item.lifeInsured.insured.person.firstName
                  ? item.lifeInsured.insured.person.firstName
                  : ""
              }}
              {{
                item.lifeInsured.insured.person.midName
                  ? item.lifeInsured.insured.person.midName
                  : ""
              }}
              {{
                item.lifeInsured.insured.person.lastName
                  ? item.lifeInsured.insured.person.lastName
                  : ""
              }}
            </template>
          </v-data-table>
        </template>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-1">Alasan</p>
        <p class="data-value">{{ reasonSelected[0].name }}</p>
      </div>
    </div>
    
    <div v-if="getChangePayeeRefundAccount.is_should_fill_payee_refund">
      <br>
      <v-divider></v-divider>
      <br>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Nomor Rekening Baru</p>
          <p class="data-value">
            {{
              getChangePayeeRefundAccount.new_no_rek
            }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">
            Nama Pemilik Nomor Rekening Manfaat Baru
          </p>
          <p class="data-value">
            {{
              getChangePayeeRefundAccount.rek_owner
            }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">
            Nama Cabang Baru
          </p>
          <p class="data-value">
            {{
              getChangePayeeRefundAccount.branch
            }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank Baru</p>
          <p class="data-value">
            {{
              choosenBank(getChangePayeeRefundAccount.bank)
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
              @click.prevent="showKtpSelfiePreview"
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
          <p class="data-title mb-2">Unggah Foto Halaman Depan Buku Tabungan Yang Baru</p>
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

      <div v-if="getChangePayeeRefundAccount.family_attachment.file" class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">
            {{
              getChangePayeeRefundAccount.status_family_attachment === "KK"
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
  name: "cancellation-main-product-resume",
  mixins: [resumePageMixin],
  components: {
    SaveIcon,
    InfoIcon,
  },
  data() {
    return {
      validationMessage: [],
      title: {
        name: "",
        description: "",
      },
      bankName: "",
      accepted: false,
      showMe: true,
      selected: [],
      image_preview: {
        src: "",
        show: false,
      },
      table: {
        headers: [
          {
            text: "Pilihan",
            align: "start",
            value: "itemId",
          },
          {
            text: "Nama Produk",
            value: "productName",
          },
          {
            text: "Uang Pertanggungan/Benefit",
            value: "nextPremium.sumAssured",
          },
          {
            text: "Premium",
            value: "currentPremium.totalPremAf",
          },
          {
            text: "Masa mulai produk",
            value: "issueDate",
          },
          {
            text: "Nama Tertanggung",
            value: "lifeInsured.insured.person",
          },
          {
            text: "Status Produk",
            value: "product_status",
          },
          {
            text: "Akhir masa produk",
            value: "expiryDate",
          },
          {
            text: "Jenis produk",
            value: "product_type",
          },
        ],
      },
    };
  },
  computed: {
    coveragesSelected() {
      return this.$store.getters["submission_transaction/getCoveragesSelected"];
    },
    reasonSelected() {
      return this.$store.getters["submission_transaction/getReasonSelected"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    banks() {
      return this.$store.getters["submission_transaction/getBanks"];
    },
    getChangePayeeRefundAccount() {
      return this.$store.getters[
        "submission_transaction/change_payee_refund_account/getChangePayeeRefundAccount"
      ];
    },
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-add-investment-fund") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
    showKtpSelfiePreview: function () {
      if (this.getChangePayeeRefundAccount.ktp_selfie_attachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangePayeeRefundAccount.ktp_selfie_attachment.file
        );
        this.image_preview.show = true;
      }
    },
    showKtpPreview: function () {
      if (this.getChangePayeeRefundAccount.ktp_attachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangePayeeRefundAccount.ktp_attachment.file
        );
        this.image_preview.show = true;
      }
    },
    showSavingBookPreview: function () {
      if (this.getChangePayeeRefundAccount.saving_book_attachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangePayeeRefundAccount.saving_book_attachment.file
        );
        this.image_preview.show = true;
      }
    },
    choosenBank: function (bankId) {
      if (!bankId){
        return null
      }
      return this.banks.find(v => v.bankId == bankId).name;
    },   
    showFamilyAttachmentPreview: function () {
      if (this.getChangePayeeRefundAccount.family_attachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangePayeeRefundAccount.family_attachment.file
        );
        this.image_preview.show = true;
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/submitTransactionProposalSurrender"
        );
        if (result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path: "./thankyou?transaction_ids=" + transactionIds.join(","),
          });
        }
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
  },
};
</script>
<style lang="scss" scoped>
.investment_type_option {
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
