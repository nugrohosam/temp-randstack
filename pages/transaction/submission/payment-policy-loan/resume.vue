<template>
  <div>
    <BackButton />
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
        <p class="data-title">Informasi VA</p>
        <p class="data-value">123829319293</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Hutang Pinjaman Polis</p>
        <div class="form-input">
          <input type="text" class="outlined" placeholder="200.000" disabled />
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tanggal Pinjaman Polis</p>
        <p class="data-value">09/09/2045</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Lihat Foto Selfie dengan KTP</p>
        <button class="btn btn-primary-outlined">
          Lihat Foto Selfie dengan KTP
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="ex4"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya menyetujui transaksi dan kebenaran data yang disampaikan.
          <a class="bni-primary no-border" href="">Baca selengkapnya</a>
        </p>
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
            <li>Pinjaman Polis akan dikenakan biaya bunga</li>
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
    <v-dialog persistent v-model="modal.show" class="general-modal">
      <div class="modal-v-card">
        <img
          src="~/assets/icon/ic_warning_modal.svg"
          class="modal-icon"
          alt=""
        />
        <div class="modal-text">
          {{ modal.message }}
          <br /><br /><br />
           <p class="data-title mb-2">Nomor Virtual Account | BNI</p>
              <p class="data-value">31232132132</p>
              <p class="data-title mb-2">Nominal Pembayaran</p>
              <p class="data-value">10.000.000</p>
        </div>
        <button
          class="btn btn-primary px-10"
          @click="$router.push({ path: modal.button.redirect_link })"
        >
          Ok
        </button>
      </div>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "investment-fund-allocation-change-resume",
  components: {},

  mounted() {
    console.log($nuxt.$route.name);
  },
  data() {
    return {
      ex4: "",
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
        "Mohon melakukan pembayaran sesuai nominal dan di hari yang sama";
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
