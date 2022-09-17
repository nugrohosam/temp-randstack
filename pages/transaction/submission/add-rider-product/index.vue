<template>
  <div>
    <div v-show="showMe">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyHolder.person.firstName }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Polis</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyNumber }}
          </p>
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
              :items="
                my_policy ? (my_policy.policyWithCode.coverages.length > 0
                  ? my_policy.policyWithCode.coverages
                  : []) : []
              "
              mobile-breakpoint="480"
              hide-default-footer
              item-key="itemId"
              class="elevation-1"
            >
              <template v-slot:item.nextPremium.sumAssured="{ item }">
                {{
                  $convertCurrency(item ? item.nextPremium.sumAssured : "")
                }}
              </template>
              <template v-slot:item.issueDate="{ item }">
                {{ item ? $moment(item.issueDate).format("DD/MM/Y") : "" }}
              </template>
              <template v-slot:item.lifeInsured.insured.person="{ item }">
                {{
                  item
                    ? $isNullWithSpace(
                        item.lifeInsured.insured.person.firstName
                      ) +
                      $isNullWithSpace(
                        item.lifeInsured.insured.person.midName
                      ) +
                      $isNullWithSpace(
                        item.lifeInsured.insured.person.lastName
                      )
                    : ""
                }}
              </template>
            </v-data-table>
          </template>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Rider yang Dipilih *</p>
          <v-select
            :items="rider_types"
            v-model="rider_choosen"
            dense
            outlined
            class="rider_type_option"
          ></v-select>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Rider Plan *</p>
          <v-select
            :items="rider_plan_types"
            v-model="rider_plan_choosen"
            dense
            outlined
            class="rider_type_option"
          ></v-select>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">KTP Pemegang Polis</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="addrider()"
          >
            Unggah KTP
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="addrider()"
          >
            Unggah Foto Selfie dengan KTP
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Alasan</p>
          <v-select
            :items="problems_type"
            dense
            outlined
            class="rider_type_option"
          ></v-select>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 col-sm-12">
          <div class="message-bar d-flex rounded-lg">
            <info-icon class="ic-primary mr-2 "></info-icon>
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
  </div>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "add-rider",
  components: {
    SaveIcon,
    InfoIcon,
  },
  computed: {
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  mounted() {
    this.getData();
    if ($nuxt.$route.name != "transaction-submission-add-rider-product") {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
    }
  },
  beforeMount() {
    if (this.myPolicy.policyWithCode.riskStatus != 1) {
      this.modal.show = true;
      this.modal.message =
        "Transaksi yang dipilih tidak dapat dilakukan, untuk informasi lebih lanjut silahkan menghubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id";
    }
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
      my_policy: null,
      showMe: true,
      selected: [],
      rider_types: [],
      rider_choosen: [],
      rider_plan_types: [],
      rider_plan_choosen: [],
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
      data_riders: [
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
      table: {
        headers: [
          {
            text: "Nama Produk",
            align: "center",
            value: "productName",
          },
          {
            text: "Uang Pertangguhan/Benefit",
            align: "center",
            value: "nextPremium.sumAssured",
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
            text: "Jenis produk",
            value: "productType",
          },
        ]
      },
      form: {
        coverages_selected: [],
        ktp_selfie: null,
        reason_selected: null,
      },
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      limitPages: [5, 10, 15, 20, 25],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name != "transaction-submission-add-rider-fund") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
    getData: async function () {
      let data = this.myPolicy;
      let productIds = [],
        products = [];
      data.policyWithCode.coverages = data.policyWithCode.coverages.filter(
        (coverage) => coverage.riskStatus == 1
      );
      data.policyWithCode.coverages.forEach((v, i) => {
        productIds.push(v.productId);
        data.policyWithCode.coverages[i].lifeInsured = v.lifeInsured1;
        data.policyWithCode.coverages[i].productName = "";
        data.policyWithCode.coverages[i].isSelectable = true;
        data.policyWithCode.coverages[i].productType =
          data.policyWithCode.coverages[i].masterProduct == null
            ? "Utama"
            : "Tambahan";
        data.policyWithCode.coverages[i].productStatus = "Aktif";
      });
      products = await this.$store.dispatch(
        "submission_transaction/getProducts",
        productIds.join()
      );
      data.policyWithCode.coverages.forEach((v, i) => {
        v.productName = products.filter(
          (product) => product.id == v.productId
        )[0].name;
      });
      data.policyWithCode.coverages = [
        data.policyWithCode.coverages.find((cov) => cov.masterProduct == null),
        ...data.policyWithCode.coverages.filter(
          (cov) => cov.masterProduct != null
        ),
      ];
      this.my_policy = data;
      this.isLoading = false;
    },
    save: async function () {
      // patch to action
      this.$router.push({ path: "./add-rider-product/resume" });
    },
    addrider: async function () {},
    selectData: function (item) {
      console.log(item);
    },
  },
};
</script>
<style lang="scss" scoped>
.rider_type_option {
  max-width: 250px !important;
}
.rider_plan_type_option {
  max-width: 250px !important;
}
.btn-add-rider {
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
