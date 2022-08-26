<template>
  <div class="button-back" @click="$router.go(-1)">
    <v-icon color="#F15921" left>
      mdi-chevron-left
    </v-icon>
    Back
  </div>
</template>

<style scoped>
.button-back {
  margin-bottom: 1rem;
  width: fit-content;
  color: #F15921;
  cursor: pointer;
}
</style>