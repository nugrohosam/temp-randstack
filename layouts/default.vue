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
            <v-list-item-action v-if="item.to == '/transaction/submission'">
               <refresh-cw-icon size="1.5x" class="custom-class"></refresh-cw-icon>
            </v-list-item-action>
            <v-list-item-action v-else-if="item.to == '/transaction/status'">
               <activity-icon size="1.5x" class="custom-class"></activity-icon>
            </v-list-item-action>
            <v-list-item-action v-else>
               <clipboard-icon size="1.5x" class="custom-class"></clipboard-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <div class="logout-container" @click="signOut()">
        <v-list>
          <v-list-item
            router
            exact
          >
            <v-list-item-action >
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app class="app-bar-bnil">
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

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { ActivityIcon, RefreshCwIcon, ClipboardIcon   } from 'vue-feather-icons'
export default {
  name: "DefaultLayout",
  components: {
    ActivityIcon, RefreshCwIcon, ClipboardIcon
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

  beforeMount(){
    this.check();
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

    signOut: function(){
      this.$store.dispatch('auth/signOut');
    },

    check: async function(){
      const isAuthenticated = await this.$store.dispatch('auth/check');
      if(!isAuthenticated){
        this.$router.push({
          path: "/auth/login",
        });
      }
    }
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
