<template>
  <div>
    <v-dialog persistent v-model="show">
      <img :src="src" class="image-preview" alt="" />
      <div style="width: 100%; display:flex;">
        <button class="btn btn-primary fit-content" @click="action()">Tutup</button>
      </div>

    </v-dialog>

  </div>
</template>
<script>
export default {
  name: "modal-image-preview",
  props: ["show", "src"],
  watch: {
    show(value) {
      console.log(this.show);
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
      this.isShow = false;
      this.$emit("closeImagePreview");
    },
  },
};
</script>
<style lang="scss" scoped>
.btn {
  padding: 0 20px !important;
}
img {
  width: 100%;
}
::v-deep .v-dialog {
  border-radius: 4px;
  margin: 24px;
  overflow-y: auto;
  pointer-events: auto;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  z-index: inherit;
  box-shadow: unset;
}
</style>
