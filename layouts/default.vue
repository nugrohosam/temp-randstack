<template>
  <v-app>
    <!-- <v-navigation-drawer
      fixed
      app
    > -->

    <div class="navbar-container desktop">
      <div class="navbar desktop">
        <div class="logo_container">
          <img src="~/assets/icon/main_bni_life.svg" alt="logo" />
        </div>
        <div class="list-container">
          <v-list>
            <v-list-item router to="/transaction/submission">
              <v-list-item-action>
                <refresh-cw-icon
                  size="1.5x"
                  class="custom-class"
                ></refresh-cw-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title v-text="'Pengajuan Transaksi'" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/transaction/status">
              <v-list-item-action>
                <activity-icon size="1.5x" class="custom-class"></activity-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="'Status Transaksi'" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/polis/information">
              <v-list-item-action>
                <clipboard-icon size="1.5x"></clipboard-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="'Informasi Data Polis'" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div class="logout-container" @click="signOut()">
          <v-list>
            <v-list-item router exact>
              <v-list-item-action>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="'Logout'" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </div>

    <template>
      <v-bottom-navigation class="navbar mobile" fixed color="#F15921" grow>
        <v-btn
          :to="'/transaction/submission'"
          :ripple="false"
          dark
          plain
          router
          exact
        >
          <span>Pengajuan</span>
          <repeat-icon size="1.5x" class="custom-class"></repeat-icon>
        </v-btn>
        <v-btn :to="'/transaction/status'" :ripple="false" router plain exact>
          <span>Status</span>
          <activity-icon size="1.5x" class="custom-class"></activity-icon>
        </v-btn>
        <v-btn :to="'/polis/information'" :ripple="false" router plain exact>
          <span>Info Polis</span>
          <clipboard-icon size="1.5x" class="custom-class"></clipboard-icon>
        </v-btn>
        <v-btn :to="'/notification/'" :ripple="false" router plain exact>
          <span>Notifikasi</span>
          <bell-icon size="1.5x" class="custom-class"></bell-icon>
        </v-btn>
        <v-btn :to="'/profile/'" :ripple="false" router plain exact>
          <span>Profil</span>
          <user-icon size="1.5x" class="custom-class"></user-icon>
        </v-btn>
      </v-bottom-navigation>
    </template>
    <v-main>
      <div class="app-drawer">
        <div class="action-container">
          <span>Profile</span>
          <span>Help</span>
          <span>Notification</span>
        </div>
      </div>
      <v-container>
        <Nuxt />
        <ResponseAlert @closeModal="modal.show = false" />
        <OverlayLoading />
      </v-container>
    </v-main>

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import {
  ActivityIcon,
  RefreshCwIcon,
  ClipboardIcon,
  UserIcon,
  BellIcon,
  RepeatIcon,
} from "vue-feather-icons";
export default {
  name: "DefaultLayout",
  components: {
    ActivityIcon,
    RefreshCwIcon,
    ClipboardIcon,
    UserIcon,
    BellIcon,
    RepeatIcon,
  },
  watch: {
    windowWidth(newWidth, oldWidth) {
      // breakpoint mobile <960px
      // breakpoint tablet <1264px
      this.changeAppDrawer(newWidth);
    },
  },
  mounted() {
    this.changeAppDrawer(this.windowWidth);
    this.$nextTick(function () {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeMount() {
    this.check();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      modal: {
        message: "",
        show: false,
      },
      windowWidth: window.innerWidth,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: `<activity-icon size="1.5x" class="custom-class"></activity-icon>`,
          title: "Pengajuan Transaksi",
          to: "/transaction/submission",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Status Transaksi",
          to: "/transaction/status",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Informasi Data Polis",
          to: "/polis/information",
        },
      ],
      miniVariant: false,
      right: true,
      title: "Vuetify.js",
      burgerButton: false,
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      // this.changeAppDrawer(this.windowWidth);
    },

    changeAppDrawer(width) {
      if (width < 1264) {
        this.burgerButton = true;
        this.drawer = false;
      } else {
        this.burgerButton = false;
        this.drawer = true;
      }
    },

    signOut: function () {
      this.$store.dispatch("auth/signOut");
    },

    check: async function () {
      const isAuthenticated = await this.$store.dispatch("auth/check");
      if (!isAuthenticated) {
        this.$router.push({
          path: "/auth/login",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}
::v-deep .v-list {
}

.list-container {
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;
}
.logo_container {
  text-align: center;
  flex: 0;
  margin-top: 20px;
  img {
    width: 100px;
  }
}
</style>
