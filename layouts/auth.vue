<template>
  <v-app>
    <v-main>
      <div>
        <img
          src="~/assets/img/background-login-rounded.png"
          alt="background"
          class="background"
        />
        <!-- <div class="background-shadow">
          <div class="orange-oval"></div>
        </div>
        <div class="background-shadow">
          <img
            src="~/assets/img/background-login.png"
            class="background-oval"
          />
        </div> -->
        <div class="hidden lg:block lg:absolute lg:right-0 mr-4">
          <img
            src="~/assets/icon/main_bni_life.svg"
            alt="logo"
            class="w-24 xl:w-36 mb-4 mt-4 xl:float-right"
          />
        </div>
        <v-container class="absolute left-0 right-0 p-0">
          <div class="flex justify-end lg:absolute lg:right-0 mr-4 lg:hidden">
            <img
              src="~/assets/icon/main_bni_life.svg"
              alt="logo"
              class="w-24 xl:w-36 mb-4 mt-4 xl:float-right"
            />
          </div>
          <Nuxt />
          <ResponseAlert @closeModal="modal.show = false" />
          <OverlayLoading />
        </v-container>
      </div>
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
.background-shadow {
  filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
}
.background {
  width: 100%;
  object-fit: cover;
  object-position: bottom center;
  position: absolute;

  @media screen and (min-width: 426px) {
    height: 95vh;
  }
}

.background-oval {
  object-fit: cover;
  clip-path: ellipse(80% 100% at top center);
}

.orange-oval {
  background-color: #f7931d;
  top: 50px;
  clip-path: ellipse(75% 100% at top center);
}

.background-oval,
.orange-oval {
  width: 100%;
  height: 30vh;

  position: absolute;

  @media screen and (min-width: 426px) {
    height: 75vh;
  }
}

#app {
  // background-image: radial-gradient(
  //     circle at bottom right,
  //     rgba(213, 226, 231, 1) 23%,
  //     rgba(241, 234, 231, 0.3925945378151261) 52%,
  //     rgba(236, 236, 236, 0) 100%,
  //     transparent 100px
  //   ),
  //   radial-gradient(
  //     circle at top left,
  //     rgba(255, 220, 205, 1) 23%,
  //     rgba(241, 234, 231, 0.3925945378151261) 52%,
  //     rgba(236, 236, 236, 0) 100%,
  //     transparent 100px
  //   );
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
