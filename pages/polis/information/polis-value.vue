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
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">No</th>
                    <th class="text-left">Jenis Dana Investasi</th>
                    <th class="text-left">Mata Uang</th>
                    <th class="text-left">Jumlah Unit</th>
                    <th class="text-left">Harga Unit</th>
                    <th class="text-left">Tanggal NAB</th>
                    <th class="text-left">Total Investasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in contractInvests(
                      myPolicy.policyWithCode.coverages
                    )"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ (item.fundCode && $fundName(item.fundCode)) || "-" }}
                    </td>
                    <td>
                      {{ $currencyName(myPolicy.policyWithCode.currency) }}
                    </td>
                    <td>
                      {{ (item && $convertCurrency(item.accumUnits)) || 0 }}
                    </td>
                    <td>
                      {{
                        item &&
                        $convertCurrency(
                          getFundPrices(
                            myPolicy.policyWithCode.fundPrices,
                            item.fundCode
                          )
                        )
                      }}
                    </td>
                    <!-- TODO: Tanggal NAB masih kosong -->
                    <td>
                      {{
                        getFundPriceDate(
                          myPolicy.policyWithCode.fundPrices,
                          item.fundCode
                        )
                      }}
                    </td>
                    <td>
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
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        if (item.contractInvests.length > 0) {
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
