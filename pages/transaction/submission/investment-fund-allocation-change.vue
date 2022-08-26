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
        <div class="col-lg-6 col-sm-12">
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
          <p class="data-title mb-1">Komposisi fund yang ingin dirubah</p>
          <v-select
            :items="investment_types"
            dense
            outlined
            class="investment_type_option"
          ></v-select>
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
        <div class="col-lg-8 col-sm-12">
          <div class="message-bar d-flex rounded-lg">
            <info-icon class="ic-primary mr-2 "></info-icon>
             Pembayaran premi selanjutnya akan <b>dialokasikan sesuai dengan perubahan yang ada</b>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button
            class="btn btn-primary btn-save float-right"
            @click.prevent="saveInvestment()"
          >
           Simpan
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
  name: "investment-fund-allocation-change",
  components: {
    SaveIcon,
    InfoIcon,
  },
  beforeMount() {
    this.modal.show = true;
    this.modal.message =
      "Menu yang anda pilih masih dalam tahap pengembangan"
  },
  mounted() {
    console.log($nuxt.$route.name);
    if (
      $nuxt.$route.name !=
      "transaction-submission-investment-fund-allocation-change"
    ) {
      this.showMe = false;
    } else {
      this.showMe = true;
      // this.current_header_title = this.default_header_title;
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
      showMe: true,
      investment_types: ["UANG SEKOLAH", "ASURANSI"],
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
    };
  },
  watch: {
    $route(to, from) {
      if (
        to.name != "transaction-submission-investment-fund-allocation-change"
      ) {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  methods: {
    saveInvestment: async function () {
      // patch to action
      this.$router.push({ path: "./investment-fund-allocation-change/resume" });
    },
    addInvestment: async function () {},
  },
};
</script>
