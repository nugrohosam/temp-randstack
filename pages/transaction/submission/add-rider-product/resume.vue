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
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Nomor Rekening Saat Ini</p>
        <p class="data-value">BLPM20113145</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">
          Nama Pemilik Nomor Rekening Manfaat Saat Ini
        </p>
        <p class="data-value">JHON DOE</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nomor Polis</p>
        <p class="data-value">BLPM20113145</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Cabang Bank Saat Ini</p>
        <p class="data-value">BLPM20113145</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tanggal Penerimaan Polis</p>
        <p class="data-value">04/08/2020</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="data-title mb-1">Jenis dan Dana Investasi yang dimiliki</p>
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
            <template v-slot:item.id="{ item }">
              <v-simple-checkbox v-model="item.selected"></v-simple-checkbox>
            </template>
          </v-data-table>
        </template>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-1">Data Pengajuan Top Up Sekaligus</p>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Fund</th>
                <th class="text-left">Nilai Top Up</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data_investments" :key="item.name">
                <template v-if="i < data_investments.length - 1">
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.fund_name }}</td>
                  <td>{{ item.topup_value }}</td>
                </template>
                <template v-else>
                  <td></td>
                  <td>
                    <b>{{ item.fund_name }}</b>
                  </td>
                  <td>
                    <b>{{ item.topup_value }}</b>
                  </td>
                </template>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-1">Estimasi Nilai Tunai</p>
        <h3>Rp 16.000.000</h3>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-1">Estimasi Pengembalian Dana COP</p>
        <h3>Rp 4.000.000</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">KTP Pemegang Polis</p>
        <button
          class="btn btn-primary-outlined"
          @click.prevent="addInvestment()"
        >
          Lihat KTP
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
        <button
          class="btn btn-primary-outlined"
          @click.prevent="addInvestment()"
        >
          Lihat Foto Selfie + KTP
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-1">Alasan</p>
        <p class="data-value ">Alasan Keluarga</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="ex4"
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
      <div class="col-12">
        <button
          class="btn btn-primary btn-save float-right"
          @click.prevent="submit()"
        >
          <save-icon></save-icon> Submit
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "add-investment-fund",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {

  },
  data() {
    return {
      showMe: true,
      selected: [],
      items: ["321321321 - BNI", "321321322 - BNI"],
      problems_type: [
        "Masalah Pengiriman Polis",
        "Manfaat Produk",
        "Penjelasan yang kurang jelas oleh pemasar",
        "Alasan Keluarga",
        "Kesulitan Finansial / Butuh Uang",
        "Untuk SPAJ Baru",
        "Memiliki Banyak Asuransi",
      ],
      data_investments: [
        {
          id: 1,
          fund_name: "DANA MAKSIMA",
          topup_value: 1000000,
        },
        {
          id: 2,
          fund_name: "DANA CEMERLANG",
          topup_value: 2000000,
        },
        {
          id: "",
          fund_name: "Total",
          topup_value: 3000000,
        },
      ],
      table: {
        headers: [
          {
            text: "Pilihan",
            align: "start",
            value: "id",
          },
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
            text: "Masa mulai produk",
            value: "start_date",
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
            text: "Akhir masa produk",
            value: "end_date",
          },
          {
            text: "Jenis produk",
            value: "product_type",
          },
        ],
        items: [
          {
            id: 2,
            product_name: "BNI LIFE MULTI PLAN PRO",
            benefit: 100,
            premium: 10000,
            start_date: "07/06/2021",
            insured_name: "JOHN DAN",
            product_status: "Active",
            end_date: "07/06/2045",
            product_type: "Tambahan",
            selected: true,
          },

        ],
      },
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      limitPages: [5, 10, 15, 20, 25],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-add-investment-fund") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
    submit: async function () {
      // patch to action
      this.$router.push({ path: "./thankyou" });
    },
    addInvestment: async function () {},
    selectData: function (item) {
      console.log(item);
    },
  },
};
</script>
<style lang="scss" scoped>
.investment_type_option {
  max-width: 250px !important;
}
.btn-add-investment {
  max-width: 250px !important;
}
.btn-save {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 150px;
  justify-content: center;
}
</style>
