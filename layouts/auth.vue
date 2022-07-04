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
  // background: rgb(251, 253, 255);
  // background: linear-gradient(
  //   190deg,
  //   rgba(251, 253, 255, 1) 0%,
  //   rgba(254, 250, 248, 1) 73%,
  //   rgba(230, 221, 215, 1) 96%,
  //   rgba(230, 206, 167, 0.7931547619047619) 100%
  // );
  // background: radial-gradient(circle, rgba(255,220,205,1) 0%, rgba(255,218,203,1) 0%, rgba(255,220,205,1) 0%, rgba(241,234,231,1) 80%, rgba(236,236,236,1) 100%)
  //     left,
  //   radial-gradient(circle, rgba(246,184,160,1) 0%, rgba(201,226,235,1) 0%, rgba(236,236,236,1) 51%, rgba(251,242,235,0.9836309523809523) 100%) bottom right;
  // background-size: 50% 100%;
  // background-repeat: no-repeat;

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
    // background-size: 50% 100%;
  // background-image: radial-gradient(#c39f76 56%,#0000 57%);
  // background-size: 100px 100px;
  // background-repeat: no-repeat;
  // background-image: radial-gradient(
  //     circle at top left,
  //     rgba(255, 220, 205, 1) 23%,
  //     rgba(241, 234, 231, 0.3925945378151261) 52%,
  //     rgba(236, 236, 236, 0) 100%,
  //     transparent 100px
  //   ),
  //   radial-gradient(
  //     closest-side at 70% 50%,
  //     rgba(213, 226, 231, 1) 23%,
  //     rgba(241, 234, 231, 0.3925945378151261) 52%,
  //     rgba(236, 236, 236, 0) 100%
  //   );
  // background-size: 100%;
  // background-repeat: no-repeat;
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
