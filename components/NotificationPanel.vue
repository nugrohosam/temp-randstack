<template>
  <v-card class="mx-auto" max-width="" :outlined="false">
    <v-card-title class="card-title">Notification</v-card-title>
    <v-divider class="mx-0"></v-divider>
    <template v-if="items">
      <v-card-text :style="style">
        <template v-for="item in items">
          <div :class="item.opened ? 'items opened' : 'items'" :key="item.id">
            <div class="items-container">
              <v-badge
                bordered
                dot
                inline
                left
                color="#F15921"
                v-if="!item.opened"
              ></v-badge>
              <div class="items-value">
                <p class="item-title">{{ item.title }}</p>
                <div class="item-bottom">
                  <p class="item-data">{{ item.content }}</p>
                  <p class="item-date">{{ item.date }}</p>
                </div>
              </div>
            </div>
            <v-divider class="item-line"></v-divider>
          </div>
        </template>
      </v-card-text>
    </template>
    <template v-else>
      <div
        style="
          margin-top: 20px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <v-progress-circular indeterminate size="64" color="#F15921" width="7">
        </v-progress-circular>
        <p style="color: black">Mohon Tunggu...</p>
      </div>
    </template>
  </v-card>
</template>
<script>
export default {
  mounted() {
    this.getItems();
  },
  name: "notification-panel",
  props: ['style'],
  watch: {
    show(value) {},
  },
  computed: {
    items() {
      return this.$store.getters["notification/getItems"];
    },
  },
  methods: {
    getItems: async function () {
      this.$store.dispatch("notification/get");
    },
  },
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
