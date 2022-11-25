<template>
  <div class="md:flex md:justify-center md:items-center lg:h-screen m-4 lg:m-0">
    <div
      class="p-6 md:py-6 md:px-32 rounded-lg"
      style="background: rgba(255, 255, 255, 0.6)"
    >
      <div class="text-center">
        <img
          src="~/assets/svg/bpos_digital.svg"
          alt="bpos"
          class="w-20 md:w-32 mx-auto mb-8"
        />
        <h2 class="text-2xl">Masukkan kode OTP untuk verifikasi akun anda</h2>
        <p id="otp_sent_to">
          Kode OTP telah dikirimkan ke nomor
          {{ this.$route.query.phonenumber }}
          <br />
          Akan berakhir dalam {{ Math.floor(otp_expired_time / 60) }} :
          {{
            otp_expired_time % 60 < 10
              ? "0" + (otp_expired_time % 60)
              : otp_expired_time % 60
          }}
        </p>
        <v-otp-input
          v-model="form.otp_number"
          length="6"
          type="number"
        ></v-otp-input>
        <button
          id="verify"
          class="btn btn-primary"
          @click="verify"
          :disabled="submitDisable"
        >
          Verifikasi Akun
        </button>
        <div id="resend" class="text-xs md:text-sm underline">
          <template v-if="otp_timer > 0">
            <a @click.prevent="resend" class="disabled">
              {{ is_mobile ? resend_text_mobile : resend_text }} ({{
                otp_timer
              }}
              detik)
            </a>
          </template>
          <template v-else>
            <a @click.prevent="resend" class="">
              {{ is_mobile ? resend_text_mobile : resend_text }}
            </a>
          </template>
        </div>
      </div>
    </div>

    <!-- Modal Message -->
    <ModalMessage
      :message="modal.message"
      :show="modal.show"
      :button="modal.button"
      @closeModal="modal.show = false"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { MOBILE_BREAKPOINT, DESKTOP_BREAKPOINT } from "../../constants";

export default {
  name: "AuthOtpPage",
  layout: "auth",
  auth: false,
  // components: { VueRecaptcha },
  computed: {
    ...mapGetters({
      auth: "auth/getAuthIsAuth",
    }),
  },
  watch: {
    auth(isAuth) {
      if (isAuth) {
        window.location.href = "/transaction/submission";
        // this.$router.push({
        //   path: "/transaction/submission",
        // });
      }
    },
    otp_timer: function (value) {
      if (value <= 0) {
        this.otp_timer = 0;
        this.resend_active = true;
        clearInterval(this.otp_counter);
      }
    },
    otp_expired_time: function (value) {
      if (value <= 0) {
        this.otp_expired_time = 0;
        clearInterval(this.otp_counter_expired_time);
      }
    },
    form: {
      handler(value) {
        if (value.otp_number.length == 6) {
          this.submitDisable = false;
        } else {
          this.submitDisable = true;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.counter();
    if (window.screen.width < MOBILE_BREAKPOINT) {
      this.is_mobile = true;
    }

    this.otp_expired_time = 300; //seconds
    this.otp_counter_expired_time = setInterval(() => {
      this.otp_expired_time -= 1;
    }, 1000);
  },
  auth(context) {
    return "auth";
  },
  data() {
    return {
      is_mobile: false,
      form: {
        otp_number: "",
        identity: this.$store.getters["auth/getAuthPhoneNumber"],
      },
      modal: {
        message: "",
        show: false,
        button: {
          redirect_link: "/auth/login",
          text: "Kembali ke Halaman Login",
        },
      },
      submitDisable: true,
      otp_timer: "", //seconds
      otp_expired_time: 300, //seconds
      otp_counter: null,
      otp_counter_expired_time: null,
      otp_remaining: 5,
      otp_resend_remaining: 5,
      resend_active: false,
      resend_text: "Belum menerima OTP? Kirim Ulang OTP ",
      resend_text_mobile: "Resend OTP ",
    };
  },
  methods: {
    verify: async function () {
      const response = await this.$store.dispatch("auth/otpSubmit", this.form);
      if (typeof response.data != "undefined" && !response.data.success) {
        this.otp_remaining -= 1;
        if (this.otp_remaining <= 0) {
          this.modal.message =
            "Anda melakukan kesalahan pengisian OTP sebanyak 5 kali. Silahkan melakukan login kembali setelah 5 menit.";
          this.modal.show = true;
        }
      }
    },

    resend: async function () {
      if (this.otp_timer <= 0) {
        this.otp_resend_remaining -= 1;
        if (this.otp_resend_remaining <= 0) {
          this.modal.message =
            "Anda telah melakukan permintaan ulang OTP sebanyak 5 kali. Silahkan melakukan login kembali setelah 5 menit.";
          this.modal.show = true;
        } else {
          await this.$store.dispatch("auth/otpReset");
          this.counter();
        }
      }
    },

    counter() {
      this.otp_timer = 30; //seconds
      this.otp_counter = setInterval(() => {
        this.otp_timer -= 1;
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .v-otp-input {
  max-width: 560px !important;
  margin: auto !important;
}

::v-deep .v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: auto;
}

::v-deep .v-input__control .v-input__slot {
  height: 80px;
  width: 80px;
  @media screen and (max-width: 720px) {
    height: unset;
    width: unset;
  }
}

h2 {
  margin-bottom: 36px;
}

#otp_sent_to {
  margin-bottom: 42px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

#verify {
  margin-top: 20px;
  margin-bottom: 30px;
}

#resend {
  margin-bottom: 20px;
}
</style>
