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
          </div>

          <div class="row">
            <div class="col-12">
              <p class="data-title mb-1">
                Informasi Manfaat Sebelum Perubahan
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
                  v-model="coverages_selected"
                  item-key="itemId"
                  show-select
                  class="elevation-1"
                  selectable-key="isSelectable"
                  :single-select="true"
                >
                  <template #header.data-table-select> Pilihan </template>
                  <template v-slot:item.issueDate="{ item }">
                    {{ item ? $moment(item.issueDate).format("DD/MM/Y") : "" }}
                  </template>
                  <template v-slot:item.benefitLevelDescrp="{ item }">
                    {{ item.benefitLevelDescrp }}
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
                  <template v-slot:item.nextPremium.sumAssured="{ item }">
                    {{
                      $convertCurrency(item ? item.nextPremium.sumAssured : "")
                    }}
                  </template>
                  <template v-slot:item.productType="{ item }">
                    Regular
                  </template>
                </v-data-table>
              </template>
            </div>
          </div>

          <br>
          <v-divider v-if="coverages_selected.length > 0"></v-divider>
          <br>

          <div class="row" v-if="coverages_selected.length > 0">
            <div class="col-lg-4 col-sm-6" v-if="isHavePlans(coverages_selected)">
              <p class="data-title mb-2">Pilih Benefit Baru</p>
              <div >
                <v-select
                  class="plan_type_option"
                  :items="optionPlan(coverages_selected)"
                  v-model="plan"
                  label=""
                ></v-select>
              </div>
            </div>
          </div>

          <div class="row" v-if="coverages_selected.length > 0">
            <div class="col-lg-2 col-sm-6" v-if="!isHavePlans(coverages_selected)">
              <p class="data-title mb-2">Uang Pertanggungan</p>
                <div class="form-input">
                  <input
                    type="text"
                    class="form-control"
                    v-model="sum_assured"
                  />
              </div>
            </div>
            <div class="col-lg-4 col-sm-6" v-if="!isHavePlans(coverages_selected)">
              <p class="data-title mb-2">Minimal Uang Pertanggungan</p>
              <p class="data-value">
                {{ $convertCurrency(minSurValue(coverages_selected)) }}
              </p>
            </div>
            <div class="col-lg-4 col-sm-6" v-if="!isHavePlans(coverages_selected)">
              <p class="data-title mb-2">Maksimal Uang Pertanggungan</p>
              <p class="data-value">
                {{ $convertCurrency(maxSurValue(coverages_selected)) }}
              </p>
            </div>
          </div>

          <div class="row" v-if="coverages_selected.length > 0">
            <div class="col-4">
              <button
                class="btn btn-primary-outlined w-100 btn-add-investment"
                @click.prevent="addDescreaseSA()"
              >
                {{
                  !!form.items.find((item) => item.item_id === coverages_selected[0].itemId)
                    ? "Ubah"
                    : "Tambah"
                }}
              </button>
            </div>
          </div>

          <ValidationMessage :validation-message="validationAddDecreaseSA" />

          <br>
          <v-divider v-if="form.items.length > 0"></v-divider>
          <br>

          <div class="row" v-if="form.items.length > 0">
            <div class="col-lg-6 col-sm-12">
              <p class="data-value">
                Data Pengajuan Penarikan Sebagian Dana Investasi
              </p>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">No</th>
                      <th class="text-left">Nama Manfaat</th>
                      <th class="text-left">Benefit</th>
                      <th class="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in form.items" :key="item.item_id">
                      <td>{{ i + 1 }}</td>
                      <td>
                        {{ item.product_name }}
                      </td>
                      <td>
                        {{ item.benefit_level_descrp || $convertCurrency(item.sum_assured)   }}
                      </td>
                      <td>
                        <button
                          class="btn btn-primary-outlined mt-3 w-100 btn-add-investment"
                          @click.prevent="removeDecreaseSA(i)"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
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
                <small>{{ form.ktpSelfieAttachment.name }}</small>
                <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
                <br />
                <span class="text-error">{{ errors[0] }}</span>
              </ValidationProvider>
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
                      Minimal dan Maksimal Uang pertanggungan berdasarkan atas premi yang dibayarkan! 
                    </li>
                    <li>
                      Penurunan Plan atau Benefit maksimal 1 tingkat!
                    </li>
                    <li>
                      Akan ada kemungkinan Penurunan atau Peningkatan Premi yang di tagihkan!
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
  </div>
</template>

<script>

