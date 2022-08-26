<template>
  <div>
    Data Tertanggung
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
  beforeMount() {
    this.modal.show = true;
    this.modal.message =
      "Transaksi yang dipilih tidak dapat dilakukan, untuk informasi lebih lanjut silahkan menghubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id";
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
