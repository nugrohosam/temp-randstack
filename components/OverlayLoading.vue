<template>
   <!-- Temp Overlay Loading -->
    <div class="text-center">
      <v-overlay :value="show" color="rgba(250, 250, 250, 0.9)">
        <v-progress-circular  indeterminate size="64" color="#F15921" width="7">
        </v-progress-circular>
        <p style="color: black;">Mohon Tunggu...</p>
      </v-overlay>

    </div>
</template>
<script>
export default {
  name: "modal-message",
  props: ['type'],
  computed: {
    getShowOverlayLoading(){
      return this.$store.getters.getShowOverlayLoading
    },
    getMessageOverlayLoading(){
      return this.$store.getters.getMessageOverlayLoading
    },
  },
  watch: {
    getShowOverlayLoading(isShow){
      this.show = isShow;
    },
    getMessageOverlayLoading(message){
      this.message = message;
    },
  },
  data(){
    return {
      show: false,
      message: "",
    }
  },
}
</script>
