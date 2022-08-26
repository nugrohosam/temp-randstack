<template>
  <div>
    <template v-if="!isLoading">
      <div v-show="showMe">
        <template v-if="myPolicy.policyWithCode.riskStatus == 1">
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
              <p class="data-title">Nomor Rekening Saat Ini</p>
              <p class="data-value">
                {{ this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].bankAccount : "-" }}
              </p>
            </div>
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">
                Nama Pemilik Nomor Rekening Manfaat Saat Ini
              </p>
              <p class="data-value">
                {{ this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].accoName : "-" }}
              </p>
            </div>
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Nama Bank Saat Ini</p>
              <p class="data-value">
                {{ this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].bankName : "-" }}
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
              <p class="data-title mb-1">
                Jenis dan Dana Investasi yang dimiliki
              </p>
              <template>
                <v-data-table
                  :headers="table.headers"
                  :items="
                    my_policy.policyWithCode.coverages.length > 0
                      ? my_policy.policyWithCode.coverages
                      : []
                  "
                  mobile-breakpoint="480"
                  hide-default-footer
                  v-model="form.coverages_selected"
                  item-key="itemId"
                  show-select
                  class="elevation-1"
                  @item-selected="selectCoverage"
                  selectable-key="isSelectable"
                >
                  <!-- <template v-slot:item.itemId="{ item }">
                    <v-simple-checkbox

                    ></v-simple-checkbox>
                  </template> -->
                  <template #header.data-table-select> Pilihan </template>
                  <template v-slot:item.issueDate="{ item }">
                    {{ item ? $moment(item.issueDate).format("DD/MM/Y") : "" }}
                  </template>
                  <template v-slot:item.nextPremium.sumAssured="{ item }">
                    {{
                      $convertCurrency(item ? item.nextPremium.sumAssured : "")
                    }}
                  </template>
                  <template v-slot:item.currentPremium.totalPremAf="{ item }">
                    {{
                      $convertCurrency(
                        item ? item.currentPremium.totalPremAf : ""
                      )
                    }}
                  </template>
                  <template v-slot:item.expiryDate="{ item }">
                    {{ item ? $moment(item.expiryDate).format("DD/MM/Y") : "" }}
                  </template>
                  <template v-slot:item.lifeInsured.insured.person="{ item }">
                    {{
                      item
                        ? $isNullWithSpace(
                            item.lifeInsured.insured.person.firstName
                          ) +
                          $isNullWithSpace(
                            item.lifeInsured.insured.person.midName
                          ) +
                          $isNullWithSpace(
                            item.lifeInsured.insured.person.lastName
                          )
                        : ""
                    }}
                  </template>
                </v-data-table>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-sm-12">
              <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>

              <input
                type="file"
                ref="inputSelfieKtpImage"
                v-show="false"
                accept="image/*"
                @change="addSelfieKtpImage"
              />
              <button
                class="btn btn-primary-outlined"
                @click.prevent="$refs.inputSelfieKtpImage.click()"
              >
                Unggah
              </button>
              <small>{{ selfieKtpFileName }}</small>
              <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-1">Alasan</p>
              <v-select
                :items="reasons_filtered"
                item-text="name"
                item-value="reasonId"
                placeholder="Pilih Alasan"
                dense
                outlined
                class="investment_type_option"
                @input="reasonSelected"
              ></v-select>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8 col-sm-12">
              <div class="message-bar d-flex rounded-lg">
                <info-icon class="ic-primary mr-2"></info-icon>
                Transaksi ini akan dikenakan biaya
              </div>
            </div>
          </div>
          <div class="row" v-if="validationMessage.length > 0">
            <div class="col-lg-8 col-sm-12">
              <div class="validation-bar d-flex rounded-lg">
                <info-icon class="ic-primary mr-2"></info-icon>
                <ul>
                  <li v-for="(value, key) in validationMessage" :key="key">
                    {{ value }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
        </template>
      </div>
    </template>
    <template v-else>
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <v-progress-circular indeterminate size="64" color="#F15921" width="7">
        </v-progress-circular>
        <p style="color: black">Mohon Tunggu...</p>
      </div>
    </template>
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
  name: "cancellation-main-product",
  components: {
    SaveIcon,
    InfoIcon,
  },
  beforeMount() {
    if (this.myPolicy.policyWithCode.riskStatus != 1) {
      this.modal.show = true;
      this.modal.message =
        "Transaksi yang dipilih tidak dapat dilakukan, untuk informasi lebih lanjut silahkan menghubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id";
    }
  },
  mounted() {
    this.getData();
    this.surrenderReason();
    if (
      $nuxt.$route.name != "transaction-submission-cancellation-main-product"
    ) {
      this.showMe = false;
    } else {
      this.showMe = true;
    }
  },
  data() {
    return {
      validationMessage: [],
      isLoading: true,
      my_policy: null,
      reasons: [
        {
          id: "",
          reason_id: "",
          name: "",
        },
      ],
      reasons_filtered: [
        {
          id: "",
          reason_id: "",
          name: "",
        },
      ],
      showMe: true,
      coverages: [],
      table: {
        headers: [
          {
            text: "Nama Produk",
            align: "center",
            value: "productName",
          },
          {
            text: "Uang Pertangguhan/Benefit",
            align: "center",
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
            value: "productStatus",
          },
          {
            text: "Akhir masa produk",
            value: "expiryDate",
          },
          {
            text: "Jenis produk",
            value: "productType",
          },
        ],
      },
      form: {
        coverages_selected: [],
        ktp_selfie: null,
        reason_selected: null,
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
    };
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-cancellation-main-product") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  computed: {
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  methods: {
    getData: async function () {
      let data = this.myPolicy;
      let productIds = [], products = [];
      data.policyWithCode.coverages = data.policyWithCode.coverages.filter(
        (coverage) => coverage.riskStatus == 1
      );
      data.policyWithCode.coverages.forEach((v, i) => {
        productIds.push(v.productId);
        data.policyWithCode.coverages[i].lifeInsured = v.lifeInsured1;
        data.policyWithCode.coverages[i].productName = "";
        data.policyWithCode.coverages[i].isSelectable = true;
        data.policyWithCode.coverages[i].productType =
          data.policyWithCode.coverages[i].masterProduct == null
            ? "Utama"
            : "Tambahan";
        data.policyWithCode.coverages[i].productStatus = "Aktif";
      });
      if (data.policyWithCode.refundPayeeBankAccount.length > 0 && data.policyWithCode.refundPayeeBankAccount[0] != null){
        data.policyWithCode.refundPayeeBankAccount[0].bankName = await this.$getBankName(data.policyWithCode.refundPayeeBankAccount[0].bankCode)
      }
      products = await this.$store.dispatch(
        "submission_transaction/getProducts",
        productIds.join()
      );
      data.policyWithCode.coverages.forEach((v, i) => {
        v.productName = products.filter((product) => product.id == v.productId)[0].name;
      });
      data.policyWithCode.coverages = [data.policyWithCode.coverages.find(cov => cov.masterProduct == null), ...data.policyWithCode.coverages.filter(cov => cov.masterProduct != null)]
      this.my_policy = data;
      this.isLoading = false;
    },
    surrenderReason: async function () {
      this.reasons = await this.$store.dispatch(
        "submission_transaction/getSurrenderReasons"
      );
    },
    save: async function () {
      this.validate();
      if (this.validationMessage.length <= 0) {
        this.$store.commit(
          "submission_transaction/setReasonSelected",
          this.form.reason_selected
        );
        this.$store.commit(
          "submission_transaction/setCoveragesSelected",
          this.form.coverages_selected
        );
        this.$router.push({ path: "./cancellation-main-product/resume" });
      }
    },
    addSelfieKtpImage: function (e) {
      this.form.ktp_selfie = e.target.files[0];
      this.$store.dispatch("submission_transaction/uploadSelieKtpFile", {
        file: e.target.files[0],
      });
    },
    validate: async function () {
      this.validationMessage = [];
      if (this.form.coverages_selected.length <= 0) {
        this.validationMessage.push("Pilih minimal 1 produk");
      }
      if (this.selfieKtpFileName == "") {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
      if (this.form.reason_selected == null) {
        this.validationMessage.push("Pilih salah satu alasan");
      }
    },
    selectCoverage: function (coverage) {
      if (coverage.item.productType == "Utama" && coverage.value) {
        this.my_policy.policyWithCode.coverages.filter((v) => {
          if (v.productType != "Utama") {
            v.isSelectable = false;
          }
        });
        this.form.coverages_selected = this.my_policy.policyWithCode.coverages;
      }

      if (coverage.item.productType == "Utama" && !coverage.value) {
        this.my_policy.policyWithCode.coverages.filter((v) => {
          if (v.productType != "Utama") {
            v.isSelectable = true;
          }
        });
      }

      if (this.form.coverages_selected.find((v) => v.productType == "Utama")) {
        this.reasons_filtered = this.reasons;
      } else if (
        !this.form.coverages_selected.find((v) => v.productType == "Utama")
      ) {
        this.reasons_filtered = this.reasons.filter(
          (reason) =>
            reason.name == "Tidak Ada" ||
            reason.name == "Masalah Pengiriman Polis"
        );
      } else if (this.form.coverages_selected.length <= 0) {
        this.reasons_filtered = [
          {
            id: "",
            reason_id: "",
            name: "",
          },
        ];
      }
    },

    reasonSelected: function (reason_id) {
      this.form.reason_selected = this.reasons.filter(
        (items) => items.reasonId == reason_id
      );
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
