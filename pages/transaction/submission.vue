<template>
  <div>
    <div class="row">
      <div class="col-12">
        <!-- Head -->
        <div class="row">
          <div class="col-12">
            <div class="page-header">
              <h3 class="page-title">{{current_header_title}}</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- Search -->
          <div class="col-12">
            <div class="page-body" >
              <div class="row" v-show="showMenu">
                <div class="col-lg-6 col-md-12">
                  <!-- <v-toolbar> -->
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
                  <!-- </v-toolbar> -->
                </div>
              </div>
              <!-- Transaction Status Menu -->
              <div class="row" v-show="showMenu">
                <div class="col-12">
                  <div class="menu-grid">
                    <Menu
                      v-for="(menu, key) in menus"
                      :key="key"
                      :name="menu.name"
                      :icon="menu.icon"
                      :link="menu.link"
                      @click.native="current_header_title = menu.name"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <NuxtChild />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="text-center">

    </div> -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  mounted() {
    if($nuxt.$route.name != "transaction-submission"){
      this.showMenu = false;
    }else{
      this.showMenu = true;
      this.current_header_title = this.default_header_title;
    }
  },
  data() {
    return {
      showMenu: true,
      default_header_title: 'Pengajuan Transaksi',
      current_header_title: '',
      menu_search: '',
      // dialog: true,
      // menus: [
      //   {
      //     name: "Cuti Premi",
      //     to: "/",
      //     icon: "ic_cuti_premi.svg",
      //   },
      // ],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission") {
        this.showMenu = false;
      }else{
        this.showMenu = true;
        this.current_header_title = this.default_header_title;
      }
    },
    menu_search(keyword){
      this.searchMenu({'keywords' : keyword})
      // let menu_filtered = this.menus.filter(function(item){
      //   let name = item['name'];
      //   if(name.includes(keyword)){
      //     return item['name'];
      //   }
      // })
      // this.menus = menu_filtered;
    }
  },
  computed: {
    ...mapGetters({
      menus: "submission_transaction/getMenus",
    }),
  },
  methods: {
    ...mapActions({
      searchMenu: 'submission_transaction/searchMenu'
    })
  }
};
</script>
<style lang="scss" scoped>
.menu-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 40px;
}
</style>

