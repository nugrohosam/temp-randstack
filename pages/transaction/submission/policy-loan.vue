<template>
  <div>
    <!-- <div class="row">
      <div class="col-12">
        <div class="menu-grid">
          <Menu
            :isActive="false"
            :name="'Pembayaran'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./payment-policy-loan'"
          />
          <Menu
            :isActive="false"
            :name="'Pengajuan'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./new-policy-loan'"
          />
        </div>
      </div>
    </div> -->
    <NuxtChild />
    <ModalMessage
      :message="modal.message"
      :show="modal.show"
      :button="modal.button"
      @closeModal="modal.show = false"
    />
  </div>
</template>
<script>
export default {
  name: "policy-loan",
  beforeMount() {
    this.modal.show = true;
    this.modal.message =
      "Menu yang anda pilih masih dalam tahap pengembangan"
  },
  data() {
    return {
      modal: {
        message: "",
        show: false,
        button: {
          text: "Tutup",
          redirect_link: "/transaction/submission",
          redirect_type: "spa",
        },
      },};
  },
};
</script>
<style lang="scss" scoped>
.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 2fr);
  grid-column-gap: 16px;
  grid-row-gap: 40px;
  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 0px;
  }
}
</style>
