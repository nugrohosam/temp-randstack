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
      <div class="col-lg-5 col-sm-12">
        <p class="data-value">Alokasi Dana Premi Saat Ini</p>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">Jenis Dana Investasi</th>
                <th class="text-left">Komposisi Fund</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in alocation_funds" :key="item.name">
                <template v-if="i < alocation_funds.length - 1">
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.fund_name }}</td>
                  <td>{{ item.fund_composition }}</td>
                </template>
                <template v-else>
                  <td></td>
                  <td>
                    <b>{{ item.fund_name }}</b>
                  </td>
                  <td>
                    <b>{{ item.fund_composition }}</b>
                  </td>
                </template>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div class="col-lg-2 d-lg-flex d-none d-md-none justify-center align-center ">
        <arrow-right-icon size="3x"></arrow-right-icon>
      </div>
      <div class="col-lg-5 col-sm-12">
        <p class="data-value">Data Perubahan Alokasi Dana Premi Lanjutan</p>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">Jenis Data Investasi</th>
                <th class="text-left">Komposisi Fund</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in alocation_continues_funds"
                :key="item.name"
              >
                <template v-if="i < alocation_continues_funds.length - 1">
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.fund_name }}</td>
                  <td>{{ item.fund_composition }}</td>
                  <td>Edit | Hapus</td>
                </template>
                <template v-else>
                  <td></td>
                  <td>
                    <b>{{ item.fund_name }}</b>
                  </td>
                  <td>
                    <b>{{ item.fund_composition }}</b>
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
      <div class="col-lg-8 col-sm-12">
        <div class="message-bar d-flex rounded-lg">
          <info-icon class="ic-primary mr-2"></info-icon>
          Pembayaran premi selanjutnya akan
          <b>dialokasikan sesuai dengan perubahan yang ada</b>
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
    <ModalMessage
      :message="modal.message"
      :show="modal.show"
      :button="modal.button"
      @closeModal="modal.show = false"
    />
  </div>
</template>
<script>
import { SaveIcon, InfoIcon, ArrowRightIcon } from "vue-feather-icons";
export default {
  name: "investment-fund-allocation-change-resume",
  components: {
    SaveIcon,
    InfoIcon,
    ArrowRightIcon
  },
  mounted() {
    console.log($nuxt.$route.name);
  },
  data() {
    return {
      ex4: [],
      radioGroup: "radio-1",
      items: ["321321321 - BNI", "321321322 - BNI"],
      alocation_funds: [
        {
          id: 1,
          fund_name: "DANA MAKSIMA",
          fund_composition: "40%",
        },
        {
          id: 2,
          fund_name: "DANA CEMERLANG",
          fund_composition: "40%",
        },
        {
          id: 2,
          fund_name: "BNI LIFE X",
          fund_composition: "20%",
        },
        {
          id: "",
          fund_name: "Total",
          fund_composition: "100%",
        },
      ],
      alocation_continues_funds: [
        {
          id: 1,
          fund_name: "DANA MAKSIMA",
          fund_composition: "40%",
        },
        {
          id: 2,
          fund_name: "DANA CEMERLANG",
          fund_composition: "40%",
        },
        {
          id: 2,
          fund_name: "BNI LIFE X",
          fund_composition: "20%",
        },
        {
          id: "",
          fund_name: "Total",
          fund_composition: "100%",
        },
      ],
      modal: {
        message: "",
        show: false,
        button: {
          text: "Ok",
          redirect_link: "./thankyou",
          redirect_type: "spa",
        },
      },
    };
  },
  methods: {
    submit: async function () {
      // patch to action
      this.$router.push({ path: "./thankyou" });
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
