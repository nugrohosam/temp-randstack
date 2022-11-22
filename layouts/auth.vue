<template>
  <v-app>
    <v-main>
      <div class="background">
        <v-container>
          <div class="flex justify-end md:float-right">
            <img
              src="~/assets/icon/main_bni_life.svg"
              alt="logo"
              class="w-24 mb-4"
            />
          </div>
          <Nuxt />
          <ResponseAlert @closeModal="modal.show = false" />
          <OverlayLoading />
        </v-container>
      </div>
      <!-- <img src="~/assets/img/backgroun-login-rounded.png" class="background" /> -->
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  beforeMount() {
    this.check();
  },
  watch: {},
  data() {
    return {
      modal: {
        message: "",
        show: false,
      },
    };
  },
  methods: {
    check: async function () {
      const isAuthenticated = await this.$store.dispatch("auth/check");
      if (isAuthenticated) {
        this.$router.push({
          path: "/transaction/submission",
        });
      } else {
        this.$router.push({
          path: "/auth/login",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  background-image: url("~/assets/img/backgroun-login-rounded.png");
  background-position: center top;
  background-size: contain;
}
// .background {
//   width: 100%;
//   height: 30vh;
//   object-fit: cover;

//   @media screen and (min-width: 426px) {
//     //do Smth
//     height: 90vh;
//   }
//   // height: 90vh;
//   // clip-path: ellipse(80% 800px at top center);
//   // position: absolute;
// }

#app {
  background-image: radial-gradient(
      circle at bottom right,
      rgba(213, 226, 231, 1) 23%,
      rgba(241, 234, 231, 0.3925945378151261) 52%,
      rgba(236, 236, 236, 0) 100%,
      transparent 100px
    ),
    radial-gradient(
      circle at top left,
      rgba(255, 220, 205, 1) 23%,
      rgba(241, 234, 231, 0.3925945378151261) 52%,
      rgba(236, 236, 236, 0) 100%,
      transparent 100px
    );
}
.logo_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
