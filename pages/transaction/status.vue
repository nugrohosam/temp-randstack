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
              <!-- Transaction Status Menu -->
              <div class="row" >

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
// import { mapState, mapGetters, mapActions } from "vuex";
export default {
  mounted() {
    if($nuxt.$route.name != "transaction-status"){
      this.showMenu = false;
    }else{
      this.showMenu = true;
      this.current_header_title = this.default_header_title;
    }
  },
  data() {
    return {
      showMenu: true,
      default_header_title: 'Status Transaksi',
      current_header_title: ''
    };
  },
  watch: {

  },
  computed: {

  },
  methods: {

  }
};
</script>
