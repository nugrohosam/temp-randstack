<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="card-menu">
      <div class="icon">
        <img :src="require(`@/assets/icon/${icon}`)" alt="" />
      </div>
      <p>{{ name }}</p>
    </div>
    <div class="open-button">
      <NuxtLink :to="link">
        <v-btn>
          Buka
          <chevron-right-icon
            size="1.5x"
            class="custom-class"
          ></chevron-right-icon>
        </v-btn>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon } from "vue-feather-icons";

export default {
  name: "Menu",
  props: ["name", "icon", "link"],
  components: {
    ChevronRightIcon,
  },
};
</script>
<style lang="scss" scoped>
.card-menu {
  /* Surface */
  background: #ffffff;
  height: 165px;
  /* Primary */
  border: 1px solid #f15921;
  box-shadow: 6px 7px 16px rgba(193, 185, 185, 0.2);
  border-radius: 8px;
  padding: 16px;
  .icon {
    background-color: #f15921;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: 50px;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 5px;
    border-radius: 4px;
    height: fit-content;
    img {
      width: 100%;
    }
  }
  p {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #2e343d;
    margin-top: 20px;
  }
}
.open-button {
  background: #f15921;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */
  /* light Background */
  color: #f9f9f9;
  border-radius: 0 0 8px 8px;
  // padding: ;
  top: -36px;
  position: relative;
  button {
    background-color: transparent !important;
    box-shadow: unset;
    width: 100%;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height, or 117% */

    /* light Background */

    color: #f9f9f9;
    ::v-deep .v-btn__content {
      justify-content: space-between;
    }
  }
}
</style>
