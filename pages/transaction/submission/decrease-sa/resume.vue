<template>
  <div>
    <BackButton />
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
      <div class="col-lg-6 col-sm-12">
        <p class="data-value">
          Data Pengajuan Penarikan Sebagian Dana Investasi
        </p>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Manfaat</th>
                <th class="text-left">Benefit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in getDecreaseSA.items" :key="item.item_id">
                <td>{{ i + 1 }}</td>
                <td>
                  {{ item.product_name }}
                </td>
                <td>
                  {{ item.benefit_level_descrp || $convertCurrency(item.sum_assured)   }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
        <p class="data-value">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showSelfieKtpPreview"
          >
            Lihat
          </button>
        </p>
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
          Saya menyetujui transaksi dan kebenaran data yang disampaikan.
          <a class="bni-primary no-border" href="">Baca selengkapnya</a>
        </p>
      </div>
    </div>

    <ValidationMessage :validation-message="validationMessage" />
    
    <div class="row">
      <div class="col-lg-12 col-sm-12">
        <div class="message-bar rounded-lg">
            <div class="d-flex">
              <info-icon class="ic-primary mr-2"></info-icon>
              Perhatian !
            </div>
            <br>
            <ul>
              <li>
                Minimal dan Maksimal Uang pertanggungan berdasarkan atas premi yang dibayarkan! 
              </li>
              <li>
                Penurunan Plan atau Benefit maksimal 1 tingkat!
              </li>
              <li>
                Akan ada kemungkinan Penurunan atau Peningkatan Premi yang di tagihkan!
              </li>
            </ul>
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

    <ModalImagePreview
      :src="image_preview.src"
      :show="image_preview.show"
      @closeImagePreview="image_preview.show = false"
    />
  </div>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
import resumePageMixin from "@/mixins/resumePage";

export default {
  name: "decrease-sa-resume",
  mixins: [resumePageMixin],
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    console.log($nuxt.$route.name);
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getDecreaseSA() {
      return this.$store.getters[
        "submission_transaction/decrease_sa/getDecreaseSA"
      ];
    },
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Penurunan uang pertanggungan",
      sub: "Penurunan uang pertanggungan",
    });
  },
  destroyed() {
    this.$store.commit("submission_transaction/removeCurrentHeaderTitle");
  },
  data() {
    return {
      validationMessage: [],
      image_preview: {
        src: "",
        show: false,
      },
      accepted: false,
    };
  },
  methods: {
    showSelfieKtpPreview: function () {
      if (this.getDecreaseSA.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getDecreaseSA.ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.accepted) {
        this.validationMessage.push(
          "Setujui transaksi untuk memproses pengajuan"
        );
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/decrease_sa/decreaseSA"
        );
        if (result && result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path: "./thankyou?transaction_ids=" + transactionIds.join(","),
          });
        }
      }
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
