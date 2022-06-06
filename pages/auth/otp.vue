<template>
  <v-row justify="center" align="center">
    <div class="col-md-8 col-xs-8">
      <div class="v-card-auth-body">
        <div class="row">
          <div class="col-lg-12 auth-section-otp">
            <h2>Masukkan kode OTP untuk verifikasi akun anda</h2>
            <p id="otp_sent_to">Kode OTP telah dikirimkan ke nomor +62 812 2233 3444</p>
            <v-otp-input v-model="otp" length="6" type="number"></v-otp-input>
            <button
              id="verify"
              class="btn btn-primary sketch bc-blue"
              @click="verify"
              :disabled="submitDisable"
            >
              Verifikasi Akun
            </button>
            <div id="resend">
              <a @click.prevent="resend">Resend OTP (23 detik)</a>
            </div>

            <small class="sketch">Time Limit 5:00</small>
          </div>
        </div>
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "AuthOtpPage",
  layout: "auth",
  // components: { VueRecaptcha },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
    }),
  },
  watch: {
    user: function () {
      console.log(this.user);
    },
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
        alert("Benar");
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
    max-width: 480px!important;
    margin: auto!important;
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
