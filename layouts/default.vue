<template>
  <v-app class="app">
    <!-- <v-navigation-drawer
      fixed
      app
    > -->
    <template v-if="isChecked">
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
                  <activity-icon
                    size="1.5x"
                    class="custom-class"
                  ></activity-icon>
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
                  <log-out-icon size="1.5x"></log-out-icon>
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
          <v-btn :ripple="false" router plain exact @click="signOut()">
            <span>Logout</span>
            <log-out-icon size="1.5x" class="custom-class"></log-out-icon>
          </v-btn>
        </v-bottom-navigation>
      </template>
      <v-main>
        <div class="app-drawer">
          <div class="action-container">
            <span>
              <VDropdown :distance="6" :skidding="-190">
                <button>
                  <bell-icon size="1.5x"></bell-icon>
                </button>
                <template #popper>
                  <div style="width: 480px; border-radius: 40px">
                    <NotificationPanel :style="'max-height: 420px;'" />
                  </div>
                </template>
              </VDropdown>
            </span>
            <!-- <span>
              <a href="">
                <help-circle-icon size="1.5x"></help-circle-icon>
              </a>
            </span> -->
            <span>
              <div class="small-profile">
                <div class="sec-title">
                  <p class="_policy">
                    {{
                      myPolicy
                        ? myPolicy.policyWithCode.proposalNumber
                        : "memuat..."
                    }}
                  </p>
                  <p class="_name">
                    {{
                      myPolicy
                        ? $isNullWithSpace(
                            myPolicy.policyWithCode.policyHolder.person
                              .firstName
                          ) +
                          $isNullWithSpace(
                            myPolicy.policyWithCode.policyHolder.person.midName
                          ) +
                          $isNullWithSpace(
                            myPolicy.policyWithCode.policyHolder.person.lastName
                          )
                        : "memuat..."
                    }}
                  </p>
                </div>
                <div class="sec-image">
                  <div class="_ellipse-image">
                    <img src="~/assets/img/dummy-profile.webp" alt="" />
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
        <v-container>
          <Nuxt />
          <ResponseAlert @closeModal="modal.show = false" />
          <OverlayLoading />
        </v-container>
      </v-main>
    </template>
    <template v-else>
      <template v-if="error.status">
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
          "
        >
          <img
            v-if="type ? type : 'warning'"
            src="~/assets/icon/ic_warning_modal.svg"
            class="modal-icon"
            alt=""
          />
          <p style="color: black">{{ error.message }}</p>
        </div>
      </template>
      <template v-else>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
          "
        >
          <v-progress-circular
            indeterminate
            size="64"
            color="#F15921"
            width="7"
          >
          </v-progress-circular>
          <p style="color: black">Mohon tunggu, sedang memuat data...</p>
        </div>
      </template>
    </template>
    <ModalMessage
      :message="idle.message"
      :show="idle.show"
      :button="idle.button"
      @closeModal="idle.show = false"
    />
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
  LogOutIcon,
  BellIcon,
  RepeatIcon,
  HelpCircleIcon,
} from "vue-feather-icons";
export default {
  name: "DefaultLayout",
  components: {
    ActivityIcon,
    RefreshCwIcon,
    ClipboardIcon,
    LogOutIcon,
    BellIcon,
    RepeatIcon,
    HelpCircleIcon,
  },
  onIdle() {
    this.showTimeout();
    sessionStorage.removeItem("auth");
  },
  onActive() {},
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
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  beforeMount() {
    this.check();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      isChecked: false,
      error: {
        status: false,
        message: "",
      },
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
      idle: {
        message: "",
        show: false,
        button: {
          text: "Oke",
          redirect_link: "/auth/login",
          redirect_type: "ssr",
        },
      },
    };
  },
  methods: {
    showTimeout: function () {
      let that = this;
      let defaultPopup = 5;
      this.idle.message =
        "Sistem mendeteksi kamu tidak melakukan aktivitas apapun. Silahkan login kembali";
      this.idle.show = true;

      setInterval(() => {
        that.idle.button.text = `Oke (${defaultPopup})`;
        if (defaultPopup > 0) {
          defaultPopup -= 1;
        }
      }, 1000);

      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 6000);
    },
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
      if (isAuthenticated) {
        this.getMyPolicy();
      } else if (!isAuthenticated) {
        this.$router.push({
          path: "/auth/login",
        });
      }
    },

    getMyPolicy: async function () {
      let result = await this.$store.dispatch(
        "submission_transaction/getMyPolicy"
      );
      if (result.success == true) {
        this.isChecked = true;
      } else {
        this.error.status = true;
        if (typeof result.data.message != "undefined") {
          this.error.message = result.data.message;
        } else if (typeof result.data.Message != "undefined") {
          this.error.message = result.data.Message;
        } else {
          this.error.message = "Terjadi kesalahan, coba lagi.";
        }
      }
    },

    showNotification: function () {
      alert("Hello");
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
