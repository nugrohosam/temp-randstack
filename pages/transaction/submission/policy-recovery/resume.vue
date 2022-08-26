<template>
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
        <p class="data-title mb-2">Due Date Premium</p>
        <p class="data-value">JHON DOE</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Informasi Virtual Account</p>
        <p class="data-value">123123</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <!-- <p class="data-title mb-1">Jenis dan Dana Investasi yang dimiliki</p> -->
        <template>
          <v-data-table
            :headers="table.headers"
            :items="table.items"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            mobile-breakpoint="480"
            hide-default-footer
            @page-count="pageCount = $event"
          >
            <template v-slot:item.product_status="{ item }">
              <b>{{ item.product_status }}</b>
            </template>
          </v-data-table>
        </template>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Lihat Foto Selfie dengan KTP</p>
        <button
          class="btn btn-primary-outlined"
          @click.prevent="addInvestment()"
        >
          Lihat Foto Selfie dengan KTP
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="term1"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya menyetujui transaksi dan kebenaran data yang disampaikan.
          <a class="bni-primary no-border" href="">Baca selengkapnya</a>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="term2"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya <b>tertanggung</b> telah mengisi
          <b>Health questionnaire</b> dengan benar dan tanpa paksaan, apabila
          dikemudian hari ditemukan kesalahan pengisian maka saya siap
          menanggung segala risiko dan akibatnya
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="term3"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya <b>pemegang polis</b> telah mengisi
          <b>Health questionnaire</b> dengan benar dan tanpa paksaan, apabila
          dikemudian hari ditemukan kesalahan pengisian maka saya siap
          menanggung segala risiko dan akibatnya
        </p>
      </div>
    </div>
     <div class="row">
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar d-flex rounded-lg">
            <info-icon class="ic-primary mr-2 "></info-icon>
            Pemulihan polis hanya berlaku jika usia dibawah atau sama dengan 2 tahun sejak tanggal <b>&nbsp; lapsed date</b>
          </div>
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
    <NuxtChild />
  </div>
</template>
<script>
import { InfoIcon } from "vue-feather-icons";
export default {
  name: "investment-fund-allocation-change-resume",
  components: {
    InfoIcon
  },

  data() {
    return {
      term1: "",
      term2: "",
      term3: "",
      modal: {
        message: "",
        show: false,
        button: {
          text: "Ok",
          redirect_link: "./thankyou",
          redirect_type: "spa",
        },
      },
      table: {
        headers: [
          {
            text: "Nama Produk",
            value: "product_name",
          },
          {
            text: "Uang Pertangguhan/Benefit",
            value: "benefit",
          },
          {
            text: "Premium",
            value: "premium",
          },

          {
            text: "Nama Tertanggung",
            value: "insured_name",
          },
          {
            text: "Status Produk",
            value: "product_status",
          },
          {
            text: "Premi Terhutang",
            value: "indebted",
          },
          {
            text: "Jenis produk",
            value: "product_type",
          },
          {
            text: "Lapsed Date",
            value: "lapsed_date",
          },
        ],
        items: [
          {
            id: 1,
            product_name: "BNI LIFE MULTI PLAN PRO",
            benefit: 100,
            premium: 10000,
            start_date: "07/06/2021",
            insured_name: "JOHN DAN",
            product_status: "Active",
            lapsed_date: "07/06/2045",
            product_type: "Utama",
            indebted: 9000000,
            selected: false,
          },
          {
            id: 2,
            product_name: "BNI LIFE MULTI PLAN PRO",
            benefit: 100,
            premium: 10000,
            start_date: "07/06/2021",
            insured_name: "JOHN DAN",
            product_status: "Active",
            lapsed_date: "07/06/2045",
            product_type: "Tambahan",
            indebted: 9000000,
            selected: true,
          },
          {
            id: 3,
            product_name: "BNI LIFE MULTI PLAN PRO",
            benefit: 100,
            premium: 10000,
            start_date: "07/06/2021",
            insured_name: "JOHN DAN",
            product_status: "Active",
            lapsed_date: "07/06/2045",
            product_type: "Tambahan",
            indebted: 9000000,
            selected: false,
          },
          {
            id: 4,
            product_name: "",
            benefit: "",
            premium: "",
            start_date: "",
            insured_name: "",
            product_status: "Total",
            lapsed_date: "",
            product_type: "",
            indebted: 2400000,
            selected: false,
          },
        ],
      },
    };
  },
  methods: {
    submit: async function () {
      // patch action
      this.$router.push({path: "./thankyou"});
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-save {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 150px;
  justify-content: center;
}
</style>
