<template>
  <div>
    <template v-if="!isLoading">
        <div v-show="showMe">
          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Nama Pemegang Polis</p>
              <p class="data-value">
                {{ $isNullWithSpace(
                        myPolicy.policyWithCode.policyHolder.person.firstName
            ) +
            $isNullWithSpace(
              myPolicy.policyWithCode.policyHolder.person.midName
            ) +
            $isNullWithSpace(
              myPolicy.policyWithCode.policyHolder.person.lastName
            ) }}
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
                Informasi Produk
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

          <br>
          <v-divider></v-divider>
          <br>
          

          <div v-for="(rider, index) in form.add_riders" :key="index" ref="riders">
            
            <div class="row" v-if="index > 0">
              <div class="col-12">
                <button
                  class="btn btn-primary btn-save float-right"
                  @click.prevent="removeRider(index)"
                >
                  X Hapus
                </button>
              </div>
            </div>

            <HealthDeclarationFormModal
              :show="form.add_riders[index].show_modal_health"
              :default-value="form.add_riders[index].health_questionnaire"
              @submit="form.add_riders[index].health_questionnaire = $event"
              @close="form.add_riders[index].show_modal_health = false"
            />

            <div class="row">
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-1">Rider yang Dipilih *</p>
                <v-select
                  :items="riderOptions"
                  v-model="form.add_riders[index].product_id"
                  dense
                  outlined
                  class="rider_type_option"
                ></v-select>
              </div>
            </div>
            
            <div class="row">
              <div class="col-lg-4 col-sm-6" v-if="isHavePlans(form.add_riders[index].product_id)">
                <p class="data-title mb-2">Rider Plan</p>
                <div>
                  <v-select
                    outlined
                    dense
                    class="rider_plan_type_option"
                    :items="riderOptionPlan(form.add_riders[index].product_id)"
                    v-model="form.add_riders[index].plan"
                  ></v-select>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6" v-else>
                <p class="data-title mb-2">Uang Pertanggungan</p>
                  <div class="form-input">
                    <input
                      type="number"
                      class="form-control"
                      v-model="form.add_riders[index].sum_assured"
                    />
                </div>
              </div>
            </div>

            <div class="row" v-if="form.add_riders[index].party_ids != null">
              <div class="col-12">
                <p class="data-title mb-2">Pilih Tertanggung untuk Rider Baru</p>
                <v-data-table
                  :headers="insuredTable.headers"
                  :items="
                    my_policy.policyWithCode.insureds.length > 0
                      ? my_policy.policyWithCode.insureds
                      : []
                  "
                  v-model="form.add_riders[index].parties"
                  mobile-breakpoint="480"
                  show-select
                  item-key="partyId"
                  @item-selected="e => selectInsureds(index, e)"
                  hide-default-footer
                  :single-select="true"
                >
                  <template #header.data-table-select> Pilihan </template>
                  <template  v-slot:item.person="{ item }"> 
                    {{
                        $isNullWithSpace(item.person.firstName) +
                        $isNullWithSpace(item.person.midName) +
                        $isNullWithSpace(item.person.lastName)
                    }} 
                  </template>
                </v-data-table>
              </div>
            </div>
            
            <div class="row" v-if="isCanDoAddInsured(index)">
              <div class="col-lg-12 col-sm-12">
                <button
                  class="btn btn-primary-outlined"
                  @click.prevent="toogleAddInsured(index)"
                >
                  {{ !form.add_riders[index].insured ? "Tambah Tertanggung Baru" : "Hapus Tertanggung Baru"}}
                </button>
              </div>
            </div>
              
            <div class="row" v-if="form.add_riders[index].insured != null">
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Nama Depan</p>
                <div class="form-input">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.add_riders[index].insured.first_name"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Nama Belakang</p>
                <div class="form-input">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.add_riders[index].insured.last_name"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Kartu Identitas</p>
                <div class="form-input">
                  <v-select
                    outlined
                    dense
                    :items="options.identityType"
                    v-model="form.add_riders[index].insured.identity_type"
                  ></v-select>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Nomor Identitas</p>
                <div class="form-input">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.add_riders[index].insured.identity"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Hubungan dengan Pemegang Polis</p>
                <div class="form-input">
                  <v-select
                    outlined
                    dense
                    :items="options.relationType"
                    v-model="form.add_riders[index].insured.relation"
                  ></v-select>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Jenis Kelamin</p>
                <div class="form-input">
                  <v-select
                    outlined
                    dense
                    :items="options.gender"
                    v-model="form.add_riders[index].insured.gender"
                  ></v-select>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Tanggal Lahir</p>
                <div class="form-input">
                  <input
                    type="date"
                    class="form-control"
                    v-model="form.add_riders[index].insured.birth_date"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Tempat lahir</p>
                <div class="form-input">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.add_riders[index].insured.birth_place"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Kewarganegaraan</p>
                <div class="form-input">
                  <v-select
                    outlined
                    dense
                    :items="options.nationality"
                    v-model="form.add_riders[index].insured.nationality"
                  ></v-select>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Status Perkawinan</p>
                <div class="form-input">
                  <v-select
                    outlined
                    dense
                    :items="options.martialStatus"
                    v-model="form.add_riders[index].insured.marital_status"
                  ></v-select>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Tinggi Badan (cm)</p>
                <div class="form-input">
                  <input
                    type="number"
                    class="form-control"
                    v-model="form.add_riders[index].insured.height"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Berat Badan (kg)</p>
                <div class="form-input">
                  <input
                    type="number"
                    class="form-control"
                    v-model="form.add_riders[index].insured.weight"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Apakah Merokok</p>
                <div class="form-input">
                  <v-select
                    outlined
                    dense
                    :items="[
                      { text: 'Iya', value: true },
                      { text: 'Tidak', value: false },
                    ]"
                    v-model="form.add_riders[index].insured.is_smoker"
                  ></v-select>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Profesi</p>
                <div class="form-input">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.add_riders[index].insured.occupation"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <p class="data-title mb-2">Nomor Hp</p>
                <div class="form-input">
                  <input
                    type="number"
                    placeholder="628xxx"
                    class="form-control"
                    v-model="form.add_riders[index].insured.phone_number"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <p class="data-title mb-2">Isi Formulir Kesehatan</p>
                <button
                  class="btn btn-primary-outlined"
                  @click.prevent="form.add_riders[index].show_modal_health = !form.add_riders[index].show_modal_health"
                >
                  Formulir Kesehatan
                </button>
              </div>
            </div>

            <div class="row" v-if="form.add_riders[index].insured != null">
              <div class="col-lg-6 col-sm-12">
                <ValidationProvider
                  rules="required|image"
                  v-slot="{ validate, errors }"
                >
                  <p class="data-title mb-2">Unggah KK (jika ada tertanggung baru)</p>
                  <input
                    type="file"
                    :id="'inputKkImage-' + index"
                    v-show="false"
                    accept="image/*"
                    @change="
                      (e) => {
                        validate(e);
                        addKkImage(e, index);
                      }
                    "
                  />
                  <button
                    class="btn btn-primary-outlined"
                    @click.prevent="$el.querySelector('#inputKkImage-' + index).click()"
                  >
                    Unggah
                  </button>
                  <small>{{ form.add_riders[index].kk_attachment.name }}</small>
                  <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
                  <br />
                  <span class="text-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>

            <br>
            <v-divider></v-divider>
            <br>
          </div>

          <div class="row">
            <div class="col-12">
              <button
                class="btn btn-primary btn-save float-right"
                @click.prevent="addRider()"
              >
                + Rider
              </button>
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
                <p class="data-title mb-2">Unggah Ilustrasi</p>
                <input
                  type="file"
                  ref="inputIlustrationImage"
                  v-show="false"
                  accept="image/*"
                  @change="
                    (e) => {
                      validate(e);
                      addIlustrationImage(e);
                    }
                  "
                />
                <button
                  class="btn btn-primary-outlined"
                  @click.prevent="$refs.inputIlustrationImage.click()"
                >
                  Unggah
                </button>
                <small>{{ form.ilustration_attachment.name }}</small>
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
                  <li>
                    - Penambahan Rider dapat menghubungi Pemasar untuk bantuan dan illustrasi
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

