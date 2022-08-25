<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <template v-if="!isLoading">
      <form v-show="showMe" @submit.prevent="handleSubmit(save)">
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nama Pemegang Polis</p>
            <p class="data-value">
              {{
                selectedPolicy.person.firstName
                  ? selectedPolicy.person.firstName
                  : "" + " " + selectedPolicy.person.midName
                  ? selectedPolicy.person.midName
                  : "" + " " + selectedPolicy.person.lastName
                  ? selectedPolicy.person.lastName
                  : ""
              }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nomor Polis</p>
            <p class="data-value">
              {{ myPolicy.policyWithCode.proposalNumber }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-1">Identitas yang diubah</p>
            <v-select
              :items="identityType"
              dense
              outlined
              item-value="type"
              item-text="name"
              class="investment_type_option"
              v-model="selectedIdentityType"
              @input="switchType"
            ></v-select>
          </div>
        </div>
        <div class="row">
          <!-- Search -->
          <div class="col-12">
            <template>
              <div class="page-body">
                <!-- Transaction Status Menu -->
                <div class="row">
                  <div class="col-12">
                    <div class="d-flex justify-sm-space-between">
                      <p><b>Alamat</b></p>
                      <button
                        class="btn btn-primary-outlined btn-mini"
                        @click.prevent="
                          addressEditable = addressEditable ? false : true
                        "
                      >
                        {{
                          addressEditable ? "Kembali" : "Ubah Informasi Alamat"
                        }}
                      </button>
                    </div>
                    <br /><br />
                    <div class="row">
                      <template
                        v-if="
                          !addressEditable &&
                          selectedPolicy.address.addressFormat == 'N'
                        "
                      >
                        <div class="col-lg-12 col-sm-12">
                          <p class="data-title">Alamat</p>
                          <p class="data-value" v-show="!addressEditable">
                            {{
                              $isNullWithSpace(
                                selectedPolicy.address.province
                              ) +
                              $isNullWithSpace(selectedPolicy.address.city) +
                              $isNullWithSpace(selectedPolicy.address.street) +
                              $isNullWithSpace(selectedPolicy.address.village) +
                              $isNullWithSpace(
                                selectedPolicy.address.address1
                              ) +
                              $isNullWithSpace(
                                selectedPolicy.address.address2
                              ) +
                              $isNullWithSpace(selectedPolicy.address.address3)
                            }}
                          </p>
                          <div class="form-input" v-show="addressEditable">
                            <input
                              type="text"
                              class="outlined"
                              placeholder="Jl Jenderal Ahmad Yani By Pass"
                              v-model="selectedPolicy.address.address1"
                            />
                          </div>
                        </div>
                      </template>

                      <template
                        v-if="
                          selectedPolicy.address.addressFormat == 'Y' ||
                          addressEditable
                        "
                      >
                        <div class="col-lg-4 col-sm-12">
                          <p class="data-title">Provinsi</p>
                          <p class="data-value" v-show="!addressEditable">
                            {{
                              selectedPolicy.address.province
                                ? selectedPolicy.address.province
                                : "-"
                            }}
                          </p>
                          <div class="form-input" v-show="addressEditable">
                            <v-select-ot
                              :options="province.collection"
                              @open="onOpenProvince"
                              @search="onSearchProvince"
                              @input="onInputProvince"
                              label="name"
                              class="investment_type_option"
                              v-model="province.selected"
                              :clearable="false"
                            >
                              <template #list-footer>
                                <li
                                  v-show="province.hasNextPage"
                                  ref="load"
                                  class="loader"
                                >
                                  Loading more options...
                                </li>
                              </template>
                            </v-select-ot>
                          </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                          <p class="data-title">Kota</p>
                          <p class="data-value" v-show="!addressEditable">
                            {{
                              selectedPolicy.address.city
                                ? selectedPolicy.address.city
                                : "-"
                            }}
                          </p>
                          <div class="form-input" v-show="addressEditable">
                            <v-select-ot
                              :options="city.collection"
                              @open="onOpenCity"
                              @search="onSearchCity"
                              @input="onInputCity"
                              label="name"
                              class="investment_type_option"
                              v-model="city.selected"
                              :clearable="false"
                            >
                              <template #list-footer>
                                <li
                                  v-show="city.hasNextPage"
                                  ref="load"
                                  class="loader"
                                >
                                  Loading more options...
                                </li>
                              </template>
                            </v-select-ot>
                          </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                          <p class="data-title">Kecamatan</p>
                          <p class="data-value" v-show="!addressEditable">
                            {{
                              selectedPolicy.address.street
                                ? selectedPolicy.address.street
                                : "-"
                            }}
                          </p>
                          <div class="form-input" v-show="addressEditable">
                            <v-select-ot
                              :options="district.collection"
                              @open="onOpenDistrict"
                              @search="onSearchDistrict"
                              @input="onInputDistrict"
                              label="name"
                              class="investment_type_option"
                              v-model="district.selected"
                              :clearable="false"
                            >
                              <template #list-footer>
                                <li
                                  v-show="district.hasNextPage"
                                  ref="load"
                                  class="loader"
                                >
                                  Loading more options...
                                </li>
                              </template>
                            </v-select-ot>
                          </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                          <p class="data-title">Kelurahan</p>
                          <p class="data-value" v-show="!addressEditable">
                            {{
                              selectedPolicy.address.village
                                ? selectedPolicy.address.village
                                : "-"
                            }}
                          </p>
                          <div class="form-input" v-show="addressEditable">
                            <v-select-ot
                              :options="village.collection"
                              @open="onOpenVillage"
                              @search="onSearchVillage"
                              @input="onInputVillage"
                              label="name"
                              class="investment_type_option"
                              v-model="village.selected"
                              :clearable="false"
                            >
                              <template #list-footer>
                                <li
                                  v-show="village.hasNextPage"
                                  ref="load"
                                  class="loader"
                                >
                                  Loading more options...
                                </li>
                              </template>
                            </v-select-ot>
                          </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                          <p class="data-title">Alamat</p>
                          <p class="data-value" v-show="!addressEditable">
                            {{
                              selectedPolicy.address.address1
                                ? selectedPolicy.address.address1
                                : "-"
                            }}
                          </p>
                          <div class="form-input" v-show="addressEditable">
                            <input
                              type="text"
                              class="outlined w-100"
                              placeholder="Jl Jenderal Ahmad Yani By Pass"
                              v-model="selectedPolicy.address.address1"
                            />
                          </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                          <p class="data-title">Blok / No Jalan</p>
                          <p class="data-value" v-show="!addressEditable">
                            {{
                              selectedPolicy.address.address2
                                ? selectedPolicy.address.address2
                                : "-"
                            }}
                          </p>
                          <div class="form-input" v-show="addressEditable">
                            <input
                              type="text"
                              class="outlined w-100"
                              placeholder="F66"
                              v-model="selectedPolicy.address.address2"
                            />
                          </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                          <p class="data-title">RT/RW</p>
                          <p class="data-value" v-show="!addressEditable">
                            {{
                              selectedPolicy.address.address3
                                ? selectedPolicy.address.address3
                                : "-"
                            }}
                          </p>
                          <div class="form-input" v-show="addressEditable">
                            <input
                              type="text"
                              class="outlined w-100"
                              placeholder="001/001"
                              v-model="selectedPolicy.address.address3"
                            />
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="col-12">
            <template>
              <div class="page-body">
                <!-- Transaction Cok Menu -->
                <div class="row">
                  <div class="col-12">
                    <div class="d-flex justify-sm-space-between">
                      <p><b>Nomor Telepon</b></p>
                      <button
                        class="btn btn-primary-outlined btn-mini"
                        @click.prevent="
                          phoneEditable = phoneEditable ? false : true
                        "
                      >
                        {{
                          phoneEditable
                            ? "Kembali"
                            : "Ubah Informasi Nomor Telepon"
                        }}
                      </button>
                    </div>
                    <br /><br />
                    <div class="row">
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Nomor Telepon Saat Ini 1</p>
                        <p class="data-value" v-show="!phoneEditable">
                          {{
                            selectedPolicy.person.mobile
                              ? selectedPolicy.person.mobile
                              : "-"
                          }}
                        </p>
                        <ValidationProvider class="form-input" v-show="phoneEditable" name="Telepon 1" :rules="{ regex: /62[0-9]+$/ }" v-slot="{ errors }">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="08123456789"
                            v-model="selectedPolicy.person.mobile"
                          /> <br />
                          <span class="text-error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Nomor Telepon Saat Ini 2</p>
                        <p class="data-value" v-show="!phoneEditable">
                          {{
                            selectedPolicy.person.mobile
                              ? selectedPolicy.person.mobile2
                              : "-"
                          }}
                        </p>
                        <ValidationProvider class="form-input" v-show="phoneEditable" name="Telepon 2" :rules="{ regex: /62[0-9]+$/ }" v-slot="{ errors }">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="08123456789"
                            v-model="selectedPolicy.person.mobile2"
                          /> <br />
                          <span class="text-error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Nomor Telepon Kantor Saat Ini</p>
                        <p class="data-value" v-show="!phoneEditable">
                          {{
                            selectedPolicy.person.officeTel
                              ? selectedPolicy.person.officeTel
                              : "-"
                          }}
                        </p>
                        <ValidationProvider class="form-input" v-show="phoneEditable" name="Telepon Kantor" :rules="{ regex: /62[0-9]+$/ }" v-slot="{ errors }">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="08123456789"
                            v-model="selectedPolicy.person.officeTel"
                          /> <br />
                          <span class="text-error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">
                          Nomor Telepon Lain Kantor Saat Ini
                        </p>
                        <p class="data-value" v-show="!phoneEditable">
                          {{
                            selectedPolicy.person.officeTel2
                              ? selectedPolicy.person.officeTel2
                              : "-"
                          }}
                        </p>
                        <ValidationProvider class="form-input" v-show="phoneEditable" name="Telepon Kantor Lain" :rules="{ regex: /62[0-9]+$/ }" v-slot="{ errors }">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="08123456789"
                            v-model="selectedPolicy.person.officeTel2"
                          /> <br />
                          <span class="text-error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Nomor Telepon Rumah Saat Ini</p>
                        <p class="data-value" v-show="!phoneEditable">
                          {{
                            selectedPolicy.person.homeTel
                              ? selectedPolicy.person.homeTel
                              : "-"
                          }}
                        </p>
                        <div class="form-input" v-show="phoneEditable">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="200.000"
                            v-model="selectedPolicy.person.homeTel"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-sm-12">
            <p class="data-title mb-2">Email Address</p>
            <div class="d-flex justify-sm-space-between">
              <p class="data-value" v-show="!emailEditable">
                {{
                  selectedPolicy.person.email
                    ? selectedPolicy.person.email
                    : "-"
                }}
              </p>
              <div class="form-input" v-show="emailEditable">
                <ValidationProvider name="Email" rules="email" v-slot="{ errors }">
                  <input
                    type="text"
                    class="outlined"
                    placeholder="200.000"
                    v-model="selectedPolicy.person.email"
                  /> <br />
                  <span class="text-error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <button
                class="btn btn-primary-outlined btn-mini"
                @click.prevent="emailEditable = emailEditable ? false : true"
              >
                {{ !emailEditable ? "Ubah Email" : "Kembali" }}
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-sm-12">
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
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button
              class="btn btn-primary btn-save float-right"
              type="submit"
            >
              Simpan
            </button>
          </div>
        </div>
      </form>
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
  </ValidationObserver>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "investment-fund-allocation-change",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    this.getMyPolicy();
    this.getProvinces();

    this.province.observer = new IntersectionObserver(this.onScrollProvince);
    this.city.observer = new IntersectionObserver(this.onScrollCity);
    this.district.observer = new IntersectionObserver(this.onScrollDistrict);
    this.village.observer = new IntersectionObserver(this.onScrollVillage);

    if ($nuxt.$route.name != "transaction-submission-change-customer-info") {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  data() {
    return {
      isLoading: true,
      showMe: true,
      addressEditable: false,
      phoneEditable: false,
      emailEditable: false,
      selectedPolicy: null,
      identityType: [
        {
          type: 1,
          objectName: "policyHolder",
          name: "Pemegang Polis",
        },
      ],
      selectedIdentityType: null,
      province: {
        observer: null,
        limit: 10,
        search: "",
        page: 1,
        selected: null,
        hasNextPage: false,
        collection: [],
      },
      city: {
        observer: null,
        limit: 10,
        search: "",
        page: 1,
        selected: null,
        hasNextPage: false,
        collection: [],
      },
      district: {
        observer: null,
        limit: 10,
        search: "",
        page: 1,
        selected: null,
        hasNextPage: false,
        collection: [],
      },
      village: {
        observer: null,
        limit: 10,
        search: "",
        page: 1,
        selected: null,
        hasNextPage: false,
        collection: [],
      },
    };
  },
  computed: {
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-change-payer") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
    getMyPolicy: async function () {
      await this.switchType(this.identityType[0].type);
      if (this.selectedPolicy.address.addressFormat == "Y") {
        this.selectedPolicy.address.province = await this.findProvince(
          this.selectedPolicy.address.province
        );
        this.selectedPolicy.address.city = await this.findCity(
          this.selectedPolicy.address.city
        );
        this.selectedPolicy.address.street = await this.findDistrict(
          this.selectedPolicy.address.street
        );
        this.selectedPolicy.address.village = await this.findVillage(
          this.selectedPolicy.address.village
        );
      }
      this.isLoading = false;
    },
    switchType: async function (type) {
      const self = this;
      return new Promise((res, rej) => {
        this.selectedIdentityType = this.identityType.find(
          (v, i) => v.type == type
        );
        this.selectedPolicy = this.myPolicy.policyWithCode.policyHolder;
        this.selectedPolicy.proposalNumber =
          this.myPolicy.policyWithCode.proposalNumber;
        this.selectedPolicy.identityType = this.selectedIdentityType;

        res("Done");
      });
    },
    save: async function () {
      // patch to action
      this.$store
        .dispatch("submission_transaction/saveCustomerinfo", {
          selectedPolicy: this.selectedPolicy,
          selectedProvince: this.province.selected,
          selectedCity: this.city.selected,
          selectedDistrict: this.district.selected,
          selectedVillage: this.village.selected,
        })
        .then((res) => {
          this.$router.push({ path: "./customer-info/resume" });
        });
      // console.log(this.province.selected);
    },
    addSelfieKtpImage: function (e) {
      this.$store.dispatch("submission_transaction/uploadSelieKtpFile", {
        file: e.target.files[0],
      });
    },

    getProvinces: async function () {
      let response = await this.$getProvinces(
        this.province.page,
        this.province.search
      );
      if (response.success) {
        this.province.hasNextPage = response.data.pageInfo.hasNextPage;
        if (this.province.collection.length <= 0) {
          this.province.collection = response.data.items;
        } else {
          response.data.items.map((item) => {
            this.province.collection.push(item);
          });
        }
      }
    },

    onOpenProvince: async function () {
      if (this.province.hasNextPage) {
        await this.$nextTick();
        this.province.observer.observe(this.$refs.load);
      }
    },

    onSearchProvince: async function (value) {
      this.province.search = value;
      this.province.page = 1;
      this.province.collection = [];
      this.getProvinces();
    },

    onScrollProvince: async function ([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.province.page += 1;
        this.getProvinces();
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    onInputProvince: async function () {
      this.city.page = 1;
      this.city.collection = this.city.selected = [];
      this.district.collection = this.district.selected = [];
      this.village.collection = this.village.selected = [];
      this.selectedPolicy.address.province = this.province.selected.name;
      this.getCities();
    },

    getCities: async function () {
      let response = await this.$getCities(
        this.city.page,
        this.province.selected.id
      );
      if (response.success) {
        this.city.hasNextPage = response.data.pageInfo.hasNextPage;
        if (this.city.collection.length <= 0) {
          this.city.collection = response.data.items;
        } else {
          response.data.items.map((item) => {
            this.city.collection.push(item);
          });
        }
      }
    },

    onOpenCity: async function () {
      if (this.city.hasNextPage) {
        await this.$nextTick();
        this.city.observer.observe(this.$refs.load);
      }
    },

    onSearchCity: async function (value) {
      this.city.search = value;
    },

    onScrollCity: async function ([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.city.page += 1;
        this.getCities();
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    onInputCity: async function () {
      this.district.page = 1;
      this.district.collection = this.district.selected = [];
      this.village.collection = this.village.selected = [];
      this.selectedPolicy.address.city = this.city.selected.name;
      this.getDistricts();
    },

    getDistricts: async function () {
      let response = await this.$getDistricts(
        this.district.page,
        this.city.selected.id
      );
      if (response.success) {
        this.district.hasNextPage = response.data.pageInfo.hasNextPage;
        if (this.district.collection.length <= 0) {
          this.district.collection = response.data.items;
        } else {
          response.data.items.map((item) => {
            this.district.collection.push(item);
          });
        }
      }
    },

    onOpenDistrict: async function () {
      if (this.district.hasNextPage) {
        await this.$nextTick();
        this.district.observer.observe(this.$refs.load);
      }
    },

    onSearchDistrict: async function (value) {
      this.district.search = value;
    },

    onScrollDistrict: async function ([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.district.page += 1;
        this.getDistricts();
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    onInputDistrict: async function () {
      this.village.page = 1;
      this.village.collection = this.village.selected = [];
      this.selectedPolicy.address.street = this.district.selected.name;
      this.getVillages();
    },

    getVillages: async function () {
      let response = await this.$getVillages(
        this.village.page,
        this.district.selected.id
      );
      if (response.success) {
        this.village.hasNextPage = response.data.pageInfo.hasNextPage;
        if (this.village.collection.length <= 0) {
          this.village.collection = response.data.items;
        } else {
          response.data.items.map((item) => {
            this.village.collection.push(item);
          });
        }
      }
    },

    onOpenVillage: async function () {
      if (this.village.hasNextPage) {
        await this.$nextTick();
        this.village.observer.observe(this.$refs.load);
      }
    },

    onSearchVillage: async function (value) {
      this.village.search = value;
    },

    onScrollVillage: async function ([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.village.page += 1;
        this.getVillages();
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    onInputVillage: async function () {
      this.selectedPolicy.address.village = this.village.selected.name;
    },

    findProvince: async function (provinceId = null) {
      if (provinceId != null) {
        let response = await this.$findProvince(provinceId);
        if (response.success) {
          return response.data.name;
        } else {
          return provinceId;
        }
      }
      return null;
    },
    findCity: async function (cityId) {
      if (cityId != null) {
        let response = await this.$findCity(cityId);
        if (response.success) {
          return response.data.name;
        } else {
          return cityId;
        }
      }
      return null;
    },
    findDistrict: async function (districtId) {
      if (districtId != null) {
        let response = await this.$findDistrict(districtId);
        if (response.success) {
          return response.data.name;
        } else {
          return districtId;
        }
      }
      return null;
    },
    findVillage: async function (villageId) {
      if (villageId != null) {
        let response = await this.$findVillage(villageId);
        if (response.success) {
          return response.data.name;
        } else {
          return villageId;
        }
      }
      return null;
    },
  },
};
</script>
