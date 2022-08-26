<!-- Please remove this file from your project -->
<template>
  <div>
    <NuxtLink class="nuxt-link" :to="link">
      <div :class="isActive == true ? 'card-menu-active' : 'card-menu-inactive'">
        <div class="icon">
          <img :src="require(`@/assets/icon/${icon}`)" alt="" />
        </div>
        <p>{{ name }}</p>
      </div>
      <div :class="isActive == true ? 'open-button-active' : 'open-button-inactive'">
        <v-btn>
          Buka
          <chevron-right-icon
            size="1.5x"
            class="custom-class"
          ></chevron-right-icon>
        </v-btn>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import { ChevronRightIcon } from "vue-feather-icons";

export default {
  name: "Menu",
  props: ["name", "icon", "link", "isActive"],
  components: {
    ChevronRightIcon,
  },
};
</script>

<style lang="scss" scoped>
.nuxt-link {
  text-decoration: none;
  &:hover, &:active {
    .card-menu-active {
      transition: all 100ms ease-in;
      border: 1px solid #f15921;
      .icon {
        background-color: #f15921;
      }
      @media screen and (max-width: 960px){
        border: none;
      }
    }
    .card-menu-inactive {
      transition: all 100ms ease-in;
      border: 1px solid grey;
      .icon {
        background-color: grey;
      }
      @media screen and (max-width: 960px){
        border: none;
      }
    }
    .open-button-active {
      transition: all 100ms ease-in;
      background: #f15921;
      button{
        color: #F9F9F9;
      }
    }
    .open-button-inactive {
      transition: all 100ms ease-in;
      background: grey;
      button{
        color: #F9F9F9;
      }
    }
  }
}
.card-menu-active {
  /* Surface */
  background: #ffffff;
  height: 165px;
  /* Primary */
  //
  border: 1px solid #e5e9f5;
  box-shadow: 6px 7px 16px rgba(193, 185, 185, 0.2);
  border-radius: 8px;
  padding: 16px;
  @media screen and (max-width: 960px) {
    border: unset;
    box-shadow: unset;
    border-radius: unset;
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    @media screen and (max-width: 960px) {
      width: 50px;
    }
    @media screen and (max-width: 480px){
      width: 40px;
    }
    // background-color: #f15921;
    background-color: #f7931d;
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
    @media screen and (max-width: 480px){
      font-size: 10px;
    }
  }

  // &:hover{
  //   transition: all 100ms ease-in;
  //   border: 1px solid #f15921;
  //   .icon {
  //     background-color: #f15921;
  //   }
  //   .open-button {
  //     background: #f15921;
  //   }
  // }
}
.card-menu-inactive {
  /* Surface */
  background: #ffffff;
  height: 165px;
  /* Primary */
  //
  border: 1px solid #e5e9f5;
  box-shadow: 6px 7px 16px rgba(193, 185, 185, 0.2);
  border-radius: 8px;
  padding: 16px;
  @media screen and (max-width: 960px) {
    border: unset;
    box-shadow: unset;
    border-radius: unset;
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    @media screen and (max-width: 960px) {
      width: 50px;
    }
    @media screen and (max-width: 480px){
      width: 40px;
    }
    // background-color: #f15921;
    background-color: #f7931d;
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
    @media screen and (max-width: 480px){
      font-size: 10px;
    }
  }

  // &:hover{
  //   transition: all 100ms ease-in;
  //   border: 1px solid #f15921;
  //   .icon {
  //     background-color: #f15921;
  //   }
  //   .open-button {
  //     background: #f15921;
  //   }
  // }
}
.open-button-active {
  @media screen and (max-width: 960px) {
    display: none;
  }
  // background: #f15921;
  background: #e5e9f5;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */
  /* light Background */
  // color: #f9f9f9;
  color: #767676;
  border-radius: 0 0 8px 8px;
  // padding: ;
  top: -35.5px;
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

    color: #767676;
    ::v-deep .v-btn__content {
      justify-content: space-between;
    }
  }
}
.open-button-inactive {
  @media screen and (max-width: 960px) {
    display: none;
  }
  // background: #f15921;
  background: #e5e9f5;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */
  /* light Background */
  // color: #f9f9f9;
  color: #767676;
  border-radius: 0 0 8px 8px;
  // padding: ;
  top: -35.5px;
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

    color: #767676;
    ::v-deep .v-btn__content {
      justify-content: space-between;
    }
  }
}
</style>
