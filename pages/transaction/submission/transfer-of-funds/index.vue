<template>
  <div>
    <form @submit.prevent="save">
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
            <template v-slot:item.accumUnits="{ item }">
              {{ (item && $convertCurrency(getAssignRateFund(myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).premInvestRates, item.fundCode) * 100)) }}%
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
              <tr class="lg:hidden">
                <td colspan="6" >Total</td>
                <td style="text-align: right">{{ $convertCurrency(sumTotalInvestemnt) }}</td>
              </tr>
              <tr class="hidden lg:w-auto lg:visible">
                <td colspan="2"></td>
                <td>Total</td>
                <td>{{ totalUnits }}</td>
                <td>100,00%</td>
                <td>{{ totalPrices }}</td>
                <td>{{ $convertCurrency(sumTotalInvestemnt) }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </div>

      <p class="text-gray-600">Tanggal NAB {{ tanggalNAB(addItemForm.from) }}</p>
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

      <button class="btn btn-primary-outlined mt-4" @click.prevent="addItem">Tambah</button>

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
        <template v-slot:item.from="{ item }">
          {{ $fundName(item.from) }}
        </template>
        <template v-slot:item.to="{ item }">
          {{ $fundName(item.to) }}
        </template>
        <template v-slot:item.action="{ index }">
          <button
            class="btn btn-primary-outlined mt-3 w-100 btn-add-investment"
            @click.prevent="removeItem(index)"
          >
            Hapus
          </button>
        </template>
        <template v-slot:body.append>
          <tr class="lg:hidden sm:hidden">
            <td collspan="3">Total</td>
            <td>{{ totalUnitChoosen }}</td>
          </tr>
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
            <p><b>Perhatian !</b></p>
            <ul>
              <li>
                - Pengajuan transaksi Perubahan Alokasi Dana Investasi akan dikenakan biaya
              </li>
              <li>- Maksimal fund yang bisa diubah 4</li>
            </ul>
          </div>
        </div>
      </div>

      <ValidationMessage :validation-message="validationMessage" />

      <div class="row">
        <div class="col-12">
          <button class="btn btn-primary btn-save float-right" type="submit">
            <save-icon></save-icon> Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {  
  name: "transfer-to-fund",
  components: {
    SaveIcon,
    InfoIcon,
  },
  data() {
    return {
      validationMessage: [],
      table: {
        headers: [
          { text: "No", value: "no" },
          { text: "Jenis Dana Investasi", value: "investmentType" },
          { text: "Mata Uang", value: "currency" },
          { text: "Jumlah Unit", value: "totalUnit" },
          { text: "Komposisi Fund", value: "accumUnits" },
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
        amount: 0
      },
      form: {
        items: [],
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
    totalUnits() {
      return this.contractInvests(this.myPolicy.policyWithCode.coverages)
        .map(
          (item) =>
            item.accumUnits 
        )
        .reduce((a, b) => a + b, 0);
    },
    totalPrices() {
      return this.contractInvests(this.myPolicy.policyWithCode.coverages)
        .map(
          (item) => this.getFundPrices(this.myPolicy.policyWithCode.fundPrices, item.fundCode)
        )
        .reduce((a, b) => a + b, 0);
    },
    totalUnitChoosen() {
      return this.tableResult.body.map((item) => +item.totalUnit).reduce((a, b) => a + b, 0);
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
          ).find((item) => item.fundCode === data.from);
          this.addItemForm.totalUnit =
            (found.accumUnits * +data.percentage) / 100;
          this.addItemForm.amount =
            this.addItemForm.totalUnit * this.getFundPrices(
              this.myPolicy.policyWithCode.fundPrices,
              found.fundCode
            )
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
        (item) => ({'value' : item.fundCode, 'text' : this.$fundName(item.fundCode)})
      ),
      to: result.product.fundCodes.map((fundCode) =>  ({'value' : fundCode, 'text' : this.$fundName(fundCode)})),
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

      return contractInvest.filter(item => this.getAssignRateFund(this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).premInvestRates, item.fundCode) > 0);
    },
    getFundPrices(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;

      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found?.assignRate || 0;
    },
    getAssignRateFund(premInvestRates = [], fundCode) {
      if (!premInvestRates.length) return 0;

      const found = premInvestRates.find((item) => item.fundCode === fundCode);
      return found ? found.assignRate : 0;
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
    tanggalNAB(fundCode) {
      const fundPriceDate = this.getFundPriceDate(
        this.myPolicy.policyWithCode.fundPrices,
        fundCode
      )
      return fundPriceDate || "-"
    },
    getFundPriceDate(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;
      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? this.$moment(found.pricingDate).format("DD/MM/Y") : "-";
    },
    addItem() {
      const isBodyFill = this.tableResult.body.length > 0 ;
      const found = isBodyFill ? this.tableResult.body.find(
        (item) => item.to === this.addItemForm.to
      ) : null;
      const totalUnitSource = this.contractInvests(this.myPolicy.policyWithCode.coverages).find((item) => item.fundCode == this.addItemForm.from).accumUnits
      const countSource = isBodyFill ? this.tableResult.body.filter(
        (item) => item.from === this.addItemForm.from
      ).map((item) => +item.totalUnit).reduce((a, b) => a + b, 0) + this.addItemForm.totalUnit : 0;
      
      this.errorMessage.haveInvesmentFrom = []
      if (this.addItemForm.from ==this.addItemForm.to) {
        this.errorMessage.haveInvesmentFrom.push(
          "Jenis Dana Investasi tidak bisa sama"
        );
      }
      if (found) {
        this.errorMessage.haveInvesmentFrom.push(
          "Jenis Dana Investasi tujuan yang akan Dipindahkan sudah ditambahkan."
        );
        return false;
      } else if (countSource > totalUnitSource) {
        this.errorMessage.haveInvesmentFrom.push(
          "Pemindahan Dana Investasi Melebihi Dana Saat Ini."
        );
        return false;
      } else if (this.addItemForm.from == null || this.addItemForm.from == "") {
        this.errorMessage.haveInvesmentFrom.push(
          "Dana sumber harus dipilih."
        );
        return false;
      } else if (this.addItemForm.to == null || this.addItemForm.to == "") {
        this.errorMessage.haveInvesmentFrom.push(
          "Tujuan pengalihan dana harus terisi."
        );
        return false;
      } else if (this.addItemForm.totalUnit == null || this.addItemForm.totalUnit == 0) {
        this.errorMessage.haveInvesmentFrom.push(
          "Persentase Unit harus terisi."
        );
        return false;
      }

      if (this.errorMessage.haveInvesmentFrom.length == 0){
        this.tableResult.body.push(this.addItemForm);
        this.form.items.push(this.addItemForm);
        this.addItemForm = {
          from: "",
          to: "",
          percentage: null,
          totalUnit: "",
        };
      }
    },
    removeItem(index) {
      this.form.items.splice(index, 1);
      this.tableResult.body.splice(index, 1);
    },
    validate() {
      this.validationMessage = [];
      if (this.myPolicy.policyWithCode.advancePremIndi == "Y") {
        this.validationMessage.push("Polis tidak bisa dalam kondisi advanced premium");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    save() {
      this.validate();
      if (this.validationMessage.length) return false;
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
