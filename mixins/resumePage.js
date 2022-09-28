export default {
  beforeMount() {
    window.addEventListener("beforeunload", this.beforeRefresh);
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.beforeRefresh);
  },
  //   beforeRouteLeave(to, from, next) {
  //     const path = this.$route.path.split("/");
  //     path.pop();
  //     if (confirm("Apakah anda yakin keluar? data akan terhapus.")) {
  //       next();
  //     } else {
  //       next(false);
  //     }
  //   },
  methods: {
    beforeRefresh(event) {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to exit?");
    },
  },
};
