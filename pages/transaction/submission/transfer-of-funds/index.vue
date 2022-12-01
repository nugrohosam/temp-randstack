<template>
  <div>
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

    <div class="row mb-4">
      <div class="col-md-12">
        <p class="data-title">Jenis dan Dana Investasi yang dimiliki</p>
      </div>
      <div class="col-12">
        <v-data-table
          :headers="table.headers"
          mobile-breakpoint="480"
          hide-default-footer
          :items="contractInvests(myPolicy.policyWithCode.coverages)"
        >
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:item.investmentType="{ item }">
            {{ (item.fundCode && $fundName(item.fundCode)) || "-" }}
          </template>
          <template v-slot:item.currency="{ item }">
            {{ $currencyName(myPolicy.policyWithCode.currency) }}
          </template>
          <template v-slot:item.totalUnit="{ item }">
            {{ (item && $convertCurrency(item.accumUnits)) || 0 }}
          </template>
          <template v-slot:item.priceUnit="{ item }">
            {{
              item &&
              $convertCurrency(
                getFundPrices(myPolicy.policyWithCode.fundPrices, item.fundCode)
              )
            }}
          </template>
          <template v-slot:item.totalInvestment="{ item }">
            {{
              item &&
              $convertCurrency(
                item.accumUnits *
                  getFundPrices(
                    myPolicy.policyWithCode.fundPrices,
                    item.fundCode
                  )
              )
            }}
          </template>
          <template v-slot:body.append>
            <tr>
              <td colspan="4"></td>
              <td>Total</td>
              <td>{{ $convertCurrency(sumTotalInvestemnt) }}</td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </div>

    <p class="text-gray-600">Tanggal NAB 11/12/2022</p>
    <div class="row">
      <div class="col-lg-3">
        <p class="data-title mb-2">
          Jenis Dana Investasi yang akan Dipindahkan (From)
        </p>
        <div class="data-value">
          <v-select
            v-model="addItemForm.from"
            :items="invesmentOptions.from"
            dense
            outlined
          />
        </div>
      </div>
      <div class="col-lg-3">
        <p class="data-title mb-2">
          Jenis Dana Investasi yang akan Dipindahkan (To)
        </p>
        <div class="data-value">
          <v-select
            v-model="addItemForm.to"
            :items="invesmentOptions.to"
            dense
            outlined
          />
        </div>
      </div>
      <div class="col-lg-3">
        <p class="data-title mb-2">Persentase Unit yang Akan Dipindahkan (%)</p>
        <div class="data-value">
          <input
            type="number"
            class="form-control"
            v-model="addItemForm.percentage"
            min="0"
            max="100"
          />
        </div>
      </div>
      <div class="col-lg-3">
        <p class="data-title mb-2">Jumlah Unit yang dipindah</p>
        <div class="data-value">
          <input
            type="text"
            class="form-control"
            v-model="addItemForm.totalUnit"
            disabled
          />
        </div>
      </div>
    </div>

    <validation-message
      :validation-message="errorMessage.haveInvesmentFrom"
      class="mb-4"
    />
    <button class="btn btn-primary-outlined" @click="addItem">Tambah</button>

    <hr class="mb-4" />

    <v-data-table
      :headers="tableResult.headers"
      mobile-breakpoint="480"
      hide-default-footer
      :items="tableResult.body"
      class="mb-4"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.action="{ index }">
        <button
          class="btn btn-primary-outlined mt-3 w-100 btn-add-investment"
          @click.prevent="removeItem(index)"
        >
          Hapus
        </button>
      </template>
    </v-data-table>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <ValidationProvider
          rules="required|image"
          v-slot="{ validate, errors }"
        >
          <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
          <input
            type="file"
            ref="inputSelfieKtpImage"
            v-show="false"
            accept="image/*"
            @change="
              (e) => {
                validate(e);
                addSelfieKtpImage(e);
              }
            "
          />
          <button
            class="btn btn-primary-outlined"
            @click.prevent="$refs.inputSelfieKtpImage.click()"
          >
            Unggah
          </button>
          <small>{{ form.ktpSelfieAttachment.name }}</small>
          <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
          <br />
          <span class="text-error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-sm-12">
        <div class="message-bar rounded-lg">
          <div class="d-flex">
            <info-icon class="ic-primary mr-2"></info-icon>
            Perhatian !
          </div>
          <br />
          <ul class="list-disc">
            <li>
              Pengajuan transaksi Perubahan Alokasi Dana Investasi akan
              dikenakan biaya
            </li>
            <li>Maksimal fund yang bisa diubah 4.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary btn-save float-right" @submit="submit">
          <save-icon></save-icon> Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  components: {
    SaveIcon,
    InfoIcon,
  },
  data() {
    return {
      table: {
        headers: [
          { text: "No", value: "no" },
          { text: "Jenis Dana Investasi", value: "investmentType" },
          { text: "Mata Uang", value: "currency" },
          { text: "Jumlah Unit", value: "totalUnit" },
          { text: "Harga Unit", value: "priceUnit" },
          { text: "Total Investasi", value: "totalInvestment" },
        ],
      },
      tableResult: {
        headers: [
          { text: "No", value: "no" },
          { text: "Sumber Dana Investasi", value: "from" },
          { text: "Dana Investasi yang akan dipindahkan", value: "to" },
          { text: "Jumlah Unit Dituju", value: "totalUnit" },
          { text: "Action", value: "action" },
        ],
        body: [],
      },
      addItemForm: {
        from: "",
        to: "",
        percentage: null,
        totalUnit: "",
      },
      form: {
        ktpSelfieAttachment: "",
      },
      invesmentOptions: {
        from: [],
        to: [],
      },
      errorMessage: {
        haveInvesmentFrom: [],
      },
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    sumTotalInvestemnt() {
      return this.contractInvests(this.myPolicy.policyWithCode.coverages)
        .map(
          (item) =>
            item.accumUnits *
            this.getFundPrices(
              this.myPolicy.policyWithCode.fundPrices,
              item.fundCode
            )
        )
        .reduce((a, b) => a + b, 0);
    },
  },
  created() {
    this.$watch(
      () => ({
        from: this.addItemForm.from,
        percentage: this.addItemForm.percentage,
      }),
      (data) => {
        if (data.from && data.percentage) {
          const found = this.contractInvests(
            this.myPolicy.policyWithCode.coverages
          ).find((item) => this.$fundName(item.fundCode) === data.from);
          this.addItemForm.totalUnit =
            (found.accumUnits * +data.percentage) / 100;
        }
      }
    );
  },
  async mounted() {
    const found = this.myPolicy.policyWithCode.coverages.find(
      (item) => item.masterProduct === null
    );
    const result = await this.$store.dispatch(
      "submission_transaction/getProduct",
      found.productId
    );
    this.invesmentOptions = {
      from: this.contractInvests(this.myPolicy.policyWithCode.coverages).map(
        (item) => this.$fundName(item.fundCode)
      ),
      to: result.product.fundCodes.map((item) => this.$fundName(item)),
    };
  },
  methods: {
    contractInvests(coverages) {
      var contractInvest = [];

      coverages.forEach((item) => {
        if (item?.contractInvests.length > 0) {
          contractInvest = contractInvest.concat(item.contractInvests);
        }
      });

      return contractInvest;
    },
    getFundPrices(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;

      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? found.bidPrice : 0;
    },
    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadSelieKtpFile",
          { file: e.target.files[0] }
        );
        this.form.ktpSelfieAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    addItem() {
      const found = this.tableResult.body.find(
        (item) => item.to === this.addItemForm.to
      );
      if (found) {
        this.errorMessage.haveInvesmentFrom.push(
          "Jenis Dana Investasi yang akan Dipindahkan (To) sudah ditambahkan."
        );
        return false;
      }

      this.tableResult.body.push(this.addItemForm);
      this.addItemForm = {
        from: "",
        to: "",
        percentage: null,
        totalUnit: "",
      };
    },
    removeItem(index) {
      this.tableResult.body.splice(index, 1);
    },
    submit() {
      this.$store.commit(
        "submission_transaction/transfer_of_fund/setTransferOfFund",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/transfer-of-funds/resume",
      });
    },
  },
};
</script>
