<template>
  <div>
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

    <hr class="my-4" />

    <div v-if="getChangeBeneficiary.changes == 'Penambahan / Revisi'">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Depan</p>
          <p class="data-value">
            {{ getChangeBeneficiary.addItem.person.firstName }}
          </p>  
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Belakang</p>
          <p class="data-value">
            {{ getChangeBeneficiary.addItem.person.lastName }}
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Kartu Identitas</p>
          <p class="data-value">
            {{ options.identityType[+getChangeBeneficiary.addItem.person.certiType] }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Identitas</p>
          <p class="data-value">
            {{ getChangeBeneficiary.addItem.person.certiCode }}
          </p>
        </div>
      </div>
      
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Jenis Kelamin</p>
          <p class="data-value">
            {{ getChangeBeneficiary.addItem.person.gender == "M" ? "Perempuan" : "Laki Laki" }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Lahir</p>
          <p class="data-value">
            {{ getChangeBeneficiary.addItem.person.birthday }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tempat lahir</p>
          <p class="data-value">
            {{ getChangeBeneficiary.addItem.person.birthPlace }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Status Perkawinan</p>
          <p class="data-value">
            {{ getChangeBeneficiary.addItem.person.maritalStatus }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Hubungan dengan Pemegang Polis</p>
          <p class="data-value">
            {{ getChangeBeneficiary.addItem.designation == '52' ? getChangeBeneficiary.addItem.otherDesignation : $labelRelationType(getChangeBeneficiary.addItem.designation) }}
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="col-md-12">
          <p class="data-title">Komposisi Ahli Waris</p>
        </div>
        <template>
          <v-data-table
            :headers="table.headers"
            :items="getChangeBeneficiary.changeItems"
            mobile-breakpoint="480"
            hide-default-footer
            class="elevation-1"
          >
            <template #header.data-table-select> Pilihan </template>
            <template v-slot:item.person="{ item }">
              {{
                item
                  ? $isNullWithSpace(
                      item.person.firstName
                    ) +
                    $isNullWithSpace(
                      item.person.midName
                    ) +
                    $isNullWithSpace(
                      item.person.lastName
                    )
                  : ""
              }}
            </template>
            <template v-slot:item.percentage="{ item }">
              {{
                item.percentage
              }}%
            </template>
            <template v-slot:item.birthday="{ item }">
              {{
                $formatDate(item.person.birthday)
              }}
            </template>
            <template v-slot:item.gender="{ item }">
              {{ item.person.gender == "M" ? "Laki Laki" : "Perempuan" }}
            </template>
            <template v-slot:item.relationWithPolicyHolder="{ item }">
              {{ $labelRelationType(item.designation) }}
            </template>
            <template v-slot:body.append>
              <tr>
                <td colspan="1">Total</td>
                <td colspan="5">{{ getChangeBeneficiary.changeItems.map(x => +x.percentage).reduce((a, b) => a+b, 0) }}%</td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
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
        <p class="data-title mb-2">Unggah Foto KTP</p>
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
    
    <div v-if="getChangeBeneficiary.documentAttachment.name">
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Kartu Keluarga (Opsional)</p>
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
    </div>

    <div class="row" v-if="getChangeBeneficiary.changes == 'Penambahan / Revisi'">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah KTP Ahli Waris Baru</p>
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
      <div class="col-lg-12 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted1"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Ahli Waris menyetujui transaksi dan kebenaran data yang disampaikan.
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted2"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya menyetujui transaksi dan kebenaran data yang disampaikan.
        </p>
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
            <li>- Akan ada kemungkinan perubahan Premi</li>
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
import {
  identityType,
} from "@/utils/constant";

import resumePageMixin from "@/mixins/resumePage";
import InfoPanel from "../../../../../components/InfoPanel.vue";
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  components: {
    SaveIcon,
    InfoIcon,
    InfoPanel
  },
  mixins: [resumePageMixin],
  data() {
    return {
      options: {
        identityType,
      },
      accepted1: false,
      accepted2: false,
      table: {
        headers: [
          {
            text: "Nama",
            value: "person",
          },
          {
            text: "Prosentase (%)",
            value: "percentage",
          },
          {
            text: "Tanggal Lahir",
            value: "birthday",
          },
          {
            text: "Jenis Kelamin",
            value: "gender",
          },
          {
            text: "Hubungan Dengan Pemegang Polis",
            value: "relationWithPolicyHolder",
          },
        ],
      },
      validationMessage: [],
      image_preview: {
        src: "",
        show: false,
      },
    };
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Perubahan Data Ahli Waris",
      sub: "Perubahan Data Ahli Waris",
    });
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getChangeBeneficiary() {
      return this.$store.getters[
        "submission_transaction/change_beneficiary/getChangeBeneficiary"
      ];
    },
  },
  methods: {
    findIndexItems(partyId) {
      return this.getChangeBeneficiary.changeItems.findIndex(x => x.partyId == partyId)
    },
    showKtpSelfiePreview: function () {
      if (this.getChangeBeneficiary.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeBeneficiary.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showKtpPreview: function () {
      if (this.getChangeBeneficiary.ktpAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeBeneficiary.ktpAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showBeneficiaryKtpPreview: function () {
      if (this.getChangeBeneficiary.beneficiaryKtpAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeBeneficiary.beneficiaryKtpAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showDocumentPreview: function () {
      if (this.getChangeBeneficiary.documentAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeBeneficiary.documentAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.accepted1 || !this.accepted2) {
        this.validationMessage.push(
          "Setujui transaksi untuk memproses pengajuan"
        );
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/change_beneficiary/changeBeneficiary"
        );
        if (result && result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path:
              "/transaction/submission/change/birth-and-gender/thankyou?transaction_ids=" +
              transactionIds.join(","),
          });
        }
      }
    },
  },
};
</script>