<template>
  <div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Pemegang Polis</p>
        <p class="data-value">{{myPolicy.policyWithCode.policyHolder.person.firstName}}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nomor Polis</p>
        <p class="data-value">{{myPolicy.policyWithCode.policyHolder.policyNumber}}</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Nomor Rekening Saat Ini</p>
        <!-- <p class="data-value">BLPM20113145</p> -->
        <p class="data-value">-</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">
          Nama Pemilik Nomor Rekening Manfaat Saat Ini
        </p>
        <!-- <p class="data-value">JHON DOE</p> -->
        <p class="data-value">-</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nomor Polis</p>
        <!-- <p class="data-value">BLPM20113145</p> -->
        <p class="data-value">-</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Cabang Bank Saat Ini</p>
        <!-- <p class="data-value">BLPM20113145</p> -->
        <p class="data-value">-</p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Tanggal Pengiriman Polis</p>
        <!-- <p class="data-value">04/08/2020</p> -->
        <p class="data-value">-</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="data-title mb-1">Jenis dan Dana Investasi yang dimiliki</p>
        <template>
          <v-data-table
            :headers="table.headers"
            :items="coveragesSelected"
            mobile-breakpoint="480"
            hide-default-footer
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
              {{ $convertCurrency(item.nextPremium.sumAssured) }}
            </template>
            <template v-slot:item.currentPremium.totalPremAf="{ item }">
              {{ $convertCurrency(item.currentPremium.totalPremAf) }}
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
    </div> -->
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">KTP Pemegang Polis</p>
        <button
          class="btn btn-primary-outlined"
          @click.prevent="showKtpPreview"
        >
          Lihat KTP
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Lihat Foto Selfie dengan KTP</p>
        <button
          class="btn btn-primary-outlined"
          @click.prevent="showSelfieKtpPreview"
        >
          Lihat Foto Selfie + KTP
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-1">Alasan</p>
        <p class="data-value">{{ reasonSelected[0].name }}</p>
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
          <save-icon></save-icon> Submit
        </button>
      </div>
    </div>
    <ModalImagePreview
      :src="image_preview.src"
      :show="image_preview.show"
      @closeImagePreview="image_preview.show = false"
    />
  </div>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "cancellation-main-product-resume",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
  },
  data() {
    return {
      title: {
        name:'',
        description: '',
      },
      accepted: false,
      showMe: true,
      selected: [],
      image_preview: {
        src: "",
        show: false,
      },
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
      },
    };
  },
  computed: {
    ktpFile() {
      return this.$store.getters["submission_transaction/getKtpFile"];
    },
    selfieKtpFile() {
      return this.$store.getters["submission_transaction/getSelfieKtpFile"];
    },
    coveragesSelected() {
      return this.$store.getters["submission_transaction/getCoveragesSelected"];
    },
    reasonSelected() {
      return this.$store.getters["submission_transaction/getReasonSelected"];
    },
    myPolicy(){
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
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
      const result = await this.$store.dispatch(
        "submission_transaction/submitTransactionProposalSurrender"
      )
      if(result.success == true){
        this.$router.push({ path: "./thankyou" });
      }else{
        // check validation error
      }
    },
    showKtpPreview: function () {
      if (this.ktpFile) {
        this.image_preview.src = URL.createObjectURL(this.ktpFile);
        this.image_preview.show = true;
      }
    },
    showSelfieKtpPreview: function () {
      if (this.selfieKtpFile) {
        this.image_preview.src = URL.createObjectURL(this.selfieKtpFile);
        this.image_preview.show = true;
      }
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
