<template>
  <v-dialog persistent v-model="show" class="general-modal">
    <div class="modal-v-card">
      <img
        v-if="type ? type : 'warning'"
        src="~/assets/icon/ic_warning_modal.svg"
        class="modal-icon mx-auto"
        alt=""
      />
      <div class="modal-text">
        {{ message }}
      </div>
      <button class="btn btn-primary" @click="close()">Tutup</button>
    </div>
  </v-dialog>
</template>
<script>
export default {
  name: "modal-message",
  props: ["type"],
  computed: {
    getShowResponseAlert() {
      return this.$store.getters.getShowResponseAlert;
    },
    getMessageResponseAlert() {
      return this.$store.getters.getMessageResponseAlert;
    },
  },
  watch: {
    getShowResponseAlert(isShow) {
      this.show = isShow;
    },
    getMessageResponseAlert(message) {
      this.message = message;
    },
  },
  data() {
    return {
      show: false,
      message: "",
    };
  },
  methods: {
    close() {
      this.$emit("closeModal");
      this.$store.dispatch("closeResponseAlert");
    },
  },
};
</script>
<style lang="scss" scoped>
.btn {
  padding: 0 20px !important;
}
</style>
