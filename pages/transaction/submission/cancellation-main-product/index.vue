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
                {{
                  this.myPolicy.policyWithCode.refundPayeeBankAccount.length >
                    0 &&
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
                  this.myPolicy.policyWithCode.refundPayeeBankAccount.length >
                    0 &&
                  this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
                    ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0]
                        .accoName
                    : "-"
                }}
              </p>
            </div>
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Nama Bank Saat Ini</p>
              <p class="data-value">
                {{
                  this.myPolicy.policyWithCode.refundPayeeBankAccount.length >
                    0 &&
                  this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
                    ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0]
                        .bankName
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
                  :single-select="true"
                >
                  <template #header.data-table-select> Pilihan </template>
                  <template v-slot:item.nextPremium.sumAssured="{ item }">
                    {{
                      item && 
                      (item.benefitLevelDescrp == null ||
                      item.benefitLevelDescrp == '-' ||
                      item.benefitLevelDescrp == '') ? $convertCurrency(item.nextPremium.sumAssured) : item.benefitLevelDescrp
                    }}
                  </template>
                  <template v-slot:item.issueDate="{ item }">
                    {{ item ? $moment(item.issueDate).format("DD/MM/Y") : "" }}
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
          
          <div v-if="form.is_should_fill_payee_refund">

            <br>
            <v-divider></v-divider>
            <br>

            <div class="row">
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Nomor Rekening Baru</p>
                  <div class="form-input">
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.new_no_rek"
                    />
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Nama Pemilik Rekening Baru</p>
                  <div class="form-input">
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.rek_owner"
                    />
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Nama Cabang</p>
                  <div class="form-input">
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.branch"
                    />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-2 col-sm-6">
                <p class="data-title mb-2">Bank</p>
                  <div >
                    <v-select
                      class="bank_option"
                      :items="optionBank"
                      v-model="form.bank"
                      label=""
                    ></v-select>
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
                  <small>{{ form.ktp_selfie_attachment.name }}</small>
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
                  <p class="data-title mb-2">Unggah Foto KTP</p>
                  <input
                    type="file"
                    ref="inputKtpImage"
                    v-show="false"
                    accept="image/*"
                    @change="
                      (e) => {
                        validate(e);
                        addKtpImage(e);
                      }
                    "
                  />
                  <button
                    class="btn btn-primary-outlined"
                    @click.prevent="$refs.inputKtpImage.click()"
                  >
                    Unggah
                  </button>
                  <small>{{ form.ktp_attachment.name }}</small>
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
                  <p class="data-title mb-2">Halaman Depan Buku Tabungan Baru</p>
                  <input
                    type="file"
                    ref="inputSavingBookImage"
                    v-show="false"
                    accept="image/*"
                    @change="
                      (e) => {
                        validate(e);
                        addSavingBookImage(e);
                      }
                    "
                  />
                  <button
                    class="btn btn-primary-outlined"
                    @click.prevent="$refs.inputSavingBookImage.click()"
                  >
                    Unggah
                  </button>
                  <small>{{ form.saving_book_attachment.name }}</small>
                  <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
                  <br />
                  <span class="text-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <v-radio-group
                  v-model="form.status_family_attachment"
                  row
                  @change="form.family_attachment = {}"
                >
                  <v-radio
                    v-for="(item, index) in radios"
                    :key="index"
                    color="#F15921"
                    v-bind="item"
                  ></v-radio>
                </v-radio-group>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6 col-sm-12">
                <ValidationProvider
                  rules="required|image"
                  v-slot="{ validate, errors }"
                >
                  <p class="data-title mb-2">
                    {{
                      form.status_family_attachment === "KK"
                        ? "Unggah Kartu Keluarga"
                        : "Akte Kelahiran (Pemegang polis)"
                    }}
                  </p>
                  <input
                    type="file"
                    ref="inputFamilyAttachment"
                    v-show="false"
                    accept="image/*"
                    @change="
                      (e) => {
                        validate(e);
                        addFamilyAttachment(e);
                      }
                    "
                  />
                  <button
                    class="btn btn-primary-outlined"
                    @click.prevent="$refs.inputFamilyAttachment.click()"
                  >
                    Unggah
                  </button>
                  <small>{{ form.family_attachment.name }}</small>
                  <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
                  <br />
                  <span class="text-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
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
                  <li>- Transaksi ini akan dikenakan biaya</li>
                  <li v-if="form.is_should_fill_payee_refund">- Rekening manfaat harus atas nama pemegang polis</li>
                </ul>
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
            text: "Masa mulai produk",
            value: "issueDate",
          },
          {
            text: "Nama Tertanggung",
            value: "lifeInsured.insured.person",
          },
          {
            text: "Jenis produk",
            value: "productType",
          },
        ],
      },
      radios: [
        { label: "Kartu Keluarga (Pemegang polis)", value: "KK" },
        {
          label: "Akte Kelahiran (Pemegang polis)",
          value: "BIRTHCERTIFICATE",
        },
      ],
      form: {
        coverages_selected: [],
        is_should_fill_payee_refund: false,
        reason_selected: null,
        new_no_rek: null,
        bank: null,
        branch: null,
        rek_owner: null,
        ktp_attachment: {},
        saving_book_attachment: {},
        ktp_selfie_attachment: {},
        status_family_attachment: "KK",
        family_attachment: {},
        kk_attachment: {},
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
    banks() {
      return this.$store.getters["submission_transaction/getBanks"];
    },
    optionBank() {
      return this.banks.map(v => ({ value: v.bankId, text: v.name }))
    },
  },
  methods: {
    async addFamilyAttachment(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadAttachment",
          { file: e.target.files[0], type: this.form.status_family_attachment }
        );
        this.form.family_attachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadSelieKtpFile",
          { file: e.target.files[0] }
        );
        this.form.ktp_selfie_attachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadKtpFile",
          { file: e.target.files[0] }
        );
        this.form.ktp_attachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addSavingBookImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadSavingBookFile",
          { file: e.target.files[0] }
        );
        this.form.saving_book_attachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    getData: async function () {
      let data = this.myPolicy;
      let productIds = [],
        products = [];
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
      products = await this.$store.dispatch(
        "submission_transaction/getProducts",
        productIds.join()
      );
      data.policyWithCode.coverages.forEach((v, i) => {
        v.productName = products.filter(
          (product) => product.id == v.productId
        )[0].name;
      });
      data.policyWithCode.coverages = [
        data.policyWithCode.coverages.find((cov) => cov.masterProduct == null),
        ...data.policyWithCode.coverages.filter(
          (cov) => cov.masterProduct != null
        ),
      ];
      this.my_policy = data;
      this.isLoading = false;
    },
    surrenderReason: async function () {
      this.reasons = await this.$store.dispatch(
        "submission_transaction/getSurrenderReasons"
      );
    },
    save: async function () {
      this.$store.commit(
        "submission_transaction/setCoveragesSelected",
        this.form.coverages_selected
      );
      await this.validate();
      if (this.validationMessage.length <= 0) {
        if (this.form.is_should_fill_payee_refund) {
          this.$store.commit(
            "submission_transaction/change_payee_refund_account/setChangePayeeRefundAccount",
            this.form
          );
        }
        this.$store.commit(
          "submission_transaction/setReasonSelected",
          this.form.reason_selected
        );
        this.$router.push({ path: "./cancellation-main-product/resume" });
      }
    },
    validate: async function () {
      this.validationMessage = [];
      let result = null

      if (this.form.is_should_fill_payee_refund) {
          if (!this.form.new_no_rek) {
            this.validationMessage.push("Nomor Rekening Baru diperlukan");
          }
          if (!this.form.rek_owner) {
            this.validationMessage.push("Nama Pemilik Rekening Baru diperlukan");
          }
          if (!this.form.bank) {
            this.validationMessage.push("Bank diperlukan");
          }
          if (!this.form.branch) {
            this.validationMessage.push("Cabang diperlukan");
          }
          if (!this.form.ktp_selfie_attachment.name) {
            this.validationMessage.push("Unggah Selfie + KTP diperlukan");
          }
          if (!this.form.ktp_attachment.name) {
            this.validationMessage.push("Unggah KTP diperlukan");
          }
          if (!this.form.saving_book_attachment.name) {
            this.validationMessage.push("Unggah Halaman Depan Buku Tabungan Yang Baru diperlukan");
          }
          if (!this.form.family_attachment.name) {
            this.validationMessage.push("Unggah " + (this.form.status_family_attachment == "KK" ? "KK" : "Akte Kelahiran") + " diperlukan");
        }
      }

      if (!this.form.is_should_fill_payee_refund){
        result = await this.$store.dispatch(
          "submission_transaction/submitCheckFreelookCOPAndNoRekKosong", this.form
        );
        this.form.is_should_fill_payee_refund = result.data.status
        if (this.form.is_should_fill_payee_refund) {
          this.validationMessage.push("Isi data rekening manfaat di atas untuk melanjutan transaksi");
        }
      }

      if (this.form.coverages_selected.length <= 0) {
        this.validationMessage.push("Pilih minimal 1 produk");
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

      if (!coverage.value) {
        this.reasons_filtered = [
          {
            id: "",
            reason_id: "",
            name: "",
          },
        ];
      } else if (
        this.form.coverages_selected.find((v) => v.productType == "Utama")
      ) {
        this.reasons_filtered = this.reasons;
      } else if (
        !this.form.coverages_selected.find((v) => v.productType == "Utama")
      ) {
        this.reasons_filtered = this.reasons.filter(
          (reason) =>
            reason.name == "Lainnya" ||
            reason.name == "Tidak Ada" ||
            reason.name == "Masalah Pengiriman Polis"
        );
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
