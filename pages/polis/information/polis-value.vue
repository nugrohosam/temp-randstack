<template>
  <div class="row">
    <!-- Search -->
    <div class="col-12">
      <div class="page-body">
        <h4>Nilai Polis</h4>
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
                    v-for="(
                      item, index
                    ) in myPolicy.policyWithCode.coverages.filter(
                      (cov) => cov.contractInvests[0] != null
                    )"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{
                        (item.contractInvests[0] &&
                          $fundName(item.contractInvests[0].fundCode)) ||
                        "-"
                      }}
                    </td>
                    <td>
                      {{ $currencyName(myPolicy.policyWithCode.currency) }}
                    </td>
                    <td>
                      {{
                        (item.contractInvests[0] &&
                          $convertCurrency(
                            item.contractInvests[0].accumUnits
                          )) ||
                        0
                      }}
                    </td>
                    <td>
                      {{
                        item.contractInvests[0] &&
                        $convertCurrency(
                          getFundPrices(
                            myPolicy.policyWithCode.fundPrices,
                            item.contractInvests[0].fundCode
                          )
                        )
                      }}
                    </td>
                    <!-- TODO: Tanggal NAB masih kosong -->
                    <td>-</td>
                    <td>
                      {{
                        item.contractInvests[0] &&
                        $convertCurrency(
                          item.contractInvests[0].accumUnits *
                            getFundPrices(
                              myPolicy.policyWithCode.fundPrices,
                              item.contractInvests[0].fundCode
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
    getFundPrices(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;

      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? found.bidPrice : 0;
    },
  },
};
</script>
