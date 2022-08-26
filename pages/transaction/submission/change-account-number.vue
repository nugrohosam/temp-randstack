<template>
  <div>
    <!-- <div v-show="showMe">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">JHON DOE</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Polis</p>
          <p class="data-value">BLPM20113145</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Rekening Saat Ini</p>
          <p class="data-value">BLPM20113145</p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Pemilik Nomor Rekening Manfaat Saat ini</p>
          <p class="data-value">JOHN DOE</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank Saat Ini</p>
          <p class="data-value">BNI</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Cabang Bank Saat Ini</p>
          <p class="data-value">JAKARTA</p>
        </div>
      </div>
      <br />
      <v-divider></v-divider>
      <br />
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Nomor Rekening Manfaat Baru</p>
          <div class="form-input">
            <input type="text" class="outlined" placeholder="200.000" />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Bank</p>
          <v-select
            :items="investment_types"
            dense
            outlined
            class="investment_type_option"
          ></v-select>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Nama Pemilik Rekening Manfaat</p>
          <div class="form-input">
            <input type="text" class="outlined" placeholder="200.000" />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Cabang</p>
          <div class="form-input">
            <input type="text" class="outlined" placeholder="200.000" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <div class="message-bar d-flex">
            <info-icon class="ic-primary mr-2"></info-icon>
            <b>Pemilik rekening baru harus pihak yang terdaftar dalam polis.</b>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">KTP Pemegang Polis</p>
          <button class="btn btn-primary-outlined" @click.prevent="add()">
            Unggah KTP
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Halaman Depan Buku Tabungan Yang Baru</p>
          <button class="btn btn-primary-outlined" @click.prevent="add()">
            Unggah Dokumen
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <v-radio-group v-model="row" row>
            <v-radio
              color="#F15921"
              label="Kartu Keluarga (Pemegang polis)"
              value="radio-1"
            ></v-radio>
            <v-radio
              color="#F15921"
              label="Akte Kelahiran (Pemegang polis)"
              value="radio-2"
            ></v-radio>
          </v-radio-group>
          <button class="btn btn-primary-outlined" @click.prevent="add()">
            Unggah Dokumen
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Unggah Foto Selfie dan KTP</p>
          <button class="btn btn-primary-outlined" @click.prevent="add()">
            Unggah Foto Selfie dengan KTP
          </button>
        </div>
      </div>
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
    </div> -->
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
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "widthdrawal-partial-investment-fund",
  components: {
    SaveIcon,
    InfoIcon,
  },
  beforeMount() {
    this.modal.show = true;
    this.modal.message =
      "Menu yang anda pilih masih dalam tahap pengembangan"
  },
  mounted() {
    console.log($nuxt.$route.name);
    if ($nuxt.$route.name != "transaction-submission-change-account-number") {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
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
      showMe: true,
      items: ["321321321 - BNI", "321321322 - BNI"],
      investment_types: ["UANG SEKOLAH", "ASURANSI"],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      limitPages: [5, 10, 15, 20, 25],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-add-investment-fund") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
    save: async function () {
      // patch to action
      this.$router.push({
        path: "./change-account-number/resume",
      });
    },
    add: async function () {},
  },
};
</script>
<style lang="scss" scoped>
.investment_type_option {
  max-width: 250px !important;
}
.btn-add-investment {
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
