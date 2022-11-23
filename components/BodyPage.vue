<template>
  <div>
    <div
      class="p-8 md:p-8 lg:rounded-t-2xl relative"
      style="background: linear-gradient(90deg, #f7931d 48.44%, #fec34f 97.15%)"
    >
      <img src="~/assets/svg/ware-header.svg" class="absolute right-0 top-0" />
      <h2 class="text-2xl text-white font-weight-bold">{{ title }}</h2>
    </div>
    <div class="p-4 md:p-8 lg:rounded-b-2xl border">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
  },
};
</script>
