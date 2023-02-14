<template>
  <div>
    <pre>{{ isLoading }}</pre>
    <form v-if="!isLoading" @submit.prevent="save">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">
            {{
              $isNullWithSpace(
                myPolicy.policyWithCode.policyHolder.person.firstName
              ) +
              $isNullWithSpace(
                myPolicy.policyWithCode.policyHolder.person.midName
              ) +
              $isNullWithSpace(
                myPolicy.policyWithCode.policyHolder.person.lastName
              )
            }}
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
          <p class="data-title mb-2">Nama Depan</p>
          <div class="form-input">
            <input type="text" pattern="[a-zA-Z.,\s]+" class="form-control" />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Belakang</p>
          <div class="form-input">
            <input type="text" pattern="[a-zA-Z.,\s]+" class="form-control" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Kartu Identitas</p>
          <div class="form-input">
            <v-select
              outlined
              dense
              item-text="name"
              item-value="value"
              :items="optionCertiType"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Identitas</p>
          <div class="form-input">
            <input type="text" pattern="[0-9a-zA-Z\s]+" class="form-control" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Lahir</p>
          <div class="form-input">
            <input type="date" class="form-control" />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tempat lahir</p>
          <div class="form-input">
            <input type="text" pattern="[a-zA-Z.,\s]+" class="form-control" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">No Handphone</p>
          <div class="form-input">
            <input type="number" class="form-control" />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Alamat Email</p>
          <div class="form-input">
            <input type="email" class="form-control" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Jenis Kelamin</p>
          <div class="form-input">
            <v-select
              outlined
              dense
              item-text="name"
              item-value="value"
              :items="optionGenders"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Status Perkawinan</p>
          <div class="form-input">
            <v-select outlined dense :items="options.martialStatus"></v-select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <template>
            <div class="page-body">
              <div class="row">
                <div class="col-12">
                  <div
                    class="d-flex flex-column flex-md-row justify-sm-space-between"
                  >
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
                            $isNullWithSpace(selectedPolicy.address.province) +
                            $isNullWithSpace(selectedPolicy.address.city) +
                            $isNullWithSpace(selectedPolicy.address.street) +
                            $isNullWithSpace(selectedPolicy.address.village) +
                            $isNullWithSpace(selectedPolicy.address.address1) +
                            $isNullWithSpace(selectedPolicy.address.address2) +
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

                  <br />
                  <hr />
                  <br />

                  <div class="row">
                    <template v-if="addressEditable">
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Provinsi</p>
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
      </div>

      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">Unggah Foto KTP Pemegang Polis</p>
            <input
              type="file"
              ref="ktpAttachment"
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
              @click.prevent="$refs.ktpAttachment.click()"
            >
              Unggah
            </button>
            <small>{{ form.ktpAttachment.name }}</small>
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
            <p class="data-title mb-2">Fotocopy KTP Pembayar</p>
            <input
              type="file"
              ref="payerKtpAttachment"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addPayerKtpImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.payerKtpAttachment.click()"
            >
              Unggah
            </button>
            <small>{{ form.payerKtpAttachment.name }}</small>
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
            <p class="data-title mb-2">Selfie + KTP Pembayar</p>
            <input
              type="file"
              ref="inputPayerSelfieKtpImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addPayerSelfieKtpImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputPayerSelfieKtpImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.payerSelfieKtpAttachment.name }}</small>
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { identityType, martialStatus } from "@/utils/constant";

export default {
  components: {},
  data() {
    return {
      isLoading: true,
      options: {
        identityType,
        martialStatus,
      },
      addressEditable: false,
      selectedPolicy: null,
      addressType: [
        {
          type: 7,
          name: "Alamat ID",
        },
      ],
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

      form: {
        ktpAttachment: {},
        payerKtpAttachment: {},
        payerSelfieKtpAttachment: {},
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
    optionGenders() {
      return ["M", "F"].map((item) => {
        return {
          name: item == "M" ? "Laki-laki" : "Perempuan",
          value: item,
        };
      });
    },
    optionCertiType() {
      return this.options.identityType.map((item, index) => {
        return {
          name: item,
          value: 1 + +index,
        };
      });
    },
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Perubahan Data Pembayar Polis",
      sub: "Pengajuan Perubahan Data Pembayar Polis",
    });
  },
  mounted() {
    this.getMyPolicy();
    this.getProvinces();

    this.province.observer = new IntersectionObserver(this.onScrollProvince);
    this.city.observer = new IntersectionObserver(this.onScrollCity);
    this.district.observer = new IntersectionObserver(this.onScrollDistrict);
    this.village.observer = new IntersectionObserver(this.onScrollVillage);
  },
  methods: {
    getMyPolicy: async function () {
      await this.switchType(this.addressType[0].type);
      if (this.selectedPolicy.address.addressFormat == "Y") {
        if (!isNaN(parseInt(this.selectedPolicy.address.province))) {
          this.selectedPolicy.address.province = await this.findProvince(
            this.selectedPolicy.address.province
          );
        }
        if (!isNaN(parseInt(this.selectedPolicy.address.city))) {
          this.selectedPolicy.address.city = await this.findCity(
            this.selectedPolicy.address.city
          );
        }
        if (!isNaN(parseInt(this.selectedPolicy.address.street))) {
          this.selectedPolicy.address.street = await this.findDistrict(
            this.selectedPolicy.address.street
          );
        }
        if (!isNaN(parseInt(this.selectedPolicy.address.village))) {
          this.selectedPolicy.address.village = await this.findVillage(
            this.selectedPolicy.address.village
          );
        }
      }
      this.isLoading = false;
    },
    switchType: async function (type) {
      const self = this;
      return new Promise((res, rej) => {
        this.selectedAddressType = this.addressType.find(
          (v, i) => v.type == type
        );
        this.selectedPolicy = this.myPolicy.policyWithCode.payers[0];
        this.selectedPolicy.proposalNumber =
          this.myPolicy.policyWithCode.proposalNumber;
        this.selectedPolicy.addressType = this.selectedAddressType;

        res("Done");
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
      if (provinceId != null && !isNaN(parseInt(provinceId))) {
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
      if (cityId != null && !isNaN(parseInt(cityId))) {
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
      if (districtId != null && !isNaN(parseInt(districtId))) {
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
      if (villageId != null && !isNaN(parseInt(villageId))) {
        let response = await this.$findVillage(villageId);
        if (response.success) {
          return response.data.name;
        } else {
          return villageId;
        }
      }
      return null;
    },

    async addKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadKtpFile",
          { file: e.target.files[0] }
        );
        this.form.ktpAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addPayerKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadKtpFile",
          { file: e.target.files[0] }
        );
        this.form.payerKtpAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addPayerSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadKtpFile",
          { file: e.target.files[0] }
        );
        this.form.payerSelfieKtpAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
  },
};
</script>
