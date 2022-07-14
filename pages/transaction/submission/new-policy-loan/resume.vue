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
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Nomor Rekening Manfaat</p>
        <p class="data-value">123829319293</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Pemegang Rekening Manfaat</p>
        <p class="data-value">JHON DOE</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Bank</p>
        <p class="data-value">BNI</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Informasi Pinjaman Polis</p>
        <p class="data-value">Rp 12.000.000</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Batas Pinjaman Polis</p>
        <p class="data-value">Rp 12.000.000</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Pinjaman</p>
        <div class="form-input">
          <input type="text" class="outlined" placeholder="200.000" disabled/>
        </div>
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
    <ModalMessage
      :message="modal.message"
      :show="modal.show"
      :button="modal.button"
      @closeModal="modal.show = false"
    />
  </div>
</template>
<script>
export default {
  name: "investment-fund-allocation-change-resume",
  components: {

  },
  data() {
    return {
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
