<template>
  <div>
    Cuti Premi Page
  </div>
</template>
<script>
export default {
  name: 'cuti-premi',
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
}
</script>
