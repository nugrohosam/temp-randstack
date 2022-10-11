<template>
  <v-card class="mx-auto" max-width="" :outlined="false">
    <v-card-title class="card-title">Info</v-card-title>
    <v-divider class="mx-0"></v-divider>
    <v-card-text :style="style">
      <p>{{ information }}</p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "info-panel",
  props: ['style', 'information'],
};
</script>
<style lang="scss" scoped>
.btn {
  padding: 0 20px !important;
}
.card-title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height, or 122% */

  /* Darker Black */

  color: #404040;
}
h3 {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
}
.item-title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #070202 !important;
  margin-bottom: 10px;
}

.item-data {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  letter-spacing: 0.05em;
  /* Darker Grey */
  color: #7e7e7e;
  margin: 0;
}
.item-date {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height */

  letter-spacing: 0.05em;
  /* Dark Grey */
  color: #bfbfbf;
  margin: 0;
}
.items-value {
  margin-left: 16px;
  width: 100%;
}
.item-bottom {
  display: flex;
  justify-content: space-between;
}
.items {
  .items-container {
    display: flex;
    align-items: center;
  }
}
.opened {
  .item-title {
    font-weight: 400;
  }
}
.item-line {
  margin-top: 7px;
  margin-bottom: 7px;
}
</style>
