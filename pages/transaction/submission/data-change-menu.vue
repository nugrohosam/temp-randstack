<template>
  <div>
    <div class="row">
      <!-- Search -->
      <div class="col-12">
        <template>
          <div class="row">
            <div class="col-12">
              <NuxtChild />
            </div>
          </div>
        </template>
        <!-- <template v-else>
          <div class="page-body" style="display:flex; flex-direction:column; justify-content: center; align-items:center;">
            <v-progress-circular
              indeterminate
              size="64"
              color="#F15921"
              width="7"
            >
            </v-progress-circular>
            <p style="color: black">Mohon Tunggu...</p>
          </div>
        </template> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  mounted() {
    console.log($nuxt.$route.name);
    if ($nuxt.$route.name != "polis-information") {
      this.showMenu = false;
    } else {
      this.showMenu = true;
    }

    this.getInformationPolicyList();
  },
  data() {
    return {
      showMenu: true,
      tab: 1,
      items: [
        { index: 0, tab: "Pembayar", link: "/transaction/submission/data-change-menu/payer" },
        { index: 1, tab: "Data Tertanggung", link: "/transaction/submission/data-change-menu/insured-data" },
        {
          index: 2,
          tab: "Pemegang Polis",
          link: "/transaction/submission/data-change-menu/job-insured",
        },
        {
          index: 3,
          tab: "Ahli Waris",
          link: "",
        },
        {
          index: 4,
          tab: "Tanggal Lahir dan Jenis Kelamin Tertanggung",
          link: "",
        },
        {
          index: 5,
          tab: "Pekerjaan Tertanggung",
          link: "/transaction/submission/data-change-menu/job-insured",
        },
      ],
      information_policy: null,
    };
  },
  watch: {},
  computed: {
    informationPolicyList() {
      return this.$store.getters["information_policy/getInformationPolicyList"];
    },
  },
  methods: {
    getInformationPolicyList: async function () {
      // await this.$store.dispatch("information_policy/getInformationPolicyList");
      // this.information_policy = this.informationPolicyList;
      // this.$router.push({ path: "/polis/information/insured" });
    },
  },
};
</script>
<style lang="scss">
.v-slide-group__content a {
  border-bottom: 1.5px solid #716f6f;
}
</style>
