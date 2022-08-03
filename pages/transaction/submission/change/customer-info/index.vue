<template>
  <div>
    <template v-if="!isLoading">
      <div v-show="showMe">
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nama Pemegang Polis</p>
            <p class="data-value">{{
              selectedPolicy.person.firstName ? selectedPolicy.person.firstName : "" + " " +
              selectedPolicy.person.midName ? selectedPolicy.person.midName : "" + " " +
              selectedPolicy.person.lastName ? selectedPolicy.person.lastName : ""}}</p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nomor Polis</p>
            <p class="data-value">{{myPolicy.policyWithCode.proposalNumber}}</p>
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
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Provinsi</p>
                        <p class="data-value" v-show="!addressEditable">
                          {{selectedPolicy.address.province ? selectedPolicy.address.province : "-"}}
                        </p>
                        <div class="form-input" v-show="addressEditable">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="DKI Jakarta"
                            v-model="selectedPolicy.address.province"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Kota</p>
                        <p class="data-value" v-show="!addressEditable">
                          {{selectedPolicy.address.city ? selectedPolicy.address.city : "-"}}
                        </p>
                        <div class="form-input" v-show="addressEditable">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="JAKARTA TIMUR"
                            v-model="selectedPolicy.address.city"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Kecamatan</p>
                        <p class="data-value" v-show="!addressEditable">
                          {{selectedPolicy.address.street ? selectedPolicy.address.street : "-"}}
                        </p>
                        <div class="form-input" v-show="addressEditable">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="PULO GADUNG"
                            v-model="selectedPolicy.address.street "
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Kelurahan</p>
                        <p class="data-value" v-show="!addressEditable">
                           {{selectedPolicy.address.village ? selectedPolicy.address.village : "-"}}
                        </p>
                        <div class="form-input" v-show="addressEditable">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="RAWAMANGUN"
                            v-model="selectedPolicy.address.village "
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Alamat</p>
                        <p class="data-value" v-show="!addressEditable">
                          {{selectedPolicy.address.address1 ? selectedPolicy.address.address1 : "-"}}
                        </p>
                        <div class="form-input" v-show="addressEditable">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="Jl Jenderal Ahmad Yani By Pass"
                            v-model="selectedPolicy.address.address1 "
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Blok / No Jalan</p>
                        <p class="data-value" v-show="!addressEditable">
                          {{selectedPolicy.address.address2 ? selectedPolicy.address.address2 : "-"}}
                        </p>
                        <div class="form-input" v-show="addressEditable">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="F66"
                            v-model="selectedPolicy.address.address2 "
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">RT/RW</p>
                        <p class="data-value" v-show="!addressEditable">
                          {{selectedPolicy.address.address3 ? selectedPolicy.address.address3 : "-"}}
                        </p>
                        <div class="form-input" v-show="addressEditable">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="001/001"
                            v-model="selectedPolicy.address.address3"
                          />
                        </div>
                      </div>
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
                          {{selectedPolicy.person.mobile ? selectedPolicy.person.mobile : "-"}}
                        </p>
                        <div class="form-input" v-show="phoneEditable">

                          <input
                            type="text"
                            class="outlined"
                            placeholder="08123456789"
                            v-model="selectedPolicy.person.mobile"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Nomor Telepon Saat Ini 2</p>
                        <p class="data-value" v-show="!phoneEditable">
                          {{selectedPolicy.person.mobile ? selectedPolicy.person.mobile2 : "-"}}
                        </p>
                        <div class="form-input" v-show="phoneEditable">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="08123456789"
                            v-model="selectedPolicy.person.mobile2"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Nomor Telepon Kantor Saat Ini</p>
                        <p class="data-value" v-show="!phoneEditable">
                          {{selectedPolicy.person.officeTel ? selectedPolicy.person.officeTel : "-"}}
                        </p>
                        <div class="form-input" v-show="phoneEditable">
                         <input
                            type="text"
                            class="outlined"
                            placeholder="08123456789"
                            v-model="selectedPolicy.person.officeTel"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title" >
                          Nomor Telepon Lain Kantor Saat Ini
                        </p>
                        <p class="data-value" v-show="!phoneEditable">
                          {{selectedPolicy.person.officeTel2 ? selectedPolicy.person.officeTel2 : "-"}}
                        </p>
                        <div class="form-input" v-show="phoneEditable">
                          <input
                            type="text"
                            class="outlined"
                            placeholder="08123456789"
                            v-model="selectedPolicy.person.officeTel2"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-12">
                        <p class="data-title">Nomor Telepon Rumah Saat Ini</p>
                        <p class="data-value" v-show="!phoneEditable">
                          {{selectedPolicy.person.homeTel ? selectedPolicy.person.homeTel : "-"}}
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
                {{selectedPolicy.person.email ? selectedPolicy.person.email : "-"}}
              </p>
              <div class="form-input" v-show="emailEditable">
                <input
                  type="text"
                  class="outlined"
                  placeholder="200.000"
                  v-model="selectedPolicy.person.email"
                />
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
          <div class="col-lg-12 col-sm-12">
            <div class="message-bar rounded-lg">
              <p><b>Perhatian !</b></p>
              <ul>
                <li>Polis tidak dalam masa Cuti Premi Otomatis</li>
                <li>Polis tidak dalam masa Must Pay Period</li>
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
              Simpan
            </button>
          </div>
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
    <NuxtChild />
  </div>
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
        {
          type: 2,
          objectName: "insureds",
          name: "Tertanggung",
        },
      ],
      selectedIdentityType: null,
    };
  },
  computed: {
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    myPolicy(){
      return this.$store.getters["submission_transaction/getMyPolicy"];
    }
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
      this.isLoading = false;
    },
    switchType: async function (type) {
      return new Promise((res, rej) => {
        this.selectedIdentityType = this.identityType.find((v,i) => v.type == type);
        switch (this.selectedIdentityType.type) {
          case 1:
            this.selectedPolicy = this.myPolicy.policyWithCode.policyHolder;
            break;
          case 2:
            this.selectedPolicy = this.myPolicy.policyWithCode.insureds[0];
            break;
          default:
            break;
        }
        this.selectedPolicy.proposalNumber = this.myPolicy.policyWithCode.proposalNumber;
        this.selectedPolicy.identityType = this.selectedIdentityType;
        res("Done")
      })
    },
    save: async function () {
      // patch to action
      this.$store.dispatch("submission_transaction/saveCustomerinfo", this.selectedPolicy).then((res) => {
        this.$router.push({ path: "./customer-info/resume" });
        // console.log(this.selectedPolicy);
      });
    },
    addSelfieKtpImage: function (e) {
      this.$store.dispatch(
        "submission_transaction/uploadSelieKtpFile",{
          file: e.target.files[0]
        }
      );
    },
  },
};
</script>
