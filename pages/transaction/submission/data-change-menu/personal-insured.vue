<template>
  <div>
    Tanggal Lahir dan Jenis Kelamin Tertanggung
  </div>
</template>
<script>
export default {
  name: "new-policy-loan",
  data() {
    return {
      showMe: true,
    };
  },
  mounted() {
    console.log($nuxt.$route.name);
    if ($nuxt.$route.name != "transaction-submission-new-policy-loan") {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-new-policy-loan") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },

  methods: {
    save: async function () {
      // patch to action
      this.$router.push({ path: "./new-policy-loan/resume" });
    },
  },
};
</script>
