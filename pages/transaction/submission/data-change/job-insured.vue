<style lang="scss" scoped>
.page-body {
  padding: 0 !important;
}
</style>
<template>
  <div>
    <div v-show="showMe">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">JHON DOE</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Polis</p>
          <p class="data-value">BLPM20113145</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Tertanggung</p>
          <p class="data-value">BLPM20113145</p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Profesi Saat Ini</p>
          <p class="data-value">SWASTA</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Jabatan Saat Ini</p>
          <p class="data-value">STAFF</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Perusahaan Saat Ini</p>
          <p class="data-value">BCA</p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Profesi Baru</p>
          <v-select :items="jobs_list" dense outlined></v-select>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Jabatan</p>
          <div class="form-input">
            <input type="text" class="outlined" placeholder="200.000" />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Nama Perusahaan</p>
          <div class="form-input">
            <input type="text" class="outlined" placeholder="200.000" />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Industri</p>
          <v-select :items="industry_names" dense outlined></v-select>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
          <button class="btn btn-primary-outlined">
            Unggah Foto Selfie dengan KTP
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar rounded-lg">
            <p><b>Perhatian !</b></p>
            <ul>
              <li>Pastikan perubahaan pekerjaan sudah di isi dengan benar.</li>
              <li>Perubahan pekerjaan diisi oleh tertanggung.</li>
              <li>Premi dapat berubah sesuai dengan jenis pekerjaan.</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button
            class="btn btn-primary btn-save float-right"
            @click.prevent="save()"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
    <NuxtChild />
  </div>
</template>
<script>
export default {
  name: "new-policy-loan",
  data() {
    return {
      showMe: true,
      jobs_list: ["AKUNTAN"],
      industry_names: ["PENAMAS"],
    };
  },
  mounted() {
    console.log($nuxt.$route.name);
    if (
      $nuxt.$route.name != "transaction-submission-data-change-menu-job-insured"
    ) {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-data-change-menu-job-insured") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },

  methods: {
    save: async function () {
      // patch to action
      this.$router.push({ path: "./new-policy-loan/resume" });
    },
  },
};
</script>
