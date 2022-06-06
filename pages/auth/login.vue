<template>
  <v-row justify="center" align="center">
    <div class="col-md-8 col-xs-8">
      <div class="v-card-auth-body">
        <div class="row">
          <div class="col-lg-6 auth-section-logo d-none d-lg-block">
            <div class="logo-container">
              <img
                style="width: 180px"
                src="~/assets/icon/ic_main_action.png"
                alt=""
              />
            </div>
          </div>
          <div class="col-lg-6 auth-section-form col-md-12">
            <form action="">
              <div class="form-input sketch">
                <label>Nomor Polis</label>
                <input type="text" class="w-100" />
              </div>
              <div class="form-input sketch">
                <label>Nomor HP</label>
                <input type="text" class="w-100" />
              </div>
              <div class="form-input sketch">
                <label>Nomor Identitas</label>
                <input type="text" class="w-100" />
              </div>
              <div class="form-input sketch">
                <label>Email (Opsional)</label>
                <input type="text" class="w-100" />
              </div>
              <vue-recaptcha
                sitekey="6LeSQkYgAAAAAFmQ1KO1ADvIqvuXZVHGKmSw71u7"
                @verify="verifyMethod"
                @error="errorMethod"
                class="g-recaptcha"
              ></vue-recaptcha>

              <button
                class="btn btn-primary sketch bc-blue w-100"
                :disabled="signInDisable"
                @click.prevent="signIn"
              >
                Sign In
              </button>
              <!-- <p>{{user}}</p> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "AuthLoginPage",
  layout: "auth",
  // components: { VueRecaptcha },
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    }),
  },
  watch: {
    user: function(){
      console.log(this.user);
    }
  },
  auth(context) {
    return "auth";
  },
  data() {
    return {
      signInDisable: false,
    };
  },
  methods: {
    ...mapActions('auth',[
      'signIn'
    ]),

    verifyMethod: function (response) {
      this.signInDisable = false;
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
.logo-container{
  height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
