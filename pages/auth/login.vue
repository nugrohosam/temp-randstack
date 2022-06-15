<template>
  <div class="row" style="height: 100%; align-items: center; height: 100vh">
    <div class="col-md-12 col-xs-8">
      <div
        class="row v-card-auth-body"
        style="justify-content: center; width: 100%; max-width: 1020px"
      >
        <div class="col-md-6 auth-section-logo d-none d-md-block">
          <div class="bni_logo">
            <img src="~/assets/icon/main_bni_life.svg" alt="logo" />
          </div>

          <div class="logo-container">
            <img
              style="width: 180px"
              src="~/assets/svg/epos_individual.svg"
              alt=""
            />
            <p>Layanan Kepemilikan Polis Individual</p>
          </div>
        </div>
        <div class="col-md-6 col-xs-12 auth-section-form">
          <!-- <div class="row">
              <div class="col-12"> -->
          <p class="auth-title-form">Login</p>
          <!-- </div>
            </div> -->
          <form action="">
            <div class="form-input auth">
              <label>Nomor Polis</label>
              <input type="text" class="w-100" v-model="form.polis_number" />
            </div>
            <div class="form-input auth">
              <label>Nomor HP</label>
              <input type="text" class="w-100" v-model="form.phonenumber"/>
            </div>
            <div class="form-input auth" style="margin-bottom: 66px">
              <label>Nomor Identitas</label>
              <input type="text" class="w-100"  v-model="form.identity_number"/>
            </div>

            <vue-recaptcha
              sitekey="6LeSQkYgAAAAAFmQ1KO1ADvIqvuXZVHGKmSw71u7"
              @verify="verifyMethod"
              @error="errorMethod"
              class="g-recaptcha"
            ></vue-recaptcha>

            <button
              class="btn btn-primary w-100 mt-12"
              :disabled="signInDisable"
              @click.prevent="signIn"
            >
              Sign In
            </button>
            <div id="auth_help">
              <a href="" class=""> Help </a>
            </div>

            <!-- <p>{{user}}</p> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  auth: false,
  name: "AuthLoginPage",
  layout: "auth",
  // components: { VueRecaptcha },
  computed: {
    // ...mapGetters({
    //   auth: "auth/getAuth",
    // }),
  },
  watch: {
    form: {
      handler(val){
        if(val.polis_number != "" && val.phonenumber != "" && val.identity_number != "" && val.verified == true){
          this.signInDisable = false;
        }else{
          this.signInDisable = true;
        }
      },
      deep: true,
    }
    // auth: function () {
    //   if (this.auth) {
    //     this.$router.push({
    //       path: "/auth/otp",
    //     });
    //   }
    // },
  },
  auth(context) {
    return "auth";
  },
  data() {
    return {
      signInDisable: true,
      form: {
        polis_number: "",
        phonenumber: "",
        identity_number: "",
        verified: ""
      }
    };
  },
  methods: {
    // ...mapActions("auth", ["signIn"]),
    signIn: async function () {
      this.$router.push({
        path: "/auth/otp",
      });
      // try {
      //   let response = await this.$auth.loginWith('local', { data: {
      //     username: 'cuk',
      //     password: 'coba'
      //   }}).then(() => this.$toast.success('Logged In!'))
      //   console.log(response);
      //   console.log(this.$auth.loggedIn)
      // } catch (err) {
      //   console.log(err);
      //   this.error = err.response.data.message;
      // }
    },
    verifyMethod: function (response) {
      if(response){
        this.form.verified = true;
      }
    },
    errorMethod: function (response) {
      console.log(response);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .g-recaptcha {
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
  // transform: scaleX(2);
  // -webkit-transform: scalex(2);
  // transform-origin: 0 0;
  // -webkit-transform-origin: 0 0;
}
.logo-container {
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    margin-bottom: 24px;
  }
}
</style>
