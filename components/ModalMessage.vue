<template>
  <v-dialog persistent v-model="isShow" class="general-modal">
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
      <button class="btn btn-primary" @click="action()">
        {{ button ? button.text : "Tutup" }}
      </button>
    </div>
  </v-dialog>
</template>
<script>
export default {
  name: "modal-message",
  props: ["message", "type", "show", "button"],
  watch: {
    show(value) {
      this.isShow = this.show;
    },
  },
  data() {
    return {
      isShow: this.show,
    };
  },
  methods: {
    action() {
      if (this.button) {
        // do something
        this.isShow = false;
        if (typeof this.button.redirect_type != "undefined") {
          if (this.button.redirect_type == "spa") {
            this.$router.push({ path: this.button.redirect_link });
          } else {
            window.location.href = this.button.redirect_link;
          }
        } else {
          window.location.href = this.button.redirect_link;
        }
      } else {
        this.isShow = false;
        this.$emit("closeModal");
      }
    },
  },
};
</script>
