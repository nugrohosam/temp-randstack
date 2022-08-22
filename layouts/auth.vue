<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <Nuxt />
        <ResponseAlert
            @closeModal="modal.show = false"
        />
        <OverlayLoading />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  beforeMount(){
    this.check();
  },
  watch: {

  },
  data(){
    return {
      modal: {
        message: "",
        show: false,
      },
    }
  },
  methods: {
    check: async function(){
      const isAuthenticated = await this.$store.dispatch('auth/check');
      if(isAuthenticated){
        this.$router.push({
          path: "/transaction/submission",
        });
      }else{
        this.$router.push({
          path: "/auth/login",
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  background-image: radial-gradient(
      circle at bottom right,
      rgba(213, 226, 231, 1) 23%,
      rgba(241, 234, 231, 0.3925945378151261) 52%,
      rgba(236, 236, 236, 0) 100%,
      transparent 100px
    ),
    radial-gradient(
      circle at top left,
      rgba(255, 220, 205, 1) 23%,
      rgba(241, 234, 231, 0.3925945378151261) 52%,
      rgba(236, 236, 236, 0) 100%,
      transparent 100px
    );
}
.logo_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
