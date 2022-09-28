<template>
  <div class="row">
    <!-- Search -->
    <div class="col-12">
      <div class="page-body">
        <h4>{{ $syariGeneralLabel("Nilai Polis") }}</h4>
        <br />
        <div class="row">
          <div
            class="col-12"
            v-if="
              !myPolicy.policyWithCode.isILP || myPolicy.policyWithCode.isHybrid
            "
          >
            <p class="data-title">Nilai Tunai</p>
            <h2 class="data-value">
              {{ $currencyName(myPolicy.policyWithCode.currency) }}
              {{
                myPolicyLoanInfo &&
                myPolicyLoanInfo.financialInfo &&
                $convertCurrency(myPolicyLoanInfo.financialInfo.netSV)
              }}
            </h2>
          </div>
          <div
            class="col-12"
            v-if="
              myPolicy.policyWithCode.isILP || myPolicy.policyWithCode.isHybrid
            "
          >
            <p class="data-title">Jenis dan Dana Investasi yang dimiliki</p>
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
                    getFundPrices(
                      myPolicy.policyWithCode.fundPrices,
                      item.fundCode
                    )
                  )
                }}
              </template>
              <template v-slot:item.nabDate="{ item }">
                {{
                  getFundPriceDate(
                    myPolicy.policyWithCode.fundPrices,
                    item.fundCode
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
            </v-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: {
        headers: [
          { text: "No", value: "no" },
          { text: "Jenis Dana Investasi", value: "investmentType" },
          { text: "Mata Uang", value: "currency" },
          { text: "Jumlah Unit", value: "totalUnit" },
          { text: "Harga Unit", value: "priceUnit" },
          { text: "Tanggal NAB", value: "nabDate" },
          { text: "Total Investasi", value: "totalInvestment" },
        ],
      },
    };
  },
  computed: {
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
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
    getFundPriceDate(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;

      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? this.$moment(found.pricingDate).format("DD/MM/Y") : "-";
    },
  },
};
</script>
