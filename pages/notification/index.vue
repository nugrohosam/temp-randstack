<template>
  <div class="notification-page">
    <notification-panel></notification-panel>
  </div>
</template>
<script>
import NotificationPanel from "../../components/NotificationPanel.vue";
export default {
  components: { NotificationPanel },
};
</script>
<style lang="scss" scoped>
.notification-page{
  @media screen and (max-width: 480px){
    padding-bottom: 70px;
  }
}
</style>
