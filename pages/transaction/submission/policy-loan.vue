<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
    <Menu
      v-for="(item, index) in menus"
      :key="index"
      v-bind="item"
    />
  </div>
</template>

<script>
export default {
  name: "policy-loan",
  data() {
    return {
      menus: [
        {
          name: 'Pembayaran',
          icon: 'menu/pembayaran-pinjaman-polis.svg',
          link: './payment-policy-loan',
          isActive: true
        },
        {
          name: 'Pengajuan',
          icon: 'menu/pengajuan-pinjaman-polis.svg',
          link: './request-policy-loan',
          isActive: true
        }
      ]
    };
  },
};
</script>
<style lang="scss" scoped>
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 2fr);
    grid-column-gap: 16px;
    grid-row-gap: 40px;
    @media screen and (max-width: 960px) {
      grid-template-columns: repeat(3, 1fr);
      grid-row-gap: 0px;
    }
  }
</style>
