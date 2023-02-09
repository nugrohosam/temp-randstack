<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <Menu
            :isActive="true"
            :name="'Informasi Customer'"
            :icon="'menu/perubahan-data-sub-menu.svg'"
            :link="'./change/customer-info'"
          />
          <Menu
            :isActive="true"
            :name="'Pekerjaan Tertanggung'"
            :icon="'menu/perubahan-pekerjaan-tertanggung.svg'"
            :link="'./change/occupation'"
          />
          <Menu
            :isActive="true"
            :name="'Tanggal Lahir dan Jenis Kelamin Tertanggung'"
            :icon="'menu/perubahan-jenis-kelamin.svg'"
            :link="'./change/birth-and-gender'"
          />
          <Menu
            :isActive="true"
            :name="'Ahli Waris'"
            :icon="'menu/perubahan-ahli-waris.svg'"
            :link="'./change/beneficiary'"
          />
          <Menu
            :isActive="false"
            :name="'Pembayar'"
            :icon="'menu/pembayar.svg'"
            :link="'./change/payer'"
          />
          <Menu
            :isActive="false"
            :name="'Data Tertanggung'"
            :icon="'menu/data-tertanggung.svg'"
            :link="'./coming-soon'"
          />
          <Menu
            :isActive="false"
            :name="'Pemegang Polis'"
            :icon="'menu/pemegang-polis.svg'"
            :link="'./coming-soon'"
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
