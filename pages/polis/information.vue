<template>
  <body-page :title="default_header_title">
    <template v-if="myPolicy">
      <div class="row">
        <div class="col-md-6 col-xs-12 v-card-parent">
          <div class="row">
            <div class="col-12 main-v-card">
              <p class="data-title">Nomor Polis</p>
              <h3>
                {{ myPolicy.policyWithCode.policyNumber }}
              </h3>
            </div>
            <div class="col-12 main-v-card">
              <h4>Data Pemegang Polis</h4>
              <br />
              <div class="row">
                <div class="col-md-6 col-xs-12">
                  <p class="data-title">Nama</p>
                  <p class="data-value">
                    {{
                      $isNullWithSpace(
                        myPolicy.policyWithCode.policyHolder.person.firstName
                      ) +
                      $isNullWithSpace(
                        myPolicy.policyWithCode.policyHolder.person.midName
                      ) +
                      $isNullWithSpace(
                        myPolicy.policyWithCode.policyHolder.person.lastName
                      )
                    }}
                  </p>
                  <p class="data-title">Jenis Kelamin</p>
                  <p class="data-value">
                    {{
                      myPolicy.policyWithCode.policyHolder.person.gender == "F"
                        ? "PEREMPUAN"
                        : "LAKI LAKI"
                    }}
                  </p>
                  <p class="data-title">Jenis Identitas</p>
                  <p class="data-value">
                    {{
                      $labelIdentityType(
                        myPolicy.policyWithCode.policyHolder.person.certiType
                      )
                    }}
                  </p>
                  <p class="data-title">Nomor Identitas</p>
                  <p class="data-value">
                    {{ myPolicy.policyWithCode.policyHolder.person.certiCode }}
                  </p>
                  <p class="data-title">Tanggal Lahir</p>
                  <p class="data-value">
                    {{
                      $moment(
                        myPolicy.policyWithCode.policyHolder.person.birthday
                      ).format("DD/MM/Y")
                    }}
                  </p>
                </div>
                <div class="col-md-6 col-xs-12">
                  <p class="data-title">Alamat</p>
                  <p class="data-value">
                    {{ getAddress() }}
                  </p>
                  <!-- <p class="data-title">Alamat Koresponden</p>
                            <p class="data-value">
                              {{
                                myPolicy.policyWithCode.policyHolder.address
                                  .address1
                              }}
                            </p> -->
                  <p class="data-title">Nomor HP</p>
                  <p class="data-value">
                    {{ myPolicy.policyWithCode.policyHolder.person.mobile }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xs-12 v-card-parent">
          <div class="row">
            <div class="col-12 main-v-card">
              <h4>Produk</h4>
              <br />
              <template v-if="myPolicy.policyWithCode.coverages.length > 0">
                <v-expansion-panels focusable multiple>
                  <v-expansion-panel
                    v-for="(item, i) in myPolicy.policyWithCode.coverages"
                    :key="i"
                  >
                    <v-expansion-panel-header>{{
                      item ? item.productName : item === undefined ? "Produk Tidak Aktif" : "Memuat..."
                    }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="row">
                        <div class="col-12">
                          <br />
                          <p
                            class="data-title"
                            v-if="
                              item &&
                              (item.benefitLevelDescrp == null ||
                              item.benefitLevelDescrp == '-' ||
                              item.benefitLevelDescrp == '')
                            "
                          >
                            {{
                              myPolicy.policyWithCode.isSyariah
                                ? "Santunan Asuransi"
                                : "Uang Pertanggungan"
                            }}
                          </p>
                          <p
                            class="data-value mb-3"
                            v-if="
                              item &&
                              (item.benefitLevelDescrp == null ||
                              item.benefitLevelDescrp == '-' ||
                              item.benefitLevelDescrp == '')
                            "
                          >
                            {{
                              $currencyName(myPolicy.policyWithCode.currency)
                            }}
                            {{
                              $convertCurrency(
                                item ? item.currentPremium.sumAssured : 0
                              )
                            }}
                          </p>
                          <p
                            class="data-title"
                            v-if="
                              item &&
                              item.benefitLevelDescrp != null &&
                              item.benefitLevelDescrp != '-' &&
                              item.benefitLevelDescrp != ''
                            "
                          >
                            Plan
                          </p>
                          <p
                            class="data-value mb-3"
                            v-if="
                              item &&
                              item.benefitLevelDescrp != null &&
                              item.benefitLevelDescrp != '-' &&
                              item.benefitLevelDescrp != ''
                            "
                          >
                            {{ item.benefitLevelDescrp }}
                          </p>
                          <p class="data-title">
                            {{
                              myPolicy.policyWithCode.isSyariah
                                ? "Kontribusi"
                                : "Premi"
                            }}
                          </p>
                          <p class="data-value mb-3">
                            {{
                              $currencyName(myPolicy.policyWithCode.currency)
                            }}
                            {{ $convertCurrency(totalPremAll(item)) }}
                          </p>
                          <p class="data-title">Benefit Status</p>
                          <p class="data-value">
                            {{ item ? $riskStatus(item.riskStatus) : "-" }}
                          </p>
                        </div>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
              <template v-else>
                <p class="data-title">Tidak ada produk terdaftar</p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-none d-md-block">
          <v-tabs :v-model="'2'" show-arrows color="#F15921">
            <v-tab
              v-for="item in myitems"
              :id="'tab' + item.index"
              :ref="'tab' + item.index"
              :key="item.index"
              :to="item.link"
              :ripple="false"
              active-class="information-tab-active"
              class="information-tab"
            >
              {{
                myPolicy.policyWithCode.isSyariah
                  ? $syariGeneralLabel(item.tab)
                  : item.tab
              }}
            </v-tab>
          </v-tabs>
          <br />
          <v-tabs-items v-model="tab">
            <NuxtChild />
          </v-tabs-items>
        </div>
        <div class="infromation-menu-mobile col-12 d-block d-md-none">
          <v-expansion-panels>
            <v-expansion-panel v-for="(item, index) in myitems" :key="index">
              <v-expansion-panel-header>
                <NuxtLink :to="item.link">
                  {{ item.tab }}
                </NuxtLink>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <NuxtChild />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <v-progress-circular indeterminate size="64" color="#F15921" width="7">
        </v-progress-circular>
        <p style="color: black">Mohon Tunggu...</p>
      </div>
    </template>
  </body-page>
</template>
<script>
export default {
  mounted() {
    if ($nuxt.$route.name != "polis-information") {
      this.showMenu = false;
    } else {
      this.showMenu = true;
    }
    this.$router.push({ path: "/polis/information/insured" });
  },
  data() {
    return {
      showMenu: true,
      default_header_title: "Informasi Data Polis",
      tab: 1,
      insured_title: "Tertanggung", //Peserta Yang Diasuransikan
      myitems: [
        { index: 0, tab: "Tertanggung", link: "/polis/information/insured" },
        { index: 1, tab: "Data Ahli Waris", link: "/polis/information/heirs" },
        {
          index: 2,
          tab: "Data Rekening Pembayaran",
          link: "/polis/information/payment-account",
        },
        {
          index: 3,
          tab: "Data Rekening Manfaat",
          link: "/polis/information/benefit-account",
        },
        {
          index: 4,
          tab: "Nilai Polis",
          link: "/polis/information/polis-value",
        },
      ],
      information_policy: null,
    };
  },
  watch: {},
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  methods: {
    getAddress() {
      const address = this.myPolicy.policyWithCode.policyHolder.address;
      let result = "";
      for (let index = 1; index <= 7; index++) {
        const addressNow = address[`address${index}`];
        if (addressNow) {
          result += `${index != 1 ? ", " : ""}${addressNow}`;
        }
      }
      return result;
    },
    totalPremAll: (item) => {
      return item
        ? item.currentPremium.stdPremAf +
            (item.recurringTopup?.topupAmount || 0)
        : 0;
    },
    // getInformationPolicyList: async function () {
    //   await this.$store.dispatch("information_policy/getInformationPolicyList");
    //   this.information_policy = this.informationPolicyList;
    // },
  },
};
</script>
<style lang="scss">
.v-slide-group__content a {
  border-bottom: 1.5px solid #716f6f;
}

.infromation-menu-mobile {
  .v-expansion-panel-header {
    min-height: 0 !important;
    a {
      padding-top: 1rem;
      padding-bottom: 1rem;
      color: #f15921;
      text-decoration: none;
    }
  }
  .v-expansion-panel-content__wrap {
    padding: 0;
  }
}
</style>
