<template>
 <div class="row" style="height: 100%; align-items: center; height: 100vh">
    <div class="col-md-12 col-xs-8">
      <div
        class="row v-card-auth-body"
        style="justify-content: center; width: 100%; max-width: 1020px"
      >
          <div class="col-lg-12 auth-section-otp">
            <h2>Masukkan kode OTP untuk verifikasi akun anda</h2>
            <p id="otp_sent_to">Kode OTP telah dikirimkan ke nomor +62 812 2233 3444</p>
            <v-otp-input v-model="otp" length="6" type="number"></v-otp-input>
            <button
              id="verify"
              class="btn btn-primary"
              @click="verify"
              :disabled="submitDisable"
            >
              Verifikasi Akun
            </button>
            <div id="resend">
              <a @click.prevent="resend">Belum menerima OTP? Kirim Ulang OTP (23 detik)</a>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "AuthOtpPage",
  layout: "auth",
  auth: false,
  // components: { VueRecaptcha },
  computed: {
    ...mapGetters({
      // auth: "auth/getAuth",
    }),
  },
  watch: {
    // auth: function () {
    //   console.log(this.auth);
    // },
    otp: function(){
      this.otp.length >= 6 ? this.submitDisable = false : this.submitDisable = true;
    }
  },
  auth(context) {
    return "auth";
  },
  data() {
    return {
      submitDisable: true,
      otp: ""
    };
  },
  methods: {
    verify(){
      // do verify to backend
      let otp_expected = "123456";
      if(this.otp != otp_expected){
        alert("Salah!");
      }else{
        this.$router.push({
          path: '/transaction/submission'
        })
      }
    },
    resend(){
      // do request otp again
      alert("resend");
    }
  },
};
</script>
<style lang="scss" scoped>

::v-deep .v-otp-input {
    max-width: 560px!important;
    margin: auto!important;
}

::v-deep .v-input__control .v-input__slot{
  height: 80px;
  width: 80px;
  @media screen and (max-width: 720px){
    height: unset;
    width: unset;
  }
}

h2{
  margin-bottom: 36px;
}

#otp_sent_to{

  margin-bottom: 42px;
}

#verify{
  margin-top: 20px;
  margin-bottom: 30px;
}

#resend{
  margin-bottom: 20px;
}

</style>
