<template>
  <v-app>
    <div class="logo_container">
      <img src="~/assets/icon/main_bni_life.svg" alt="logo" />
    </div>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<style lang="scss" scoped>
#app {
  background: rgb(251, 253, 255);
  background: linear-gradient(
    190deg,
    rgba(251, 253, 255, 1) 0%,
    rgba(254, 250, 248, 1) 73%,
    rgba(230, 221, 215, 1) 96%,
    rgba(230, 206, 167, 0.7931547619047619) 100%
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
