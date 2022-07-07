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
        <p class="data-title">Informasi Virtual Account</p>
        <v-select :items="items" dense outlined></v-select>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
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
      <div class="col-lg-8 col-sm-12">
        <div class="message-bar d-flex">
          <info-icon class="ic-primary mr-2"></info-icon>
          Nilai investasi akan ter topup kedalam fund yang di pilih
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Bukti Transfer</p>
        <button class="btn btn-primary-outlined">Lihat Bukti Transfer</button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Selfie dan KTP</p>
        <button
          class="btn btn-primary-outlined"
          @click.prevent="addInvestment()"
        >
          Lihat Selfie + KTP
        </button>
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
          @click.prevent="submitInvesment()"
        >
          Submit
        </button>
      </div>
    </div>
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
  name: "add-investment-fund-resume",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    console.log($nuxt.$route.name);
  },
  data() {
    return {
      ex4: [
      ],
      items: ["321321321 - BNI", "321321322 - BNI"],
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
      modal: {
        message: "",
        show: false,
        button: {
          text: "Ok",
          redirect_link: "./thankyou",
          redirect_type: "spa",
        }
      },
    };
  },
  methods: {
    submitInvesment: async function () {
      this.modal.show = true;
      this.modal.message =
        "Mohon melakukan pembayaran setelah Mengajukan transaksi Top Up";
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
