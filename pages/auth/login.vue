<template>
  <div class="md:flex md:justify-end md:items-center md:h-screen">
    <div
      class="md:bg-transparent p-6 rounded-lg md:w-80"
      style="background: rgba(255, 255, 255, 0.8)"
    >
      <img
        src="~/assets/svg/bpos_digital.svg"
        alt="bpos"
        class="w-16 mx-auto mb-2"
      />
      <h5 class="text-center font-medium text-lg mb-8" style="color: #006884">
        Selamat Datang
      </h5>

      <form @submit.prevent="signIn">
        <div class="form-input auth">
          <label>Nomor Polis</label>
          <input
            type="text"
            class="w-100"
            v-model="form.policy_number"
            placeholder="BLMSXXXXX..."
          />
        </div>

        <div class="form-input auth">
          <ValidationProvider name="Nomor Hp" rules="phone" v-slot="{ errors }">
            <label>Nomor HP</label>
            <input
              type="number"
              class="w-100"
              v-model="form.phone_number"
              placeholder="6xxxxxxx...."
            />
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-input auth">
          <label>Nomor Identitas</label>
          <input
            type="text"
            class="w-100"
            v-model="form.identity_number"
            placeholder="357xxx..."
          />
        </div>

        <vue-recaptcha
          sitekey="6LeSQkYgAAAAAFmQ1KO1ADvIqvuXZVHGKmSw71u7"
          @verify="verifyMethod"
          @error="errorMethod"
          class="d-flex justify-center my-8"
          style="transform: scale(0.8)"
        ></vue-recaptcha>

        <button
          class="btn btn-primary w-100"
          :disabled="signInDisable"
          type="submit"
        >
          Sign In
        </button>
        <div id="auth_help" class="underline text-sm">
          <a href="" class=""> Help </a>
        </div>
      </form>
    </div>
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
          val.verified == true
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
        policy_number: "",
        phone_number: "",
        identity_number: "",
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
      if (typeof response.success != "undefined" && response.success) {
        this.$router.push({
          path: `/auth/otp?phonenumber=${response.data.phoneNumber}`,
        });
      }
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
