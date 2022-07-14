<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="menu-grid">
          <Menu
            :name="'Pembayaran'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./payment-policy-loan'"
          />
          <Menu
            :name="'Pengajuan'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./new-policy-loan'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "policy-loan",
  data() {
    return {};
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
