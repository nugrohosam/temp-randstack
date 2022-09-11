<template>
  <div>
    <!-- <div v-show="showMe">
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
          <p class="data-title mb-2">Nomor Rekening Manfaat</p>
          <p class="data-value">BLPM20113145</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Rekening</p>
          <p class="data-value">JOHN DOE</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank</p>
          <p class="data-value">BNI</p>
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
          <p class="data-title mb-1">Nilai Penarikan</p>
          <div class="form-input">
            <input type="text" class="outlined" placeholder="200.xxx.xxx" />
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
          <p class="data-value">Data Pengajuan Penarikan Sebagian Dana Investasi</p>
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
          <p class="data-title mb-2">Unggah selfie dan KTP</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="add()"
          >
            Unggah Selfie + KTP
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button
            class="btn btn-primary btn-save float-right"
            @click.prevent="save()"
          >
            <save-icon></save-icon> Simpan
          </button>
        </div>
      </div>
    </div> -->
    <NuxtChild />
    <ModalMessage
      :message="modal.message"
      :show="modal.show"
      :button="modal.button"
      @closeModal="modal.show = false"
    />
  </div>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "widthdrawal-partial-investment-fund",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    console.log($nuxt.$route.name);
    if (
      $nuxt.$route.name !=
      "transaction-submission-widthdrawal-partial-investment-fund"
    ) {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  beforeMount() {
    this.modal.show = true;
    this.modal.message = "Menu yang anda pilih masih dalam tahap pengembangan";
  },
  data() {
    return {
      modal: {
        message: "",
        show: false,
        button: {
          text: "Tutup",
          redirect_link: "/transaction/submission",
          redirect_type: "spa",
        },
      },
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
            text: "No",
            align: "start",
            value: "no",
          },
          {
            text: "Jenis Dana Investasi",
            value: "type",
          },
          {
            text: "Mata Uang",
            value: "currency",
          },
          {
            text: "Jumlah Unit",
            value: "unit_total",
          },
          {
            text: "Harga Unit",
            value: "unit_price",
          },
          {
            text: "Tanggal NAB",
            value: "nab_date",
          },
          {
            text: "Total Investasi",
            value: "total_investment",
          },
        ],
        items: [
          {
            type: "BNI LIFE MAXIMA",
            currency: "Rp",
            unit_total: 100,
            unit_price: 100000,
            nab_date: "10/10/2010",
            total_investment: 1000000,
          },
          {
            type: "BNI LIFE ENDAVO",
            currency: "Rp",
            unit_total: 100,
            unit_price: 100000,
            nab_date: "10/10/2010",
            total_investment: 1000000,
          },
          {
            type: "BNI LIFE X",
            currency: "Rp",
            unit_total: 100,
            unit_price: 100000,
            nab_date: "10/10/2010",
            total_investment: 1000000,
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
    save: async function () {
      // patch to action
      this.$router.push({ path: "./widthdrawal-partial-investment-fund/resume" });
    },
    add: async function () {},
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
