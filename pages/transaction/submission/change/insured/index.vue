<template>
  <div>
    <template v-if="!isLoading">
      <form @submit.prevent="save">
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

        <hr class="my-4" />

        <div class="row">
          <div class="col-12">
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
                v-model="partyChoosen"
                @input="(e) => { onInsuredChoosen(e) }"
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
                  {{  item.benefitLevelDescrp != "-" ? item.benefitLevelDescrp : $convertCurrency(item.currentPremium.sumAssured || 0) }}
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
                  {{ $convertCurrency(totalPremAll(item)) }}
                </template>
                <template v-slot:item.riskStatus="{ item }">
                  {{
                    (item ? $riskStatus(item.riskStatus) : "-")
                  }}
                </template>
              </v-data-table>
            </template>
          </div>
        </div>

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
            <small
              >Nama Depan tidak bisa menggunakan nomor dan tanda baca</small
            >
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
            <small
              >Nama Belakang tidak bisa menggunakan nomor dan tanda baca</small
            >
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
            <small>Nomor Identitas tidak bisa menggunakan tanda baca</small>
          </div>
        </div>

        <div class="row">
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
            <small
              >Tempat lahir tidak bisa menggunakan nomor dan tanda baca</small
            >
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
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">No Handphone</p>
            <div class="form-input">
              <input
                type="number"
                v-model="form.phoneNumber"
                class="form-control"
              />
            </div>
            <small
              >No Hanphone tidak bisa menggunakan huruf dan tanda baca</small
            >
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Alamat Email</p>
            <div class="form-input">
              <input type="email" v-model="form.email" class="form-control" />
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
                          isEditable(index)
                            ? "Kembali"
                            : "Ubah Informasi Alamat"
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
                              placeholder="Jl Jenderal XXX..."
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
                        <div
                          class="col-lg-12 col-sm-6"
                          v-if="!isEditable(index)"
                        >
                          <p class="data-title mb-2">Jenis Alamat</p>
                          <div class="form-input">-</div>
                        </div>
                        <div
                          class="col-lg-12 col-sm-6"
                          v-if="isEditable(index)"
                        >
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
                          <p class="data-value" v-show="!isEditable(index)">
                            {{
                              form.addresses[index].address7
                            }}
                          </p>
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
                              form.addresses[index].address6
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
                              form.addresses[index].address5
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
                              form.addresses[index].address4
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
                              placeholder="Jl Jenderal XXX..."
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
              <p class="data-title mb-2">Fotocopy KTP Tertanggung</p>
              <input
                type="file"
                ref="beneficiaryKtpAttachment"
                v-show="false"
                accept="image/*"
                @change="
                  (e) => {
                    validate(e);
                    addBeneficiaryKtpImage(e);
                  }
                "
              />
              <button
                class="btn btn-primary-outlined"
                @click.prevent="$refs.beneficiaryKtpAttachment.click()"
              >
                Unggah
              </button>
              <small>{{ form.beneficiaryKtpAttachment.name }}</small>
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
              <p class="data-title mb-2">Selfie + KTP Tertanggung</p>
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
          <div class="col-12">
            <v-radio-group
              v-model="form.familyAttachment"
              row
              @change="form.documentAttachment = {}"
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
                  form.familyAttachment == "BIRTHCERTIFICATE"
                    ? "Akte Kelahiran"
                    : "Ijazah"
                }}
                Tertanggung
              </p>
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
                  - Pengajuan ini hanya bersifat merevisi tidak mengganti Tertanggung, untuk informasi lebih lanjut dapat menghubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id atau Service point atau Kantor Layanan BNI Life.
                </li>
                <li>
                  - Perubahan Jenis Kelamin dan Tanggal lahir tertanggung dapat
                  menggunakan menu perubahan Data tgl lahir & Jenis kelamin
                  tertanggung.
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
import { identityType, martialStatus, addressType } from "@/utils/constant";
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  components: { SaveIcon, InfoIcon },
  data() {
    return {
      modal: {
        message: "",
        show: false,
        button: {
          text: "Tutup",
          redirect_link: "/transaction/submission",
          redirect_type: "spa",
        },
      },
      my_policy: null,
      isLoading: true,
      partyChoosen: [],
      options: {
        identityType,
        addressType,
        martialStatus,
      },
      table: {
        headers: [
          {
            text: "Nama Manfaat",
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
      radios: [
        { label: "Ijazah", value: "IJAZAH" },
        {
          label: "Akte Kelahiran",
          value: "BIRTHCERTIFICATE",
        },
      ],
      form: {
        familyAttachment: "IJAZAH",
        partyId: null,
        firstName: "",
        lastName: "",
        marrigeStatus: "",
        certiType: "",
        certiCode: "",
        birthPlace: "",
        phoneNumber: "",
        email: "",
        addresses: [],
        ktpAttachment: {},
        ktpSelfieAttachment: {},
        beneficiaryKtpAttachment: {},
        documentAttachment: {},
      },
      validationMessage: [],
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
          value: item.identifier,
        };
      });
    },
  },

  beforeMount() {
    if (this.myPolicy.policyWithCode.riskStatus != 1) {
      this.modal.show = true;
      this.modal.message =
        "Polis Anda sudah tidak aktif transaksi tidak dapat dilakukan, untuk informasi lebih lanjut silahkan menghubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id";
    }

    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Perubahan Data Tertanggung",
      sub: "Pengajuan Perubahan Data Tertanggung",
    });
  },

  mounted() {
    this.getData();

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
    getData: async function () {
      let data = this.myPolicy;
      let productIds = [],
        products = [];
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

    async onInsuredChoosen() {
      if (this.partyChoosen.length > 0) {
        const insuredChoosen = this.myPolicy.policyWithCode.insureds.find(x => x.partyId == this.partyChoosen[0].insureds[0].insured.partyId)
        this.form.addresses = [];
        this.form.addresses.push({
          ...insuredChoosen.address,
          addressEditable: false,
          addressType: "",
        });
        this.form.partyId = this.partyChoosen[0].insureds[0].insured.partyId;
        this.form.firstName = insuredChoosen.person.firstName;
        this.form.lastName = insuredChoosen.person.lastName;
        this.form.marrigeStatus = insuredChoosen.person.marriageId != null ? "KAWIN" : "BELUM KAWIN";
        this.form.certiType = insuredChoosen.person.certiType;
        this.form.certiCode = insuredChoosen.person.certiCode;
        this.form.birthPlace = insuredChoosen.person.birthPlace;
        this.form.email = insuredChoosen.person.email;
        this.form.phoneNumber = insuredChoosen.mobileTelephone;
      } else {
        this.resetForm();
      }
    },

    resetForm() {
      this.form = {
        familyAttachment: "IJAZAH",
        partyId: null,
        firstName: "",
        lastName: "",
        marrigeStatus: "",
        certiType: "",
        certiCode: "",
        birthPlace: "",
        phoneNumber: "",
        email: "",
        addresses: [],
        ktpAttachment: {},
        beneficiaryKtpAttachment: {},
        ktpSelfieAttachment: {},
        documentAttachment: {},
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
          return findProvince(provinceId);
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
          return findCity(cityId);
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
          return findDistrict(districtId);
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
          return findVillage(villageId);
        }
      }
      return null;
    },

    addAddressChanges() {
      const cloneIndex = this.form.addresses.length - 1;
      const clonedAddressChange = this.form.addresses[cloneIndex];
      this.form.addresses.push({
        ...clonedAddressChange,
        province: "",
        addressFormat: "N",
        city: "",
        street: "",
        district: "",
        village: "",
        address1: "-",
        address2: "",
        address3: "",
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

    totalPremAll: (item) => {
      return item
        ? item.currentPremium.stdPremAf +
            (item.recurringTopup?.topupAmount || 0)
        : 0;
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
          "submission_transaction/uploadDocumentFile",
          { file: e.target.files[0] }
        );
        this.form.documentAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },

    async addBeneficiaryKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadBeneficiaryOwnerFile",
          { file: e.target.files[0] }
        );
        this.form.beneficiaryKtpAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },

    validate() {
      this.validationMessage = [];

      if (!this.form.firstName) {
        this.validationMessage.push("Nama Depan diperlukan");
      }
      if (!this.form.certiType) {
        this.validationMessage.push("Kartu Identitas diperlukan");
      }
      if (!this.form.certiCode) {
        this.validationMessage.push("Nomor Identitas diperlukan");
      }
      if (!this.form.birthPlace) {
        this.validationMessage.push("Tempat lahir diperlukan");
      }
      if (!this.form.phoneNumber) {
        this.validationMessage.push("No Handphone diperlukan");
      }
      if (!this.form.email) {
        this.validationMessage.push("Alamat Email diperlukan");
      }


      let warningAddress =
        "Alamat {{ alamatWarning }} perlu dirubah/diisi lengkap";
      let warningAddresses = [];
      for (let i = 0; i < this.province.length; i++) {
        if (
            !this.province[i].selected || 
            !this.city[i].selected || 
            !this.district[i].selected || 
            !this.village[i].selected ||
            !this.form.addresses[i].address1 || 
            !this.form.addresses[i].address2 || 
            !this.form.addresses[i].address3 
          ) {
          warningAddresses.push(i + 1);
          continue;
        }
      }
      
      if (warningAddresses.length > 0) {
        warningAddress = warningAddress.replace(
          "{{ alamatWarning }}",
          warningAddresses.join(", ")
        );
        this.validationMessage.push(warningAddress);
      }

      if (!this.form.marrigeStatus) {
        this.validationMessage.push("Status Perkawinan diperlukan");
      }
      if (!this.form.ktpAttachment.name) {
        this.validationMessage.push(
          "Unggah Fotocopy KTP Pemegang polis diperlukan"
        );
      }
      if (!this.form.documentAttachment.name) {
        this.validationMessage.push("Unggah Fotocopy KTP Pembayar diperlukan");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP Pembayar diperlukan");
      }
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
        "submission_transaction/change_insured/setChangeInsured",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/change/insured/resume",
      });
    },
  },
};
</script>
