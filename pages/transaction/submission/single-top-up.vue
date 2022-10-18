<template>
  <div>
    <!-- <div>Perubahan {{ $wording("Premi Dasar") }} dan Topup Berkala Page</div> -->
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
  name: "basic-premi-change-and-topup",
  beforeMount() {
    this.modal.show = true;
    this.modal.message = "Menu yang anda pilih masih dalam tahap pengembangan";
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
      },
    };
  },
};
</script>
