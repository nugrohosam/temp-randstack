<template>
  <div>
    <div v-show="showMe">
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
          <p class="data-title mb-2">Existing Rider Information</p>
          <p class="data-value">XX</p>
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
                my_policy ? (my_policy.policyWithCode.coverages.length > 0
                  ? my_policy.policyWithCode.coverages
                  : []) : []
              "
              mobile-breakpoint="480"
              hide-default-footer
              item-key="itemId"
              class="elevation-1"
            >
              <template v-slot:item.nextPremium.sumAssured="{ item }">
                {{
                  $convertCurrency(item ? item.nextPremium.sumAssured : "")
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
          <p class="data-title mb-1">Rider yang Dipilih *</p>
          <v-select
            :items="riderOptions"
            v-model="rider_choosen"
            dense
            outlined
            class="rider_type_option"
          ></v-select>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6" v-if="isHavePlans(rider_choosen)">
          <p class="data-title mb-2">Rider Plan</p>
          <div >
            <v-select
              class="rider_plan_type_option"
              :items="riderOptionPlan(rider_choosen)"
              v-model="form.plan"
              label="Pilih Rider Plan"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6" v-else>
          <p class="data-title mb-2">Uang Pertanggungan</p>
            <div class="form-input">
              <input
                type="text"
                class="form-control"
                v-model="form.sum_assured"
              />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">Pilih Tertanggung untuk Rider Baru</p>
          <v-data-table
            :headers="riderNameTable.headers"
            :items="
              my_policy.policyWithCode.coverages.length > 0
                ? my_policy.policyWithCode.coverages
                : []
            "
            v-model="form.party_ids"
            mobile-breakpoint="480"
            show-select
            hide-default-footer
          >
            <template #header.data-table-select> Pilihan </template>
          </v-data-table>
        </div>
      </div>

      <div class="row" v-if="isHaveHealth(rider_choosen)">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Depan</p>
          <div class="form-input">
            <input
              type="text"
              class="form-control"
              v-model="form.insured.first_name"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Belakang</p>
          <div class="form-input">
            <input
              type="text"
              class="form-control"
              v-model="form.insured.last_name"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Kartu Identitas</p>
          <div class="form-input">
            <v-select
              :items="options.identityType"
              v-model="form.insured.identity_type"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Identitas</p>
          <div class="form-input">
            <input
              type="number"
              class="form-control"
              v-model="form.insured.identity"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Hubungan dengan Tertanggung Utama</p>
          <div class="form-input">
            <v-select
              :items="options.relationType"
              v-model="form.insured.relation"
            ></v-select>
            <input
              type="text"
              class="form-control"
              v-model="form.insured.relation"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Jenis Kelamin</p>
          <div class="form-input">
            <v-select
              :items="options.gender"
              v-model="form.insured.gender"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Lahir</p>
          <div class="form-input">
            <input
              type="date"
              class="form-control"
              v-model="form.insured.birth_date"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tempat lahir</p>
          <div class="form-input">
            <input
              type="text"
              class="form-control"
              v-model="form.insured.birth_place"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Kewarganegaraan</p>
          <div class="form-input">
            <v-select
              :items="nationality"
              v-model="form.insured.nationality"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Status Perkawinan</p>
          <div class="form-input">
            <v-select
              :items="options.martialStatus"
              v-model="form.insured.marital_status"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tinggi Badan (cm)</p>
          <div class="form-input">
            <input
              type="number"
              class="form-control"
              v-model="form.insured.height"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Berat Badan (kg)</p>
          <div class="form-input">
            <input
              type="number"
              class="form-control"
              v-model="form.insured.weight"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Apakah Merokok</p>
          <div class="form-input">
            <v-select
              :items="[
                { text: 'Iya', value: true },
                { text: 'Tidak', value: false },
              ]"
              v-model="form.insured.is_smoker"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Profesi</p>
          <div class="form-input">
            <v-select :items="[]" v-model="form.insured.occupation"></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Hp</p>
          <div class="form-input">
            <input
              type="number"
              class="form-control"
              v-model="form.insured.phone_number"
            />
          </div>
        </div>
      </div>

      <div class="row" v-if="isHaveHealth(rider_choosen)">
        <div class="col-12">
          <p class="data-title mb-2">Isi Formulir Kesehatan</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showModalHealth = !showModalHealth"
          >
            Formulir Kesehatan
          </button>
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
    </div>

  <HealthDeclarationFormModal
    :show="showModalHealth"
    :default-value="form.healthQuestionnaire"
    @submit="form.healthQuestionnaire = $event"
    @close="showModalHealth = false"
  />
  </div>
</template>

<script>
import {
  relationType,
  gender,
  identityType,
  nationality,
  martialStatus,
} from "@/utils/constant";

export default {
  name: "add-rider",
  components: {
    SaveIcon,
    InfoIcon,
  },
  computed: {
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  mounted() {
    this.getData();
    if ($nuxt.$route.name != "transaction-submission-add-rider-product") {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  beforeMount() {
    if (this.myPolicy.policyWithCode.riskStatus != 1) {
      this.modal.show = true;
      this.modal.message =
        "Transaksi yang dipilih tidak dapat dilakukan, untuk informasi lebih lanjut silahkan menghubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id";
    }
  },
  data() {
    return {
      options: {
        relationType,
        gender,
        identityType,
        nationality,
        martialStatus,
      },
      showModalHealth: false,
      my_policy: null,
      showMe: true,
      selected: [],
      rider_choosen: [],
      rider_plan_choosen: [],
      data_riders: [
        {
          id: 1,
          fund_name: "DANA MAKSIMA",
          topup_value: 1000000,
        },
        {
          id: 2,
          fund_name: "DANA CEMERLANG",
          topup_value: 2000000,
        },
        {
          id: "",
          fund_name: "Total",
          topup_value: 3000000,
        },
      ],
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
            text: "Jenis produk",
            value: "productType",
          },
        ]
      },
      form: {
        plan: null,
        sum_assured: null,
        healthQuestionnaire: [],
        party_ids: null,
        insured: {
          first_name: null,
          last_name: null,
          identity_type: null,
          identity: null,
          relation: null,
          relation: null,
          gender: null,
          birth_date: null,
          birth_place: null,
          nationality: null,
          marital_status: null,
          height: null,
          weight: null,
          is_smoker: null,
          occupation: null,
          phone_number: null,
        },
        ktp_selfie: null,
      },
    };
  },
  computed: {
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    allowedRiders() {
      return this.$store.getters["submission_transaction/getProductRiders"];
    },
    riderOptions() {
      const listRider = this.allowedRiders
      return listRider.map(v => 
        ({
          value: v.productId,
          text: v.productName,
        })
      )
    },
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-add-rider-fund") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
    isHavePlans(productId) {
      return this.allowedRiders.find(v => v.productId == productId).benefitLevelInfoVOList.length > 0;
    },
    riderOptionPlan(productId) {
      return this.allowedRiders.find(v => v.productId == productId).benefitLevelInfoVOList.map(v => v.levelDescrp);
    },
    isHavePlans(productId) {
      return this.allowedRiders.find(v => v.productId == productId).benefitLevelInfoVOList.length > 0;
    },
    isHaveHealth(productId) {
      const isHealthTrue = this.allowedRiders.find(v => v.productId == productId).health;
      this.form.insured = isHealthTrue ? this.form.insured : null;
      return isHealthTrue;
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
    save: async function () {
      this.validate();
      // patch to action
      this.$router.push({ path: "./add-rider-product/resume" });
    },
    validate: async function () {
      this.validationMessage = [];
      if (this.selfieKtpFileName == "") {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    addSelfieKtpImage: function (e) {
      this.form.ktp_selfie = e.target.files[0];
      if (e.target.files[0]) {
        this.$store.dispatch("submission_transaction/uploadSelieKtpFile", {
          file: e.target.files[0],
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .rider_type_option {
    max-width: 250px !important;
  }
  .rider_plan_type_option {
    max-width: 250px !important;
  }
  .btn-add-rider {
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
