<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <div class="logo_container">
        <img src="~/assets/icon/main_bni_life.svg" alt="logo" />
      </div>
      <div class="list-container">
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-show="burgerButton"
      />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
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
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Status Transaksi",
          to: "/transaction/status",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Informasi Data Polis",
          to: "/inspire",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Pengajuan Transaksi",
          to: "",
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
      console.log(width);
      if (width < 1264) {
        this.burgerButton = true;
        this.drawer = false;
      } else {
        this.burgerButton = false;
        this.drawer = true;
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
.list-container{
  flex: auto;
}
.logo_container {
  text-align: center;
  flex: 0;
  img {
    width: 100px;
  }
}
</style>
