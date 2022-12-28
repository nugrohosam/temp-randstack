<template>
  <div>
    <BackButton />
    <div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">
            {{
              customerInformation.selectedPolicy.person.firstName
                ? customerInformation.selectedPolicy.person.firstName
                : "" + " " + customerInformation.selectedPolicy.person.midName
                ? customerInformation.selectedPolicy.person.midName
                : "" + " " + customerInformation.selectedPolicy.person.lastName
                ? customerInformation.selectedPolicy.person.lastName
                : ""
            }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Polis</p>
          <p class="data-value">
            {{ customerInformation.selectedPolicy.proposalNumber }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Alamat yang diubah</p>
          <p class="data-value">
            {{ customerInformation.selectedPolicy.addressType.name }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Email Address</p>
          <div class="d-flex justify-sm-space-between">
            <p class="data-value">
              {{
                customerInformation.selectedPolicy.person.email
                  ? customerInformation.selectedPolicy.person.email
                  : "-"
              }}
            </p>
          </div>
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
                  </div>
                  <br /><br />

                  <div class="row">
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Provinsi</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.address.province
                            ? customerInformation.selectedPolicy.address
                                .province
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Kota</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.address.city
                            ? customerInformation.selectedPolicy.address.city
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Kecamatan</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.address.street
                            ? customerInformation.selectedPolicy.address.street
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Kelurahan</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.address.village
                            ? customerInformation.selectedPolicy.address.village
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Alamat</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.address.address1
                            ? customerInformation.selectedPolicy.address
                                .address1
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Blok</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.address.address2
                            ? customerInformation.selectedPolicy.address
                                .address2
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Blok / No Jalan</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.address.address2
                            ? customerInformation.selectedPolicy.address
                                .address2
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">RT/RW</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.address.address3
                            ? customerInformation.selectedPolicy.address
                                .address3
                            : "-"
                        }}
                      </p>
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
              <!-- Transaction Status Menu -->
              <div class="row">
                <div class="col-12">
                  <div class="d-flex justify-sm-space-between">
                    <p><b>Nomor Telepon</b></p>
                  </div>
                  <br /><br />
                  <div class="row">
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Nomor Telepon Saat Ini 1</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.person.mobile
                            ? customerInformation.selectedPolicy.person.mobile
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Nomor Telepon Saat Ini 2</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.person.mobile2
                            ? customerInformation.selectedPolicy.person.mobile2
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Normor Telepon Kantor Saat Ini</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.person.officeTel
                            ? customerInformation.selectedPolicy.person
                                .officeTel
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">
                        Normor Telepon Lain Kantor Saat Ini
                      </p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.person.officeTel2
                            ? customerInformation.selectedPolicy.person
                                .officeTel2
                            : "-"
                        }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Nomor Telepon Rumah Saat Ini</p>
                      <p class="data-value">
                        {{
                          customerInformation.selectedPolicy.person.homeTel
                            ? customerInformation.selectedPolicy.person.homeTel
                            : "-"
                        }}
                      </p>
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
          <p class="data-title mb-2">Lihat Foto Selfie dengan KTP</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showSelfieKtpPreview"
          >
            Lihat Foto
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12 d-flex">
          <v-checkbox
            v-model="accepted"
            color="orange darken-3"
            value="orange darken-3"
            hide-details
          ></v-checkbox>
          <p>
            Saya menyetujui transaksi dan kebenaran data yang disampaikan.
            
          </p>
        </div>
      </div>

      <ValidationMessage :validation-message="validationMessage" />

      <div class="row">
        <div class="col-12">
          <button
            class="btn btn-primary btn-save float-right"
            @click.prevent="submit()"
          >
          <save-icon></save-icon> Submit
          </button>
        </div>
      </div>
    </div>
    <ModalImagePreview
      :src="image_preview.src"
      :show="image_preview.show"
      @closeImagePreview="image_preview.show = false"
    />
  </div>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
import resumePageMixin from "@/mixins/resumePage";

export default {
  name: "investment-fund-allocation-change",
  mixins: [resumePageMixin],
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    if ($nuxt.$route.name != "transaction-submission-change-payer") {
      this.showMe = false;
    } else {
      this.showMe = true;
    }
  },
  data() {
    return {
      accepted: false,
      validationMessage: [],
      image_preview: {
        src: "",
        show: false,
      },
    };
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
  computed: {
    customerInformation() {
      return this.$store.getters[
        "submission_transaction/getCustomerInfoChanged"
      ];
    },
    selfieKtpFile() {
      return this.$store.getters["submission_transaction/getSelfieKtpFile"];
    },
  },
  methods: {
    validate: async function () {
      this.validationMessage = [];
      if (!this.accepted) {
        this.validationMessage.push(
          "Setujui transaksi untuk memproses pengajuan"
        );
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/updateCustomerInformation"
        );
        if (result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path: "./thankyou?transaction_ids=" + transactionIds.join(","),
          });
        } else {
          // check validation error
        }
      }
    },
    showSelfieKtpPreview: function () {
      if (this.selfieKtpFile) {
        this.image_preview.src = URL.createObjectURL(this.selfieKtpFile);
        this.image_preview.show = true;
      }
    },
  },
};
</script>
