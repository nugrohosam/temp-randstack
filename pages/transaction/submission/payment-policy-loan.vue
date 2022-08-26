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
          <p class="data-title">Informasi VA</p>
          <p class="data-value">123829319293</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Hutang Pinjaman Polis</p>
          <div class="form-input">
            <input
              type="text"
              class="outlined"
              placeholder="200.000"
              disabled
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Pinjaman Polis</p>
          <p class="data-value">09/09/2045</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Nama Bank</p>
          <v-select :items="banks" dense outlined></v-select>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
          <button class="btn btn-primary-outlined">
            Unggah Foto Selfie dengan KTP
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar rounded-lg">
            <p><b>Perhatian !</b></p>
            <ul>
              <li>Pembayaran dilakukan di hari yang sama</li>
              <li>
                Pembayaran bisa dilakukan melalui pemindahbukuan/transfer dari
                Bank mana saja atau melalui ATM bersama, dengan mengisikan nomor
                rekening tujuan Virtual Account tersebut
              </li>
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
export default {
  name: "payment-policy-loan",
  beforeMount() {
    this.modal.show = true;
    this.modal.message =
      "Menu yang anda pilih masih dalam tahap pengembangan"
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
      banks: ["BNI"],
    };
  },
  mounted() {
    console.log($nuxt.$route.name);
    console.log(this.showMe);
    if ($nuxt.$route.name != "transaction-submission-payment-policy-loan") {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-payment-policy-loan") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }

    },
  },

  methods: {
    save: async function () {
      // patch to action
      this.$router.push({ path: "./payment-policy-loan/resume" });
    },
  },
};
</script>
