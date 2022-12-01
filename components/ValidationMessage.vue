<template>
  <div class="row" v-if="validationMessage.length > 0">
    <div class="col-lg-8 col-sm-12">
      <div class="validation-bar d-flex rounded-lg">
        <info-icon class="ic-primary mr-2"></info-icon>
        <ul class="list-disc">
          <li v-for="(value, key) in validationMessage" :key="key">
            <small>{{ value }}</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    validationMessage: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
