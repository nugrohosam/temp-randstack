<template>
  <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
    <slot></slot>
    <span class="text-error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  props: ["name", "rules"],
};
</script>
