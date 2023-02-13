<template>
  <div>
    <div
      class="p-8 md:p-8 lg:rounded-t-2xl relative"
      style="background: linear-gradient(90deg, #f7931d 48.44%, #fec34f 97.15%)"
    >
      <img
        src="~/assets/svg/wave-header.svg"
        class="hidden lg:block lg:absolute lg:right-0 lg:top-0"
      />
      <img
        src="~/assets/svg/wave-header-mobile.svg"
        class="absolute right-0 top-0 lg:hidden"
        style="height: 100%"
      />
      <h2 class="text-2xl text-white font-weight-bold">
        {{ vuexCurrentHeaderTitle.title }}
      </h2>
    </div>
    <div class="p-4 md:p-8 lg:rounded-b-2xl border">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      vuexCurrentHeaderTitle: "submission_transaction/getCurrentHeaderTitle",
    }),
  },
};
</script>
