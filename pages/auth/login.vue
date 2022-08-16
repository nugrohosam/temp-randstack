<template>
  <div class="row main">
    <div class="col-12 d-md-none bni_logo">
      <img src="~/assets/icon/main_bni_life.svg" alt="logo" />
    </div>
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
              src="~/assets/svg/ipos_digital.svg"
              alt=""
            />
            <p>Layanan Kepemilikan Polis Individual</p>
          </div>
        </div>
        <div class="col-md-6 col-xs-12 auth-section-form">
          <!-- <div class="row">
              <div class="col-12"> -->
          <h2 class="d-md-none mobile-logo">ePos</h2>
          <p class="auth-title-form">Login</p>
          <!-- </div>
            </div> -->
          <form action="">
            <div class="form-input auth">
              <label>Nomor Polis</label>
              <input
                type="text"
                class="w-100"
                v-model="form.policy_number"
                placeholder="9210000627"
              />
            </div>
            <div class="form-input auth">
              <label>Nomor HP</label>
              <input
                type="text"
                class="w-100"
                v-model="form.phone_number"
                placeholder="6288809139413"
              />
            </div>
            <div class="form-input auth" style="margin-bottom: 66px">
              <label>Nomor Identitas</label>
              <input
                type="text"
                class="w-100"
                v-model="form.identity_number"
                placeholder="5315056301790004"
              />
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
    <!-- Modal Message -->
    <ModalMessage
      :message="modal.message"
      :show="modal.show"
      @closeModal="modal.show = false"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { AlertCircleIcon } from "vue-feather-icons";

export default {
  auth: false,
  name: "AuthLoginPage",
  layout: "auth",
  computed: {
    ...mapGetters({
      auth: "auth/getAuthIsAuth",
    }),
  },
  components: {
    AlertCircleIcon,
  },
  watch: {
    form: {
      handler(val) {
        if (
          val.policy_number != "" &&
          val.phone_number != "" &&
          val.identity_number != ""
          && val.verified == true
        ) {
          this.signInDisable = false;
        } else {
          this.signInDisable = true;
        }
      },
      deep: true,
    },
  },
  auth(context) {
    return "auth";
  },
  data() {
    return {
      signInDisable: true,
      form: {
        policy_number: "BLMS0000046", //9210000627
        phone_number: "6285692203893", //6288809139413
        identity_number: "3578204808680002", //5315056301790004
        verified: "",
      },
      modal: {
        message: "",
        show: false,
      },
    };
  },
  methods: {
    signIn: async function () {
      const response = await this.$store.dispatch("auth/signIn", this.form);
      if(typeof response.success != "undefined" && response.success){
        this.$router.push({
          path: `/auth/otp?phonenumber=${response.data.phoneNumber}`,
        });
      }


      // TEST

      // try {
      // let response = await this.$auth
      //   .loginWith("local", {
      //     data: {
      //       policy_number: this.form.policy_number,
      //       phone_number: this.form.phone_number,
      //       identity_number: this.form.identity_number,
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   });

      // console.log(response);
      // if (response) {
      // } else {
      //   this.modal.message =
      //     "Akun anda telah terblokir, silahkan hubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id";
      //   this.modal.show = true;
      // }
      // } catch (err) {
      //   console.log(err);
      //   this.error = err.response.data.message;
      // }
    },
    verifyMethod: function (response) {
      if (response) {
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

h2.mobile-logo {
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 29px;
  /* identical to box height */

  text-align: center;

  /* Text/Normal */

  color: #2e343d;
}

.main {
  align-items: center;
  height: 100vh;
}
// Breakpoints
@media screen and (max-width: 959px) {
  .main {
    align-items: unset;
    height: unset;
  }
  .bni_logo {
    padding-bottom: 0px;
    text-align: center;
    img {
      width: 50px;
    }
  }
}
</style>
