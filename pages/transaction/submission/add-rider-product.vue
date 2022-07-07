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
          <p class="data-title">Nomor Rekening Saat Ini</p>
          <p class="data-value">BLPM20113145</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemilik Nomor Rekening Manfaat Saat Ini</p>
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
          <p class="data-title mb-2">Tanggal Pengiriman Polis</p>
          <p class="data-value">04/08/2020</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <p class="data-title">Jenis dan Dana Investasi yang dimiliki</p>
        </div>
        <div class="col-12">
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
              <template v-slot:item.no="{ item, index }">
                {{ index + 1 }}
              </template>
            </v-data-table>
          </template>

        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Jenis Dana Investasi yang Dipilih *</p>
          <v-select
            :items="investment_types"
            dense
            outlined
            class="investment_type_option"
          ></v-select>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Amount Top Up (Rp)</p>
          <div class="form-input">
            <input type="text" class="outlined" placeholder="200.000" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <button
            class="btn btn-primary-outlined w-100 btn-add-investment"
            @click.prevent="addInvestment()"
          >
            Tambah
          </button>
        </div>
      </div>
      <br />
      <v-divider></v-divider>
      <br />
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-value">Data Pengajuan Top Up Sekaligus</p>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">No</th>
                  <th class="text-left">Nama Fund</th>
                  <th class="text-left">Nilai Top Up</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data_investments" :key="item.name">
                  <template v-if="i < data_investments.length - 1">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.topup_value }}</td>
                    <td>Edit | Hapus</td>
                  </template>
                  <template v-else>
                    <td></td>
                    <td>
                      <b>{{ item.fund_name }}</b>
                    </td>
                    <td>
                      <b>{{ item.topup_value }}</b>
                    </td>
                    <td></td>
                  </template>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">
            Unggah Bukti Transfer (Jika sudah melakukan transfer)
          </p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="addInvestment()"
          >
            Unggah Bukti Transfer
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Unggah selfie dan KTP</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="addInvestment()"
          >
            Unggah Selfie + KTP
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button
            class="btn btn-primary btn-save float-right"
            @click.prevent="saveInvestment()"
          >
            <save-icon></save-icon> Simpan
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
  name: "add-investment-fund",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    console.log($nuxt.$route.name);
    if ($nuxt.$route.name != "transaction-submission-add-rider-product") {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  data() {
    return {
      showMe: true,
      items: ["321321321 - BNI", "321321322 - BNI"],
      investment_types: ["UANG SEKOLAH", "ASURANSI"],
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
            value: "no",
          },
          {
            text: "Nama Produk",
            value: "type",
          },
          {
            text: "Uang Pertangguhan/Benefit",
            value: "currency",
          },
          {
            text: "Premium",
            value: "unit_total",
          },
          {
            text: "Masa mulai produk",
            value: "unit_price",
          },
          {
            text: "Nama Tertanggung",
            value: "nab_date",
          },
          {
            text: "Status Produk",
            value: "total_investment",
          },
          {
            text: "Akhir masa produk",
            value: "total_investment",
          },
          {
            text: "Jenis produk",
            value: "total_investment",
          },
        ],
        items: [
          {
            product_name: "BNI LIFE MULTI PLAN PRO",
            benefit: 100,
            premium: 10000,
            start_date: "07/06/2021",
            insured_name: "JOHN DAN",
            product_status: "Active",
            end_date: "07/06/2045",
            product_type: "Utama",
          },
          {
            product_name: "BNI LIFE MULTI PLAN PRO",
            benefit: 100,
            premium: 10000,
            start_date: "07/06/2021",
            insured_name: "JOHN DAN",
            product_status: "Active",
            end_date: "07/06/2045",
            product_type: "Tambahan",
          },
          {
            product_name: "BNI LIFE MULTI PLAN PRO",
            benefit: 100,
            premium: 10000,
            start_date: "07/06/2021",
            insured_name: "JOHN DAN",
            product_status: "Active",
            end_date: "07/06/2045",
            product_type: "Tambahan",
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
    saveInvestment: async function () {
      // patch to action
      this.$router.push({ path: "./add-investment-fund/resume" });
    },
    addInvestment: async function () {},
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
