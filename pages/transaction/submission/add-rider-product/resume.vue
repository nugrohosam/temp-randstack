<template>
  <div>
    <BackButton />
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

    <br>
    <v-divider></v-divider>
    <br>

    <div v-for="(rider, index) in getAddRider.add_riders" :key="index">

      <HealthDeclarationFormModal
        :show="getAddRider.add_riders[index].show_modal_health"
        :default-value="getAddRider.add_riders[index].health_questionnaire"
        @submit="getAddRider.add_riders[index].health_questionnaire = $event"
        @close="getAddRider.add_riders[index].show_modal_health = false"
      />

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Rider {{ index + 1 }} yang Dipilih</p>
          <p class="data-value">
            {{ getRiderName(getAddRider.add_riders[index].product_id) }}
          </p>
        </div>

        <div class="col-lg-4 col-sm-6" v-if="getAddRider.add_riders[index].sum_assured == null">
          <p class="data-title mb-2">Rider Plan</p>
          <div>
            {{ getAddRider.add_riders[index].plan }}
          </div>
        </div>
        <div class="col-lg-4 col-sm-6" v-else>
          <p class="data-title mb-2">Uang Pertanggungan</p>
          <div>
            {{ getAddRider.add_riders[index].sum_assured }}
          </div>
        </div>
      </div>

      <div class="row" v-if="!getAddRider.add_riders[index].insured">
        <div class="col-12">
          <p class="data-title mb-2">Pilihan Tertanggung untuk Rider Baru</p>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nama Tertanggung Yang Dipilih</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in getAddRider.add_riders[index].party_ids" :key="i">
                  <td>
                    {{ getPersonName(item) }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
      
      <div v-if="getAddRider.add_riders[index].insured">
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Tertanggung Tamabahan</p>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nama Depan</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.first_name : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nama Belakang</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.last_name : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Kartu Identitas</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.identity_type : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nomor Identitas</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.identity : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Hubungan dengan Pemegang Polis</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.relation : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Jenis Kelamin</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.gender : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Tanggal Lahir</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.birth_date : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Tempat lahir</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.birth_place : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Kewarganegaraan</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.nationality : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Status Perkawinan</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.marital_status : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Tinggi Badan (cm)</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.height : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Berat Badan (kg)</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured ? getAddRider.add_riders[index].insured.weight : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Apakah Merokok</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured != null ? (getAddRider.add_riders[index].insured.is_somker ? "Ya" : "Tidak") : "Tidak"}}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Profesi</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured != null ? getAddRider.add_riders[index].insured.occupation : "" }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nomor Hp</p>
            <p class="data-value">
              {{ getAddRider.add_riders[index].insured != null ? getAddRider.add_riders[index].insured.phone_number : "" }}
            </p>
          </div>
        </div>
      </div>

      <div class="row" v-if="getAddRider.add_riders[index].health_questionnaire.length > 0">
        <div class="col-12">
          <p class="data-title mb-2">Isi Formulir Kesehatan</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="getAddRider.add_riders[index].show_modal_health = !getAddRider.add_riders[index].show_modal_health"
          >
            Lihat
          </button>
        </div>
      </div>

      <div class="row" v-if="getAddRider.add_riders[index].insured && getAddRider.add_riders[index].kk_attachment != null">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Unggah KK</p>
          <p class="data-value">
            <button
              class="btn btn-primary-outlined"
              @click.prevent="showKkPreview(index)"
            >
              Lihat
            </button>
          </p>
        </div>
      </div>

      <br>
      <v-divider></v-divider>
      <br>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showKtpSelfiePreview"
          >
            Lihat
          </button>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Ilustrasi</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showIlustrationPreview"
          >
            Lihat
          </button>
        </p>
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
        <button class="btn btn-primary btn-save float-right" @click="submit">
          <save-icon></save-icon> Simpan
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
  relationType,
  gender,
  identityType,
  nationality,
  martialStatus,
} from "@/utils/constant";
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  name: "add-rider-product-resume",
  components: {
    SaveIcon,
    InfoIcon,
  },
  data() {
    return {
      accepted: null,
      validationMessage: [],
      options: {
        relationType,
        gender,
        identityType,
        nationality,
        martialStatus,
      },
      image_preview: {
        src: "",
        show: false,
      },
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getAddRider() {
      return this.$store.getters[
        "submission_transaction/rider_product/getAddRider"
      ];
    },
    allowedRiders() {
      return this.$store.getters["submission_transaction/getProductRiders"];
    },
    riderOptions() {
      const listRider = this.allowedRiders
      return listRider.map(v => 
        ({
          value: v.productId,
          text: v?.productName || '-',
        })
      )
    },
  },
  methods: {
    getRiderName: function (productId) {
      return this.riderOptions.find(x => x.value == productId)?.text || ""
    },
    getPersonName: function (partyId) {
      const person = this.myPolicy.policyWithCode.insureds.find(x => x.partyId == partyId)?.person || null;

      if (!person) return "";
      return this.$isNullWithSpace(person?.firstName || '') +
                        this.$isNullWithSpace(person?.midName || '') +
                        this.$isNullWithSpace(person?.lastName || '')
    },
    showKtpSelfiePreview: function () {
      if (this.getAddRider.ktp_selfie_attachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getAddRider.ktp_selfie_attachment.file
        );
        this.image_preview.show = true;
      }
    },
    showIlustrationPreview: function () {
      if (this.getAddRider.ilustration_attachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getAddRider.ilustration_attachment.file
        );
        this.image_preview.show = true;
      }
    },
    showKkPreview: function (index) {
      if (this.getAddRider.add_riders[index].kk_attachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getAddRider.add_riders[index].kk_attachment.file
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
    submit: async function () {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/rider_product/addRider"
        );
        if (result && result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path: "./thankyou?transaction_ids=" + transactionIds.join(","),
          });
        }
      }
    },
  },
};
</script>
