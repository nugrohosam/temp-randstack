export default {
  beforeMount() {
    window.addEventListener("beforeunload", this.beforeRefresh);
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.beforeRefresh);
  },
  methods: {
    beforeRefresh(event) {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to exit?");
    },
  },
};
