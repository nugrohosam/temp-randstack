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
      <div class="col-lg-4 col-sm-6">
        <p class="data-title">Nomor Rekening Saat Ini</p>
        <p class="data-value">
          {{
            this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
            this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
              ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0]
                  .bankAccount
              : "-"
          }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">
          Nama Pemilik Nomor Rekening Manfaat Saat Ini
        </p>
        <p class="data-value">
          {{
            this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
            this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
              ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].accoName
              : "-"
          }}
        </p>
      </div>
      <div class="col-lg-4 col-sm-6">
        <p class="data-title mb-2">Nama Bank Saat Ini</p>
        <p class="data-value">
          {{
            this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
            this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
              ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0].bankName
              : "-"
          }}
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
                <th class="text-left">Nama Fund</th>
                <th class="text-left">Nilai Top Up</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in getWithdrawPartialInvestmentFund.items"
                :key="item.fundCode"
              >
                <td>{{ i + 1 }}</td>
                <td>
                  <b>{{ $fundName(item.fundCode) }}</b>
                </td>
                <td>
                  <b
                    >{{ $currencyName(myPolicy.policyWithCode.currency) }}
                    {{ $convertCurrency(item.applyAmount) }}</b
                  >
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Total</td>
                <td>
                  {{
                    `${$currencyName(
                      myPolicy.policyWithCode.currency
                    )} ${$convertCurrency(sumTopUpValue)}`
                  }}
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

    <div class="row">
      <div class="col-lg-12 col-sm-12">
        <div class="message-bar rounded-lg">
          <p><b>Perhatian !</b></p>
          <ul>
            <li>
              Pastikan nomor rekening yang tercantum sudah sesuai, jika tidak
              silahkan hubungi Customer Care 1-500-045
            </li>
            <li>Terdapat Biaya Penarikan Dana Investasi</li>
          </ul>
        </div>
      </div>
    </div>

    <ValidationMessage :validation-message="validationMessage" />

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
export default {
  name: "add-investment-fund-resume",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    console.log($nuxt.$route.name);
  },
  computed: {
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getWithdrawPartialInvestmentFund() {
      return this.$store.getters[
        "submission_transaction/withdraw_partial_investment_fund/getWithdrawPartialInvestmentFund"
      ];
    },
    sumTopUpValue() {
      return this.getWithdrawPartialInvestmentFund.items
        .map((item) => item.applyAmount)
        .reduce((a, b) => a + b, 0);
    },
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Penarikan Sebagian Dana Investasi",
      sub: "Penarikan Sebagian Dana Investasi",
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
      if (this.getWithdrawPartialInvestmentFund.ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getWithdrawPartialInvestmentFund.ktpSelfieAttachment.file
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
          "submission_transaction/withdraw_partial_investment_fund/withdrawPartialInvestmentFund"
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
