<template>
  <div>
    <form v-if="!isLoading" @submit.prevent="save">
      <div class="row">
        <div class="col-lg-3 col-sm-6">
          <p class="data-title mb-2">Nomor Polis</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyNumber }}
          </p>
        </div>

        <div class="col-lg-3 col-sm-6">
          <p class="data-title mb-2">Nama Depan</p>
          <p class="data-value">
            {{
              $isNullWithSpace(
                myPolicy.policyWithCode.policyHolder.person.firstName
              )
            }}
          </p>
        </div>

        <div class="col-lg-3 col-sm-6">
          <p class="data-title mb-2">Nama Belakang</p>
          <p class="data-value">
            {{
              myPolicy.policyWithCode.policyHolder.person.lastName
                ? $isNullWithSpace(
                    myPolicy.policyWithCode.policyHolder.person.lastName
                  )
                : "-"
            }}
          </p>
        </div>

        <div class="col-lg-3 col-sm-6">
          <p class="data-title mb-2">Tipe Identitas</p>
          <p class="data-value">
            {{
              $labelIdentityType(
                +myPolicy.policyWithCode.policyHolder.person.certiType
              )
            }}
          </p>
        </div>

        <div class="col-lg-3 col-sm-6">
          <p class="data-title mb-2">Nomor Identitas</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyHolder.person.certiCode }}
          </p>
        </div>

        <div class="col-lg-3 col-sm-6">
          <p class="data-title mb-2">Tanggal Lahir</p>
          <p class="data-value">
            {{
              $formatDate(myPolicy.policyWithCode.policyHolder.person.birthday)
            }}
          </p>
        </div>

        <div class="col-lg-3 col-sm-6">
          <p class="data-title mb-2">Tempat Lahir</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyHolder.person.birthPlace || "-" }}
          </p>
        </div>

        <div class="col-lg-3 col-sm-6">
          <p class="data-title mb-2">Jenis Kelamin</p>
          <p class="data-value">
            {{
              myPolicy.policyWithCode.policyHolder.person.gender == "M"
                ? "Laki laki"
                : "Perempuan"
            }}
          </p>
        </div>

        <div class="col-lg-3 col-sm-6">
          <p class="data-title mb-2">No Handphone</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyHolder.mobileTelephone || "-" }}
          </p>
        </div>

        <div class="col-lg-3 col-sm-6">
          <p class="data-title mb-2">Alamat Email</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyHolder.person.email || "-" }}
          </p>
        </div>
      </div>

      <hr class="my-4" />

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Depan</p>
          <div class="form-input">
            <input
              type="text"
              v-model="form.firstName"
              pattern="[a-zA-Z.,\s]+"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Belakang</p>
          <div class="form-input">
            <input
              type="text"
              v-model="form.lastName"
              pattern="[a-zA-Z.,\s]+"
              class="form-control"
            />
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
              v-model="form.certiType"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Identitas</p>
          <div class="form-input">
            <input
              type="text"
              v-model="form.certiCode"
              pattern="[0-9a-zA-Z\s]+"
              class="form-control"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Lahir</p>
          <div class="form-input">
            <input type="date" v-model="form.birthDate" class="form-control" />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tempat lahir</p>
          <div class="form-input">
            <input
              type="text"
              v-model="form.birthPlace"
              pattern="[a-zA-Z.,\s]+"
              class="form-control"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">No Handphone</p>
          <div class="form-input">
            <input
              type="number"
              v-model="form.phoneNumber"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Alamat Email</p>
          <div class="form-input">
            <input type="email" v-model="form.email" class="form-control" />
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
              v-model="form.gender"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Status Perkawinan</p>
          <div class="form-input">
            <v-select
              outlined
              dense
              v-model="form.marrigeStatus"
              :items="options.martialStatus"
            ></v-select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p><b>Alamat</b></p>
          <template>
            <div class="page-body">
              <div
                class="row"
                v-for="(item, index) in form.addresses"
                :key="index"
              >
                <div class="col-12">
                  <div
                    class="
                      d-flex
                      flex-column flex-md-row
                      justify-sm-space-between
                    "
                  >
                    <button
                      class="btn btn-primary-outlined btn-mini"
                      @click.prevent="toggleAddressEditable(index)"
                    >
                      {{
                        isEditable(index) ? "Kembali" : "Ubah Informasi Alamat"
                      }}
                    </button>
                    <button
                      v-if="index != 0"
                      class="btn btn-primary-outlined btn-mini"
                      @click.prevent="deleteAddressEditable(index)"
                    >
                      {{ "Hapus Alamat" }}
                    </button>
                  </div>
                  <br /><br />
                  <div class="row">
                    <template
                      v-if="
                        !isEditable(index) &&
                        form.addresses[index].addressFormat == 'N'
                      "
                    >
                      <div class="col-lg-12 col-sm-12">
                        <p class="data-title">Alamat</p>
                        <p class="data-value" v-show="!isEditable(index)">
                          {{
                            $isNullWithSpace(form.addresses[index].province) +
                            $isNullWithSpace(form.addresses[index].city) +
                            $isNullWithSpace(form.addresses[index].street) +
                            $isNullWithSpace(form.addresses[index].village) +
                            $isNullWithSpace(form.addresses[index].address1) +
                            $isNullWithSpace(form.addresses[index].address2) +
                            $isNullWithSpace(form.addresses[index].address3)
                          }}
                        </p>
                        <div class="form-input" v-show="isEditable(index)">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="Jl Jenderal Ahmad Yani By Pass"
                            v-model="form.addresses[index].address1"
                          />
                        </div>
                      </div>
                    </template>

                    <template
                      v-if="
                        form.addresses[index].addressFormat == 'Y' ||
                        isEditable(index)
                      "
                    >
                      <div class="col-lg-12 col-sm-6">
                        <p class="data-title mb-2">Jenis Alamat</p>
                        <div class="form-input">
                          <v-select
                            outlined
                            dense
                            item-text="name"
                            item-value="value"
                            :items="optionAddressType"
                            v-model="form.addresses[index].addressType"
                          ></v-select>
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Provinsi</p>
                        <div class="form-input" v-show="isEditable(index)">
                          <v-select-ot
                            :id="'province-option-' + index"
                            :options="province[index].collection"
                            @open="onOpenProvince(index)"
                            @search="onSearchProvince(index)"
                            @input="onInputProvince(index)"
                            label="name"
                            class="select_type_option"
                            v-model="province[index].selected"
                            :clearable="false"
                          >
                            <template #list-footer>
                              <li
                                v-show="province[index].hasNextPage"
                                :class="'loader load-province-' + index"
                              >
                                Loading more options...
                              </li>
                            </template>
                          </v-select-ot>
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Kota</p>
                        <p class="data-value" v-show="!isEditable(index)">
                          {{
                            form.addresses[index].city
                              ? form.addresses[index].city
                              : "-"
                          }}
                        </p>
                        <div class="form-input" v-show="isEditable(index)">
                          <v-select-ot
                            :options="city[index].collection"
                            @open="onOpenCity(index)"
                            @search="onSearchCity(index)"
                            @input="onInputCity(index)"
                            label="name"
                            class="select_type_option"
                            v-model="city[index].selected"
                            :clearable="false"
                          >
                            <template #list-footer>
                              <li
                                v-show="city[index].hasNextPage"
                                :class="'loader load-city-' + index"
                              >
                                Loading more options...
                              </li>
                            </template>
                          </v-select-ot>
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Kecamatan</p>
                        <p class="data-value" v-show="!isEditable(index)">
                          {{
                            form.addresses[index].street
                              ? form.addresses[index].street
                              : "-"
                          }}
                        </p>
                        <div class="form-input" v-show="isEditable(index)">
                          <v-select-ot
                            :options="district[index].collection"
                            @open="onOpenDistrict(index)"
                            @search="onSearchDistrict(index)"
                            @input="onInputDistrict(index)"
                            label="name"
                            class="select_type_option"
                            v-model="district[index].selected"
                            :clearable="false"
                          >
                            <template #list-footer>
                              <li
                                v-show="district[index].hasNextPage"
                                :class="'loader load-district-' + index"
                              >
                                Loading more options...
                              </li>
                            </template>
                          </v-select-ot>
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Kelurahan</p>
                        <p class="data-value" v-show="!isEditable(index)">
                          {{
                            form.addresses[index].village
                              ? form.addresses[index].village
                              : "-"
                          }}
                        </p>
                        <div class="form-input" v-show="isEditable(index)">
                          <v-select-ot
                            :options="village[index].collection"
                            @open="onOpenVillage(index)"
                            @search="onSearchVillage(index)"
                            @input="onInputVillage(index)"
                            label="name"
                            class="select_type_option"
                            v-model="village[index].selected"
                            :clearable="false"
                          >
                            <template #list-footer>
                              <li
                                v-show="village[index].hasNextPage"
                                :class="'loader load-village-' + index"
                              >
                                Loading more options...
                              </li>
                            </template>
                          </v-select-ot>
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Alamat</p>
                        <p class="data-value" v-show="!isEditable(index)">
                          {{
                            form.addresses[index].address1
                              ? form.addresses[index].address1
                              : "-"
                          }}
                        </p>
                        <div class="form-input" v-show="isEditable(index)">
                          <input
                            type="text"
                            class="outlined w-100"
                            placeholder="Jl Jenderal Ahmad Yani By Pass"
                            v-model="form.addresses[index].address1"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Blok / No Jalan</p>
                        <p class="data-value" v-show="!isEditable(index)">
                          {{
                            form.addresses[index].address2
                              ? form.addresses[index].address2
                              : "-"
                          }}
                        </p>
                        <div class="form-input" v-show="isEditable(index)">
                          <input
                            type="text"
                            class="outlined w-100"
                            placeholder="F66"
                            v-model="form.addresses[index].address2"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">RT/RW</p>
                        <p class="data-value" v-show="!isEditable(index)">
                          {{
                            form.addresses[index].address3
                              ? form.addresses[index].address3
                              : "-"
                          }}
                        </p>
                        <div class="form-input" v-show="isEditable(index)">
                          <input
                            type="text"
                            class="outlined w-100"
                            placeholder="001/001"
                            v-model="form.addresses[index].address3"
                          />
                        </div>
                      </div>
                    </template>
                  </div>
                </div>

                <hr
                  class="col-12 my-4"
                  v-if="index != form.addresses.length - 1"
                />
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="addAddressChanges()"
          >
            {{ "Tambah Alamat" }}
          </button>
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
            <p class="data-title mb-2">Fotocopy KTP Pemegang Polis</p>
            <input
              type="file"
              ref="ktpSelfieAttachment"
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
              @click.prevent="$refs.ktpSelfieAttachment.click()"
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
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">Selfie + KTP Pemegang Polis</p>
            <input
              type="file"
              ref="inputDocumentImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addDocumentImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputDocumentImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.documentAttachment.name }}</small>
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
            <br />
            <ul>
              <li>
                - Pengajuan ini hanya bersifat merubah tidak mengganti untuk
                informasi lebih lanjut, dapat menghubungi Customer Care
                1-500-045 atau e-mail ke care@bni-life.co.id atau Service point
                atau Kantor Layanan BNI Life Untuk perubahan data pembayaran
                (Auto debit Tabungan, Kartu kredit, ataupun VA, dapat
                menggunakan perubahan metode pembayaran.
              </li>
              <li>
                - Jika Pemegang polis dan Tertanggung sama, mohon merubah jenis
                kelamin dan Tanggal lahir melalui menu Perubahan Data tgl lahir
                & Jenis Kelamin tertanggung.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ValidationMessage :validation-message="validationMessage" />

      <div class="row">
        <div class="col-12">
          <button class="btn btn-primary btn-save float-right" type="submit">
            <save-icon></save-icon> Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { identityType, martialStatus, addressType } from "@/utils/constant";

export default {
  components: {},
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        marrigeStatus: "",
        certiType: "",
        certiCode: "",
        birthDate: "",
        birthPlace: "",
        phoneNumber: "",
        email: "",
        gender: "",
        addresses: [],
        ktpAttachment: {},
        ktpSelfieAttachment: {},
        documentAttachment: {},
      },
      validationMessage: [],
      isLoading: true,
      options: {
        identityType,
        addressType,
        martialStatus,
      },
      selectedPolicy: null,
      province: [
        {
          observer: null,
          limit: 10,
          search: "",
          page: 1,
          selected: null,
          hasNextPage: false,
          collection: [],
        },
      ],
      city: [
        {
          observer: null,
          limit: 10,
          search: "",
          page: 1,
          selected: null,
          hasNextPage: false,
          collection: [],
        },
      ],
      district: [
        {
          observer: null,
          limit: 10,
          search: "",
          page: 1,
          selected: null,
          hasNextPage: false,
          collection: [],
        },
      ],
      village: [
        {
          observer: null,
          limit: 10,
          search: "",
          page: 1,
          selected: null,
          hasNextPage: false,
          collection: [],
        },
      ],
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

    optionAddressType() {
      return this.options.addressType.map((item) => {
        return {
          name: item.label,
          value: item.idenitfier,
        };
      });
    },
  },

  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Perubahan Data Pemegang Polis",
      sub: "Pengajuan Perubahan Data Pemegang Polis",
    });
  },

  mounted() {
    this.getMyPolicy();

    this.form.addresses.push({
      ...this.selectedPolicy.address,
      addressEditable: false,
      addressType: "",
    });

    this.getProvinces(0);
    this.province[0].observer = new IntersectionObserver((data) =>
      this.onScrollProvince(data, 0)
    );
    this.city[0].observer = new IntersectionObserver((data) =>
      this.onScrollCity(data, 0)
    );
    this.district[0].observer = new IntersectionObserver((data) =>
      this.onScrollDistrict(data, 0)
    );
    this.village[0].observer = new IntersectionObserver((data) =>
      this.onScrollVillage(data, 0)
    );
  },

  methods: {
    getMyPolicy: async function () {
      this.selectedPolicy = this.myPolicy.policyWithCode.policyHolder;

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

    isEditable: function (index) {
      return this.form.addresses[index].addressEditable;
    },

    getProvinces: async function (index) {
      let response = await this.$getProvinces(
        this.province[index].page,
        this.province[index].search
      );
      if (response.success) {
        this.province[index].hasNextPage = response.data.pageInfo.hasNextPage;
        if (this.province[index].collection.length <= 0) {
          this.province[index].collection = response.data.items;
        } else {
          response.data.items.map((item) => {
            this.province[index].collection.push(item);
          });
        }
      }
    },

    onOpenProvince: async function (index) {
      if (this.province[index].hasNextPage) {
        await this.$nextTick();
        this.province[index].observer.observe(
          this.$el.querySelector(".load-province-" + index)
        );
      }
    },

    onSearchProvince: async function (value, index) {
      this.province[index].search = value;
      this.province[index].page = 1;
      this.province[index].collection = [];
      this.getProvinces(index);
    },

    onScrollProvince: async function ([{ isIntersecting, target }], index) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.province[index].page += 1;
        this.getProvinces(index);
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    onInputProvince: async function (index) {
      this.city[index].page = 1;
      this.city[index].collection = this.city[index].selected = [];
      this.district[index].collection = this.district[index].selected = [];
      this.village[index].collection = this.village[index].selected = [];
      this.form.addresses[index].province = this.province[index].selected.name;
      this.getCities(index);
    },

    getCities: async function (index) {
      let response = await this.$getCities(
        this.city[index].page,
        this.province[index].selected.id
      );
      if (response.success) {
        this.city[index].hasNextPage = response.data.pageInfo.hasNextPage;
        if (this.city[index].collection.length <= 0) {
          this.city[index].collection = response.data.items;
        } else {
          response.data.items.map((item) => {
            this.city[index].collection.push(item);
          });
        }
      }
    },

    onOpenCity: async function (index) {
      if (this.city[index].hasNextPage) {
        await this.$nextTick();
        this.city[index].observer.observe(
          this.$el.querySelector(".load-city-" + index)
        );
      }
    },

    onSearchCity: async function (value, index) {
      this.city[index].search = value;
    },

    onScrollCity: async function ([{ isIntersecting, target }], index) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.city[index].page += 1;
        this.getCities(index);
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    onInputCity: async function (index) {
      this.district[index].page = 1;
      this.district[index].collection = this.district[index].selected = [];
      this.village[index].collection = this.village[index].selected = [];
      this.form.addresses[index].city = this.city[index].selected.name;
      this.getDistricts(index);
    },

    getDistricts: async function (index) {
      let response = await this.$getDistricts(
        this.district[index].page,
        this.city[index].selected.id
      );
      if (response.success) {
        this.district[index].hasNextPage = response.data.pageInfo.hasNextPage;
        if (this.district[index].collection.length <= 0) {
          this.district[index].collection = response.data.items;
        } else {
          response.data.items.map((item) => {
            this.district[index].collection.push(item);
          });
        }
      }
    },

    onOpenDistrict: async function (index) {
      if (this.district[index].hasNextPage) {
        await this.$nextTick();
        this.district[index].observer.observe(
          this.$el.querySelector(".load-district-" + index)
        );
      }
    },

    onSearchDistrict: async function (value, index) {
      this.district[index].search = value;
    },

    onScrollDistrict: async function ([{ isIntersecting, target }], index) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.district[index].page += 1;
        this.getDistricts(index);
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    onInputDistrict: async function (index) {
      this.village[index].page = 1;
      this.village[index].collection = this.village[index].selected = [];
      this.form.addresses[index].street = this.district[index].selected.name;
      this.getVillages(index);
    },

    getVillages: async function (index) {
      let response = await this.$getVillages(
        this.village[index].page,
        this.district[index].selected.id
      );
      if (response.success) {
        this.village[index].hasNextPage = response.data.pageInfo.hasNextPage;
        if (this.village[index].collection.length <= 0) {
          this.village[index].collection = response.data.items;
        } else {
          response.data.items.map((item) => {
            this.village[index].collection.push(item);
          });
        }
      }
    },

    onOpenVillage: async function (index) {
      if (this.village[index].hasNextPage) {
        await this.$nextTick();
        this.village[index].observer.observe(
          this.$el.querySelector(".load-village-" + index)
        );
      }
    },

    onSearchVillage: async function (value, index) {
      this.village[index].search = value;
    },

    onScrollVillage: async function ([{ isIntersecting, target }], index) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.village[index].page += 1;
        this.getVillages(index);
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    onInputVillage: async function (index) {
      this.form.addresses[index].village = this.village[index].selected.name;
    },

    toggleAddressEditable(index) {
      this.form.addresses[index].addressEditable =
        !this.form.addresses[index].addressEditable;
    },

    deleteAddressEditable(index) {
      this.form.addresses.splice(index, 1);

      this.province.splice(index, 1);
      this.city.splice(index, 1);
      this.district.splice(index, 1);
      this.village.splice(index, 1);
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

    addAddressChanges() {
      const cloneIndex = this.form.addresses.length - 1;
      const clonedAddressChange = this.form.addresses[cloneIndex];
      this.form.addresses.push({
        ...clonedAddressChange,
        addressEditable: false,
        addressType: "",
      });

      this.province.push({
        observer: null,
        limit: 10,
        search: "",
        page: 1,
        selected: null,
        hasNextPage: false,
        collection: [],
      });
      this.city.push({
        observer: null,
        limit: 10,
        search: "",
        page: 1,
        selected: null,
        hasNextPage: false,
        collection: [],
      });
      this.village.push({
        observer: null,
        limit: 10,
        search: "",
        page: 1,
        selected: null,
        hasNextPage: false,
        collection: [],
      });
      this.district.push({
        observer: null,
        limit: 10,
        search: "",
        page: 1,
        selected: null,
        hasNextPage: false,
        collection: [],
      });

      const lastIndexProvince = this.province.length - 1;

      this.getProvinces(lastIndexProvince);
      this.province[lastIndexProvince].observer = new IntersectionObserver(
        (data) => this.onScrollProvince(data, lastIndexProvince)
      );
      this.city[lastIndexProvince].observer = new IntersectionObserver((data) =>
        this.onScrollCity(data, lastIndexProvince)
      );
      this.district[lastIndexProvince].observer = new IntersectionObserver(
        (data) => this.onScrollDistrict(data, lastIndexProvince)
      );
      this.village[lastIndexProvince].observer = new IntersectionObserver(
        (data) => this.onScrollVillage(data, lastIndexProvince)
      );
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

    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadAttachment",
          { file: e.target.files[0], type: "KTPSELFIE" }
        );
        this.form.ktpSelfieAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },

    async addDocumentImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadKtpFile",
          { file: e.target.files[0] }
        );
        this.form.documentAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },

    validate() {
      this.validationMessage = [];
    },

    save() {
      this.validate();
      if (this.validationMessage.length) return false;

      for (
        let i = 0;
        i < this.province.length &&
        this.form.addresses.length == this.province.length;
        i++
      ) {
        this.form.addresses[i].provinceId = this.province[i].selected.id;
        this.form.addresses[i].province = this.province[i].selected.name;

        this.form.addresses[i].cityId = this.city[i].selected.id;
        this.form.addresses[i].city = this.city[i].selected.name;

        this.form.addresses[i].districtId = this.district[i].selected.id;
        this.form.addresses[i].district = this.province[i].selected.name;

        this.form.addresses[i].villageId = this.village[i].selected.id;
        this.form.addresses[i].village = this.village[i].selected.name;
      }

      this.$store.commit(
        "submission_transaction/change_policy_holder/setChangePolicyHolder",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/change/policy-holder/resume",
      });
    },
  },
};
</script>
