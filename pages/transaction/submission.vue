<template>
  <body-page>
    <div v-show="showMenu">
      <div class="row mb-8">
        <div class="col-lg-6 col-md-12">
          <v-text-field
            class="search-bar"
            hide-details
            prepend-icon="mdi-magnify"
            single-line
            placeholder="Cari Menu"
            flat
            solo
            v-model="menu_search"
          ></v-text-field>
        </div>
      </div>

      <!-- Transaction Status Menu -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-fit">
        <Menu
          v-for="(menu, key) in menus"
          :key="key"
          :isActive="menu.active"
          :hidden="menu.hidden"
          :name="$checkSyariLabel(menu.name)"
          :icon="menu.icon"
          :link="menu.link"
          @click.native="current_header_title = $checkSyariLabel(menu.name)"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <NuxtChild />
      </div>
    </div>
  </body-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      showMenu: true,
      default_header_title: "Pengajuan Transaksi",
      current_header_title: "",
      menu_search: "",
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.name != "transaction-submission") {
          this.showMenu = false;
          const foundMenu = this.menus.find((item) => item.link === to.path);
          this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
            title: foundMenu ? foundMenu.name : "",
          });
        } else {
          this.showMenu = true;
          this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
            title: this.default_header_title,
          });
        }
      },
      immediate: true,
    },
    menu_search(keyword) {
      this.searchMenu({ keywords: keyword });
      let menu_filtered = this.menus.filter(function (item) {
        let name = item["name"];
        if (name.includes(keyword)) {
          return item["name"];
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      menus: "submission_transaction/getMenus",
    }),
  },
  methods: {
    ...mapActions({
      searchMenu: "submission_transaction/searchMenu",
    }),
  },
};
</script>
