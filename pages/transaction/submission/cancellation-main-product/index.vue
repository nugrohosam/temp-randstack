<template>
  <div>
    <template v-if="my_policy">
      <div v-show="showMe">
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nama Pemegang Polis</p>
            <p class="data-value">
              {{
                my_policy != null
                  ? my_policy.policyWithCode.policyHolder.person.firstName
                  : ""
              }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nomor Polis</p>
            <p class="data-value">
              {{
                my_policy != null ? my_policy.policyWithCode.policyNumber : ""
              }}
            </p>
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
            <p class="data-title mb-2">Nama Bank Saat Ini</p>
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
          <div class="col-12">
            <p class="data-title mb-1">
              Jenis dan Dana Investasi yang dimiliki
            </p>
            <template>
              <v-data-table
                :headers="table.headers"
                :items="my_policy.policyWithCode.coverages"
                :page.sync="page"
                mobile-breakpoint="480"
                hide-default-footer
                @page-count="pageCount = $event"
              >
                <template v-slot:item.itemId="{ item }">
                  <v-simple-checkbox
                    v-model="item.selected"
                    @input="coverageSelected(item)"
                  ></v-simple-checkbox>
                </template>
                <template v-slot:item.issueDate="{ item }">
                  {{ $moment(item.issueDate).format("DD/MM/Y") }}
                </template>
                <template v-slot:item.nextPremium.sumAssured="{ item }">
                  {{ convertToRupiah(item.nextPremium.sumAssured) }}
                </template>
                <template v-slot:item.currentPremium.totalPremAf="{ item }">
                  {{ convertToRupiah(item.currentPremium.totalPremAf) }}
                </template>
                <template v-slot:item.expiryDate="{ item }">
                  {{ $moment(item.expiryDate).format("DD/MM/Y") }}
                </template>
                <template v-slot:item.lifeInsured.insured.person="{ item }">
                  {{
                    item.lifeInsured.insured.person.firstName
                      ? item.lifeInsured.insured.person.firstName
                      : ""
                  }}
                  {{
                    item.lifeInsured.insured.person.midName
                      ? item.lifeInsured.insured.person.midName
                      : ""
                  }}
                  {{
                    item.lifeInsured.insured.person.lastName
                      ? item.lifeInsured.insured.person.lastName
                      : ""
                  }}
                </template>
              </v-data-table>
            </template>
          </div>
        </div>
        <!-- <div class="row">
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
        </div> -->
        <!-- <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-1">Estimasi Nilai Tunai</p>
            <h3>Rp 16.000.000</h3>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-1">Estimasi Pengembalian Dana COP</p>
            <h3>Rp 4.000.000</h3>
          </div>
        </div> -->
        <div class="row">
          <div class="col-lg-12 col-sm-12">
            <p class="data-title mb-2">KTP Pemegang Polis</p>
            <input
              type="file"
              ref="inputKtpImage"
              v-show="false"
              accept="image/*"
              @change="addKtpImage"
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputKtpImage.click()"
            >
              Unggah KTP
            </button>
            <small>{{ ktpFileName }}</small>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-sm-12">
            <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>

            <input
              type="file"
              ref="inputSelfieKtpImage"
              v-show="false"
              accept="image/*"
              @change="addSelfieKtpImage"
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputSelfieKtpImage.click()"
            >
              Unggah Foto Selfie dengan KTP
            </button>
            <small>{{ selfieKtpFileName }}</small>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-1">Alasan</p>
            <v-select
              :items="problems_type"
              item-text="description"
              item-value="id"
              dense
              outlined
              class="investment_type_option"
              @input="reasonSelected"
            ></v-select>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 col-sm-12">
            <div class="message-bar d-flex rounded-lg">
              <info-icon class="ic-primary mr-2"></info-icon>
              Transaksi ini akan dikenakan biaya
            </div>
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
      </div>
    </template>
    <template v-else>
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <v-progress-circular indeterminate size="64" color="#F15921" width="7">
        </v-progress-circular>
        <p style="color: black">Mohon Tunggu...</p>
      </div>
    </template>
    <NuxtChild />
  </div>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "cancellation-main-product",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    this.myPolicy();
    if (
      $nuxt.$route.name != "transaction-submission-cancellation-main-product"
    ) {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  data() {
    return {
      cancellation_main_product: {
        upload: {
          ktp: {
            file: null,
            name: "",
            preview: "",
          },
          selfie_ktp: {
            file: null,
            name: "",
            preview: "",
          },
        },
      },
      my_policy: null,
      showMe: true,
      selected: [],
      items: ["321321321 - BNI", "321321322 - BNI"],
      problems_type: [
        {
          id: 1,
          description: "Masalah Pengiriman Polis",
        },
        {
          id: 2,
          description: "Manfaat Produk",
        },
        {
          id: 3,
          description: "Penjelasan yang kurang jelas oleh pemasar",
        },
        {
          id: 4,
          description: "Alasan Keluarga",
        },
        {
          id: 5,
          description: "Kesulitan Finansial / Butuh Uang",
        },
        {
          id: 6,
          description: "Untuk SPAJ Baru",
        },
        {
          id: 7,
          description: "Memiliki Banyak Asuransi",
        },
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
      coverages: [],
      coverages_selected: [],
      table: {
        headers: [
          {
            text: "Pilihan",
            align: "start",
            value: "itemId",
          },
          {
            text: "Nama Produk",
            value: "productName",
          },
          {
            text: "Uang Pertangguhan/Benefit",
            value: "nextPremium.sumAssured",
          },
          {
            text: "Premium",
            value: "currentPremium.totalPremAf",
          },
          {
            text: "Masa mulai produk",
            value: "issueDate",
          },
          {
            text: "Nama Tertanggung",
            value: "lifeInsured.insured.person",
          },
          {
            text: "Status Produk",
            value: "product_status",
          },
          {
            text: "Akhir masa produk",
            value: "expiryDate",
          },
          {
            text: "Jenis produk",
            value: "product_type",
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
            end_date: "07/06/2045",
            product_type: "Utama",
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
            end_date: "07/06/2045",
            product_type: "Tambahan",
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
            end_date: "07/06/2045",
            product_type: "Tambahan",
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
      if (to.name != "transaction-submission-cancellation-main-product") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  computed: {
    ktpFileName() {
      return this.$store.getters["submission_transaction/getKtpFileName"];
    },
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
  },
  methods: {
    myPolicy: async function () {
      let data = await this.$store.dispatch(
        "submission_transaction/getMyPolicy"
      );
      this.my_policy = data;
      this.my_policy.policyWithCode.coverages.forEach((v, i) => {
        this.my_policy.policyWithCode.coverages[i].lifeInsured = v.lifeInsured1;
      });
    },
    save: async function () {
      this.$router.push({ path: "./cancellation-main-product/resume" });
    },
    addInvestment: async function () {},
    selectData: function (item) {
      console.log(item);
    },
    convertToRupiah(amount) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
    },
    addKtpImage: function (e) {
      this.$store.commit(
        "submission_transaction/setUploadKtpFile",
        e.target.files[0]
      );
    },
    addSelfieKtpImage: function (e) {
      this.$store.commit(
        "submission_transaction/setUploadSelfieKtpFile",
        e.target.files[0]
      );
    },
    coverageSelected: function (item) {
      if (
        this.coverages_selected.find((items) => items.itemId == item.itemId)
      ) {
        this.coverages_selected = this.coverages_selected.filter(
          (items) => items.itemId !== item.itemId
        );
      } else {
        this.coverages_selected.push(item);
      }
      this.$store.commit(
        "submission_transaction/setCoveragesSelected",
        this.coverages_selected
      );
    },
    reasonSelected: function(id){
      this.$store.commit("submission_transaction/setReasonSelected", this.problems_type.filter(items => items.id == id))
    }
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
