<template>
  <div>
    <BackButton />
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
          {{ $isNullWithSpace(getChangeInsured.firstName) }}
        </p>
      </div>

      <div class="col-lg-3 col-sm-6">
        <p class="data-title mb-2">Nama Belakang</p>
        <p class="data-value">
          {{
            getChangeInsured.lastName
              ? $isNullWithSpace(getChangeInsured.lastName)
              : "-"
          }}
        </p>
      </div>

      <div class="col-lg-3 col-sm-6">
        <p class="data-title mb-2">Tipe Identitas</p>
        <p class="data-value">
          {{ $labelIdentityType(+getChangeInsured.certiType) }}
        </p>
      </div>

      <div class="col-lg-3 col-sm-6">
        <p class="data-title mb-2">Nomor Identitas</p>
        <p class="data-value">
          {{ getChangeInsured.certiCode }}
        </p>
      </div>

      <div class="col-lg-3 col-sm-6">
        <p class="data-title mb-2">Tempat Lahir</p>
        <p class="data-value">
          {{ getChangeInsured.birthPlace || "-" }}
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
          {{ getChangeInsured.email || "-" }}
        </p>
      </div>
    </div>

    <div
      class="row"
      v-for="(item, index) in getChangeInsured.addresses"
      :key="index"
    >
      <div class="col-12">
        <template>
          <div class="page-body">
            <div class="row">
              <div class="col-12">
                <div class="d-flex justify-sm-space-between">
                  <p><b>Alamat</b></p>
                </div>
                <br /><br />

                <div class="row">
                  <div class="col-lg-4 col-sm-12">
                    <p class="data-title">Jenis Alamat</p>
                    <p class="data-value">
                      {{
                        options.addressType.find(
                          (x) =>
                            x.identifier ==
                            +getChangeInsured.addresses[index].addressType
                        ).label
                          ? options.addressType.find(
                              (x) =>
                                x.identifier ==
                                +getChangeInsured.addresses[index]
                                  .addressType
                            ).label
                          : "-"
                      }}
                    </p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-4 col-sm-12">
                    <p class="data-title">Provinsi</p>
                    <p class="data-value">
                      {{
                        getChangeInsured.addresses[index].province
                          ? getChangeInsured.addresses[index].province
                          : "-"
                      }}
                    </p>
                  </div>
                  <div class="col-lg-4 col-sm-12">
                    <p class="data-title">Kota</p>
                    <p class="data-value">
                      {{
                        getChangeInsured.addresses[index].city
                          ? getChangeInsured.addresses[index].city
                          : "-"
                      }}
                    </p>
                  </div>
                  <div class="col-lg-4 col-sm-12">
                    <p class="data-title">Kecamatan</p>
                    <p class="data-value">
                      {{
                        getChangeInsured.addresses[index].street
                          ? getChangeInsured.addresses[index].street
                          : "-"
                      }}
                    </p>
                  </div>
                  <div class="col-lg-4 col-sm-12">
                    <p class="data-title">Kelurahan</p>
                    <p class="data-value">
                      {{
                        getChangeInsured.addresses[index].village
                          ? getChangeInsured.addresses[index].village
                          : "-"
                      }}
                    </p>
                  </div>
                  <div class="col-lg-4 col-sm-12">
                    <p class="data-title">Alamat</p>
                    <p class="data-value">
                      {{
                        getChangeInsured.addresses[index].address1
                          ? getChangeInsured.addresses[index].address1
                          : "-"
                      }}
                    </p>
                  </div>
                  <div class="col-lg-4 col-sm-12">
                    <p class="data-title">Blok / No Jalan</p>
                    <p class="data-value">
                      {{
                        getChangeInsured.addresses[index].address2
                          ? getChangeInsured.addresses[index].address2
                          : "-"
                      }}
                    </p>
                  </div>
                  <div class="col-lg-4 col-sm-12">
                    <p class="data-title">RT/RW</p>
                    <p class="data-value">
                      {{
                        getChangeInsured.addresses[index].address3
                          ? getChangeInsured.addresses[index].address3
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
        <p class="data-title mb-2">Unggah Foto KTP Pemegang Polis</p>
        <div class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showKtpPreview"
          >
            Lihat
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP Tertanggung</p>
        <div class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showKtpSelfiePreview"
          >
            Lihat
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto KTP Tertanggung</p>
        <div class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showBeneficiaryKtpPreview"
          >
            Lihat
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Akta/Ijazah</p>
        <div class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showDocumentPreview"
          >
            Lihat
          </button>
        </div>
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
        <p>Saya menyetujui transaksi dan kebenaran data yang disampaikan.</p>
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
              - Pengajuan ini hanya bersifat merevisi tidak mengganti untuk
              informasi lebih lanjut, dapat menghubungi Customer Care 1-500-045
              atau e-mail ke care@bni-life.co.id atau Service point atau Kantor
              Layanan BNI Life.
            </li>
            <li>
              - Untuk perubahan data pembayaran (Auto debit Tabungan, Kartu
              kredit, ataupun VA) dapat menggunakan perubahan metode pembayaran.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <ValidationMessage :validation-message="validationMessage" />

    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary btn-save float-right" @click="submit">
          <save-icon></save-icon> Submit
        </button>
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
import { addressType } from "@/utils/constant";
import resumePageMixin from "@/mixins/resumePage";
import InfoPanel from "../../../../../components/InfoPanel.vue";
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  components: {
    SaveIcon,
    InfoIcon,
    InfoPanel,
  },
  mixins: [resumePageMixin],
  data() {
    return {
      options: {
        addressType,
      },
      accepted: false,
      validationMessage: [],
      image_preview: {
        src: "",
        show: false,
      },
    };
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Perubahan Data Tertanggung",
      sub: "Pengajuan Perubahan Data Tertanggung",
    });
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getChangeInsured() {
      return this.$store.getters[
        "submission_transaction/change_insured/getChangeInsured"
      ];
    },
  },
  methods: {
    showKtpSelfiePreview: function () {
      if (this.getChangeInsured.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeInsured.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },

    showKtpPreview: function () {
      if (this.getChangeInsured.ktpAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeInsured.ktpAttachment.file
        );
        this.image_preview.show = true;
      }
    },

    showBeneficiaryKtpPreview: function () {
      if (this.getChangeInsured.beneficiaryKtpAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeInsured.beneficiaryKtpAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    
    showDocumentPreview: function () {
      if (this.getChangeInsured.documentAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeInsured.documentAttachment.file
        );
        this.image_preview.show = true;
      }
    },

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
          "submission_transaction/change_insured/changeInsured"
        );
        if (result && result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path:
              "/transaction/submission/change/insured/thankyou?transaction_ids=" +
              transactionIds.join(","),
          });
        }
      }
    },
  },
};
</script>