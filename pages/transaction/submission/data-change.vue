<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="menu-grid">
          <Menu
            :name="'Pembayar'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./change/payer'"
          />
          <Menu
            :name="'Data Tertanggung'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./new-policy-loan'"
          />
          <Menu
            :name="'Pemegang Polis'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./new-policy-loan'"
          />
          <Menu
            :name="'Ahli Waris'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./new-policy-loan'"
          />
          <Menu
            :name="'Tanggal Lahir dan Jenis Kelamin Tertanggung'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./new-policy-loan'"
          />
          <Menu
            :name="'Pekerjaan Tertanggung'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./new-policy-loan'"
          />
          <Menu
            :name="'Informasi Customer'"
            :icon="'ic_cuti_premi.svg'"
            :link="'./change/customer-info'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "data-change",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 2fr);
  grid-column-gap: 16px;
  grid-row-gap: 40px;
  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 0px;
  }
}
</style>
