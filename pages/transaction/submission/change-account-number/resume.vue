<template>
  <div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Pemegang Polis</p>
        <p class="data-value">JHON DOE</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nomor Polis</p>
        <p class="data-value">BLPM20113145</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-sm-12">
        <div class="main-v-card">
          <h3>Data Saat Ini</h3>
          <br />
          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <p class="data-title mb-1">Nomor Rekening Saat Ini</p>
              <p class="data-value">123123123</p>
            </div>
            <div class="col-lg-6 col-sm-12">
              <p class="data-title mb-1">Nama Pemilik Rekening Saat Ini</p>
              <p class="data-value">JOHN DOE</p>
            </div>
            <div class="col-lg-6 col-sm-12">
              <p class="data-title mb-1">Bank Saat Ini</p>
              <p class="data-value">BNI</p>
            </div>
            <div class="col-lg-6 col-sm-12">
              <p class="data-title mb-1">Cabang Bank Saat Ini</p>
              <p class="data-value">JAKARTA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-0">
      <div class="col-lg-8 col-sm-12">
        <div class="main-v-card">
          <h3>Data Baru</h3>
          <br />
          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <p class="data-title mb-1">Nomor Rekening Baru</p>
              <p class="data-value">123123123</p>
            </div>
            <div class="col-lg-6 col-sm-12">
              <p class="data-title mb-1">Nama Pemilik Rekening</p>
              <p class="data-value">JANE DOE</p>
            </div>
            <div class="col-lg-6 col-sm-12">
              <p class="data-title mb-1">Bank</p>
              <p class="data-value">BNI</p>
            </div>
            <div class="col-lg-6 col-sm-12">
              <p class="data-title mb-1">Cabang</p>
              <p class="data-value">JAKARTA</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-divider class="d-lg-none"></v-divider>
    <br>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">KTP Pemegang Polis</p>
        <button class="btn btn-primary-outlined" @click.prevent="add()">
          Lihat KTP
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Halaman Depan Buku Tabungan Yang Baru</p>
        <button class="btn btn-primary-outlined" @click.prevent="add()">
          Lihat Dokumen
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <v-radio-group v-model="radioGroup" row>
          <v-radio
            color="#F15921"
            label="Kartu Keluarga (Pemegang polis)"
            value="radio-1"
          ></v-radio>
        </v-radio-group>
        <button class="btn btn-primary-outlined" @click.prevent="add()">
          Lihat Kartu Keluarga
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Foto Selfie dan KTP</p>
        <button class="btn btn-primary-outlined" @click.prevent="add()">
          Lihat Foto Selfie + KTP
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-sm-12">
        <div class="message-bar rounded-lg">
          <p><b>Perhatian !</b></p>
          <ul>
            <li>
              Pastikan nomor rekening yang tercantum sudah sesuai, jika tidak
              silahkan hubungi Customer Care 1-500-045
            </li>
            <li>Terdapat Biaya Penarikan Dana Investasi</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button
          class="btn btn-primary btn-save float-right"
          @click.prevent="submit()"
        >
          Submit
        </button>
      </div>
    </div>
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
  name: "add-investment-fund-resume",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    console.log($nuxt.$route.name);
  },
  data() {
    return {
      ex4: [],
      radioGroup: "radio-1",
      items: ["321321321 - BNI", "321321322 - BNI"],
      data_investments: [
        {
          id: 1,
          fund_name: "DANA MAKSIMA",
          topup_value: 1000000,
        },
        {
          id: 2,
          fund_name: "DANA CEMERLANG",
          topup_value: 2000000,
        },
        {
          id: "",
          fund_name: "Total",
          topup_value: 3000000,
        },
      ],
      modal: {
        message: "",
        show: false,
        button: {
          text: "Ok",
          redirect_link: "./thankyou",
          redirect_type: "spa",
        },
      },
    };
  },
  methods: {
    submit: async function () {
      this.modal.show = true;
      this.modal.message =
        "Jika No Rekening Manfaat kosong (Payee Refund Account) maka Transaksi ditolak oleh LP dan di arahkan ke Perubahan Rekening Manfaat (Change Payee Refund Account)";
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-save {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 150px;
  justify-content: center;
}
</style>
