<template>
  <div>
    <div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">JHON DOE</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Polis</p>
          <p class="data-value">BLPM20113145</p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Identitas yang diubah</p>
          <p class="data-value">Pemegang Polis</p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Email Address</p>
          <div class="d-flex justify-sm-space-between">
            <p class="data-value">johndoe@mail.com</p>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- Search -->
        <div class="col-12">
          <template>
            <div class="page-body">
              <!-- Transaction Status Menu -->
              <div class="row">
                <div class="col-12">
                  <div class="d-flex justify-sm-space-between">
                    <p><b>Alamat</b></p>

                  </div>
                  <br /><br />

                  <div class="row">
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Provinsi</p>
                      <p class="data-value">DKI JAKARTA</p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Kota</p>
                      <p class="data-value">JAKARTA TIMUR</p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Kecamatan</p>
                      <p class="data-value">PULO GADUNG</p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Kelurahan</p>
                      <p class="data-value">RAWAMANGUN</p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Alamat</p>
                      <p class="data-value">Jl Jenderal Ahmad Yani By Pass</p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Blok</p>
                      <p class="data-value">F66</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="col-12">
          <template>
            <div class="page-body">
              <!-- Transaction Status Menu -->
              <div class="row">
                <div class="col-12">
                  <div class="d-flex justify-sm-space-between">
                    <p><b>Nomor Telepon</b></p>

                  </div>
                  <br /><br />
                  <div class="row">
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Nomor Telepon Saat Ini 1</p>
                      <p class="data-value">08123456789</p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Nomor Telepon Saat Ini 2</p>
                      <p class="data-value">081987654321</p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Normor Telepon Kantor Saat Ini</p>
                      <p class="data-value">482657</p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">
                        Normor Telepon Lain Kantor Saat Ini
                      </p>
                      <p class="data-value">482112</p>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                      <p class="data-title">Nomor Telepon Rumah Saat Ini</p>
                      <p class="data-value">482111</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="upload()"
          >
            Lihat
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar rounded-lg">
            <p><b>Perhatian !</b></p>
            <ul>
              <li>Polis tidak dalam masa Cuti Premi Otomatis</li>
              <li>Polis tidak dalam masa Must Pay Period</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya telah membaca dan menyetujui seluruh ketentuan transaksi yang
          diajukan dan resume pengajuan serta memahami risiko atas keputusan
          yang saya buat.
          <a class="bni-primary no-border" href="">Baca selengkapnya</a>
        </p>
      </div>
    </div>
      <div class="row">
        <div class="col-12">
          <button
            class="btn btn-primary btn-save float-right"
            @click.prevent="submit()"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <NuxtChild />
  </div>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "investment-fund-allocation-change",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    console.log($nuxt.$route.name);
    if ($nuxt.$route.name != "transaction-submission-change-payer") {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  data() {
    return {
      accepted: false,
      investment_types: ["UANG SEKOLAH", "ASURANSI"],
    };
  },
  watch: {
    $route(to, from) {
      if (
        to.name != "transaction-submission-change-payer"
      ) {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
    submit: async function () {
      // patch to action
      this.$router.push({ path: "./payer/resume" });
    },
    upload: async function(){

    }
  },
};
</script>
