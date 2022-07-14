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
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Due Date Premium</p>
          <p class="data-value">JHON DOE</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Informasi Virtual Account</p>
          <v-select
            :items="virtual_accounts"
            dense
            outlined
          ></v-select>
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
              <template v-slot:item.id="{ item, index }">
                <v-simple-checkbox v-model="item.selected" v-if="index < table.items.length - 1"></v-simple-checkbox>
              </template>
              <template v-slot:item.product_status="{ item }">
                <b>{{item.product_status}}</b>
              </template>

            </v-data-table>
          </template>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="addInvestment()"
          >
            Unggah Foto Selfie dengan KTP
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar d-flex rounded-lg">
            <info-icon class="ic-primary mr-2 "></info-icon>
            Pemulihan polis hanya berlaku jika usia dibawah atau sama dengan 2 tahun sejak tanggal  <b>&nbsp; lapsed date</b>
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
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "add-investment-fund",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    console.log($nuxt.$route.name);
    if ($nuxt.$route.name != "transaction-submission-policy-recovery") {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  data() {
    return {
      showMe: true,
      selected: [],
      items: ["321321321 - BNI", "321321322 - BNI"],
      virtual_accounts: [
        "321321321 - BNI",
        "921321230 - MANDIRI",
        "132432456 - BCA",
        "111222333 - BRI",
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
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      limitPages: [5, 10, 15, 20, 25],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-policy-recovery") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
    save: async function () {
      // patch to action
      this.$router.push({ path: "./policy-recovery/resume" });
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
