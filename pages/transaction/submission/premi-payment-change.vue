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
          name: 'Masa Pembayaran Premi',
          icon: 'menu/perubahan-masa-pembayaran.svg',
          link: './change-term',
          isActive: true
        },
        {
          name: 'Metode Pembayaran',
          icon: 'menu/pengajuan-pinjaman-polis.svg',
          link: './change-term',
          isActive: false
        },
        {
          name: 'Frekuensi Pembayaran',
          icon: 'menu/perubahan-freq-pembayaran.svg',
          link: './change-payment-freq',
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