import {
  relationType,
  gender,
  identityType,
  nationality,
  martialStatus,
} from "@/utils/constant";

import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  name: "add-rider",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    this.getData();
    if ($nuxt.$route.name != "transaction-submission-add-rider-product") {
      this.showMe = false;
    } else {
      this.showMe = true;
    }
  },
  beforeMount() {
    if (!this.myPolicy.policyWithCode)
    {
      this.modal.show = true;
      this.modal.message =
        "Polis Anda sudah tidak aktif transaksi tidak dapat dilakukan, untuk informasi lebih lanjut silahkan menghubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id";
    }
    else if (this.myPolicy.policyWithCode.riskStatus != 1) {
      this.modal.show = true;
      this.modal.message =
        "Polis Anda sudah tidak aktif transaksi tidak dapat dilakukan, untuk informasi lebih lanjut silahkan menghubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id";
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
      validationMessage: [],
      isLoading: true,
      isAddNewInsured: false,
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
            text: "Uang Pertanggungan/Benefit",
            align: "center",
            value: "nextPremium.sumAssured",
          },
          {
            text: "Jenis produk",
            value: "productType",
          },
        ]
      },
      insuredTable: {
        headers: [
          {
            text: "Nama Tertanggung",
            align: "center",
            value: "person",
          },
        ]
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
      form: {
        add_riders: [
          {
            product_id: null,
            plan: null,
            sum_assured: null,
            party_ids: [],
            parties: [],
            health_questionnaire: [],
            show_modal_health: false,
            insured: null,
            kk_attachment: {},
          }
        ],
        ktp_selfie_attachment: {},
        ilustration_attachment: {},
      },
    };
  },
  computed: {
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
      if (!listRider) {
        return [];
      }
      return listRider.map(v => 
        ({
          value: v.productId,
          text: v?.productName || '-',
        })
      )
    },
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-add-rider-product") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
    isCanDoAddInsured: function (index) {
      if (!this.allowedRiders) {
        return false;
      }
      const isCanDoAddInsured = this.allowedRiders.filter(x => this.form.add_riders[index].product_id == x.productId).filter(x => x.familyType == 1).length > 0
      if (!isCanDoAddInsured){
        this.form.add_riders[index].insured = null;
      }
      return isCanDoAddInsured
    },
    getData: async function () {
      let data = this.myPolicy;
      let productIds = [],
        products = [];
      data.policyWithCode.coverages = data.policyWithCode.coverages.filter(
        (coverage) => coverage && coverage.riskStatus == 1
      );
      data.policyWithCode.coverages.forEach((v, i) => {
        productIds.push(v.productId);
        data.policyWithCode.coverages[i].lifeInsured = v.lifeInsured1;
        data.policyWithCode.coverages[i].productName = "";
        data.policyWithCode.coverages[i].isSelectable = true;
        data.policyWithCode.coverages[i].productType =
          data.policyWithCode.coverages[i].masterProduct == null
            ? "Utama"
            : "Tambahan/Rider";
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
    riderOptionPlan(productId) {
      if (!this.allowedRiders) {
        return false;
      }
      return this.allowedRiders.find(v => v.productId == productId)?.benefitLevelInfoVOList?.map(v => v.levelDescrp) || [];
    },
    isHavePlans(productId) {
      if (!this.allowedRiders) {
        return false;
      }
      return this.allowedRiders.find(v => v.productId == productId)?.benefitLevelInfoVOList?.length > 0 || false;
    },
    isHaveHealth(productId) {
      const isHealthTrue = this.allowedRiders.find(v => v.productId == productId)?.health || false;
      return isHealthTrue;
    },
    save: async function () {
      this.validate();
      if (this.validationMessage.length <= 0) {
        this.$store.commit(
          "submission_transaction/rider_product/setAddRider",
          this.form
        );
        // patch to action
        this.$router.push({
          path: "./add-rider-product/resume",
        });
      }
    },
    selectInsureds: async function (index, e) {
      if (e.value) {
        this.form.add_riders[index].party_ids.push(e.item.partyId)
      } else {
        const i = this.form.add_riders[index].party_ids.indexOf(e.item.partyId);
        this.form.add_riders[index].party_ids.splice(i, 1);
      }
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.form.ktp_selfie_attachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
      if (!this.form.ilustration_attachment.name) {
        this.validationMessage.push("Unggah Ilustrasi diperlukan");
      }
      var countRider = []
      for (let i = 0; i < this.form.add_riders.length; i++) {
        countRider[this.form.add_riders[i].product_id] = countRider[this.form.add_riders[i].product_id] ? countRider[this.form.add_riders[i].product_id]++ : 1;
        if (this.form.add_riders[i].insured && !this.form.add_riders[i].kk_attachment.name) {
          this.validationMessage.push("Unggah KK pada penambahan rider ke-"+ (i+1) +" diperlukan");
        }
        if (this.form.add_riders[i].health_questionnaire.length < 1) {
          this.validationMessage.push("Formulir pada penambahan rider ke-"+ (i+1) +" Kesehatan Harus Terisi");
        }
        if (this.form.add_riders[i].party_ids == null && this.form.add_riders[i].insured.first_name == "") {
          this.validationMessage.push("Formulir pada penambahan rider ke-"+ (i+1) +" tertanggung harus dipilih");
        }
        if (this.form.add_riders[i].party_ids.length < 1 && !this.form.add_riders[i].insured) {
          this.validationMessage.push("Formulir pada penambahan rider ke-"+ (i+1) +" tertanggung harus dipilih");
        }
      }
      if (countRider.length > 1 && countRider.filter(x => x > 1).length > 1) {
        this.validationMessage.push("Rider tidak bisa dipilih 2 kali");
      }
      if (this.form.add_riders[0].product_id == null) {
        this.validationMessage.push("Rider harus dipilih");
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
    async addIlustrationImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadIlustrationFile",
          { file: e.target.files[0] }
        );
        this.form.ilustration_attachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addKkImage(e, index) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadKkFile",
          { file: e.target.files[0] }
        );
        this.form.add_riders[index].kk_attachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    addRider: function () {
      this.form.add_riders.push({
        show_modal_health: false,
        product_name: null,
        product_id: null,
        plan: null,
        sum_assured: null,
        health_questionnaire: [],
        party_ids: [],
        kk_attachment: {},
        insured: null
      });
    },
    removeRider: function (index) {
      this.form.add_riders.splice(index, 1)
    },
    toogleAddInsured: function (index) {
      if (!this.form.add_riders[index].insured) {
        this.form.add_riders[index].insured = {
          first_name: "",
          last_name: "",
          identity_type: "",
          identity: "",
          relation: "",
          relation: "",
          gender: "",
          birth_date: "",
          birth_place: "",
          nationality: "",
          marital_status: "",
          height: "",
          weight: "",
          is_smoker: false,
          occupation: "",
          phone_number: "",
        }
        this.form.add_riders[index].party_ids = null;
        this.form.add_riders[index].parties = null;
      }else {
        this.form.add_riders[index].party_ids = [];
        this.form.add_riders[index].parties = [];
        this.form.add_riders[index].insured = null;
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