import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  name: "decrease-sa",
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
    if (
      $nuxt.$route.name != "transaction-submission-decrease-sa"
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
            text: "Nama Tertanggung",
            value: "lifeInsured.insured.person",
          },
          {
            text: "Benefit",
            value: "benefitLevelDescrp",
          },
          {
            text: "Premi",
            value: "nextPremium.sumAssured",
          },
          {
            text: "Status Benefit",
            value: "productType",
          },
        ],
      },
      plan: null,
      planDescrp: null,
      coverages_selected: [],
      sum_assured: null,
      form: {
        items: [],
        ktpSelfieAttachment: {},
      },
      validationAddDecreaseSA: [],
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
      if (to.name != "transaction-submission-decrease-sa") {
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
    optionPlan(coverageSelected) {
      if (coverageSelected.length > 0 && coverageSelected[0].benefitLevelDescrp != '-'){
        const product = coverageSelected[0];
        if (product.benefitLevelInfoVOList){
          return product.benefitLevelInfoVOList.map(v => ({ value: v.benefitLevel, text: v.levelDescrp })); 
        }
      }

      return []
    },
    removeDecreaseSA(i) {
      this.form.items.splice(i, 1);
    },
    minSurValue(coverageSelected) {
      const surValue = coverageSelected[0].minSurValue;
      return surValue;
    },
    maxSurValue(coverageSelected) {
      const surValue = coverageSelected[0].maxSurValue;
      return surValue;
    },
    isHavePlans(coverageSelected) {
      return coverageSelected.length > 0 && coverageSelected[0].currentPremium.benefitLevel;
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
        v.productName = products.find(
          (product) => product.id == v.productId
        ).name;
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
    save: async function () {
      this.validate();
      if (this.validationMessage.length <= 0) {
        this.$store.commit(
          "submission_transaction/decrease_sa/setDecreaseSA",
          this.form
        );
        // patch to action
        this.$router.push({
          path: "./decrease-sa/resume",
        });
      }
    },
    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadSelieKtpFile",
          { file: e.target.files[0] }
        );
        this.form.ktpSelfieAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    validateSurValue(choosenProduct) {
      if (this.sum_assured > choosenProduct.currentPremium.sumAssured){
        this.validationAddDecreaseSA.push("Uang pertanggungan baru tidak bisa melebihi uang pertanggungan awal");
        return;
      } else if (this.sum_assured < choosenProduct.minSurValue){
        this.validationAddDecreaseSA.push("Uang pertanggungan baru tidak bisa dibawah batas minimal");
        return;
      } else if (this.sum_assured < choosenProduct.minSurValue){
        this.validationAddDecreaseSA.push("Uang pertanggungan baru tidak bisa diatas batas minimal ");
        return;
      } else{
        this.validationAddDecreaseSA = []
      }
    },
    addDescreaseSA() {
      const choosenProduct = this.coverages_selected[0]

      const indexObject = this.$indexOfObject(
        this.form.items,
        choosenProduct.itemId,
        (v) => v.item_id
      );

      if (indexObject != -1) {
        if (this.plan){
          const levelDescrp = choosenProduct.benefitLevelInfoVOList.find(v => v.benefitLevel == this.plan).levelDescrp

          this.form.items.splice(indexObject, 1, 
            {
              product_id: choosenProduct.productId,
              product_name: choosenProduct.productName,
              benefit_level_descrp: levelDescrp,
              benefit_level: this.plan,
              item_id: choosenProduct.itemId,
              premium: this.saRate,
              sum_assured: null,
              waiver: choosenProduct.waiverExt.waiver,
              waiver_sa: choosenProduct.waiverExt.waivedSa,
            }
          )
        } else {
          this.validateSurValue(choosenProduct);
          if (this.validationAddDecreaseSA.length > 0) {
            return;
          }

          this.form.items.splice(indexObject, 1, 
            {
              product_id: choosenProduct.productId,
              product_name: choosenProduct.productName,
              benefit_level_descrp: null,
              benefit_level: null,
              item_id: choosenProduct.itemId,
              sum_assured: this.sum_assured,
              premium: null,
              waiver: choosenProduct.waiverExt.waiver,
              waiver_sa: choosenProduct.waiverExt.waivedSa,
            }
          )
        }
      } else {
        if (this.plan){
          const levelDescrp = choosenProduct.benefitLevelInfoVOList.find(v => v.benefitLevel == this.plan).levelDescrp

          this.form.items.push(
            {
              product_id: choosenProduct.productId,
              product_name: choosenProduct.productName,
              benefit_level_descrp: levelDescrp,
              benefit_level: this.plan,
              item_id: choosenProduct.itemId,
              premium: this.saRate,
              sum_assured: null,
              waiver: choosenProduct.waiverExt.waiver,
              waiver_sa: choosenProduct.waiverExt.waivedSa,
            }
          )
        } else {
          this.validateSurValue(choosenProduct);
          if (this.validationAddDecreaseSA.length > 0) {
            return;
          }

          this.form.items.push(
            {
              product_id: choosenProduct.productId,
              product_name: choosenProduct.productName,
              benefit_level_descrp: null,
              benefit_level: null,
              item_id: choosenProduct.itemId,
              sum_assured: this.sum_assured,
              premium: null,
              waiver: choosenProduct.waiverExt.waiver,
              waiver_sa: choosenProduct.waiverExt.waivedSa,
            }
          )
        }
      }

      this.plan = null
      this.sum_assured = null
    },
    validate() {
      this.validationMessage = [];
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
      if (this.form.items.length < 1) {
        this.validationMessage.push("Minimal pilih salah satu produk");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .plan_type_option {
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
