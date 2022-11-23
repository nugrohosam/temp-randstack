<!-- Please remove this file from your project -->
<template>
  <NuxtLink :to="link">
    <div
      class="col-span-1 flex flex-col rounded-xl bg-white text-center h-full"
      :class="!isActive ? 'bg-gray-50' : 'drop-shadow-lg'"
      style="min-height: 160px"
    >
      <div class="flex flex-1 flex-col p-4 lg:p-8">
        <img
          class="mx-auto h-12 w-12 lg:h-24 lg:w-24 flex-shrink-0 rounded-full"
          :src="require(`@/assets/icon/${icon}`)"
          alt=""
        />
        <h3
          class="mt-6 text-xs lg:text-lg font-bold"
          :class="isActive ? 'active-text' : 'text-gray-400'"
        >
          {{ name }}
        </h3>
      </div>
    </div>
  </NuxtLink>
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

<style scoped>
.active-text {
  color: #006884;
}
</style>
