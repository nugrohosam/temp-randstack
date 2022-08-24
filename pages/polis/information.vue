<template>
  <div>
    <div class="row">
      <div class="col-12">
        <!-- Head -->
        <div class="row">
          <div class="col-12">
            <div class="page-header">
              <h3 class="page-title">{{ default_header_title }}</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- Search -->
          <div class="col-12">
            <template v-if="myPolicy">
              <div class="page-body">
                <!-- Transaction Status Menu -->
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
                                  myPolicy.policyWithCode.policyHolder.person
                                    .firstName
                                ) +
                                $isNullWithSpace(
                                  myPolicy.policyWithCode.policyHolder.person
                                    .midName
                                ) +
                                $isNullWithSpace(
                                  myPolicy.policyWithCode.policyHolder.person
                                    .lastName
                                )
                              }}
                            </p>
                            <p class="data-title">Jenis Kelamin</p>
                            <p class="data-value">
                              {{
                                myPolicy.policyWithCode.policyHolder.person
                                  .gender == "F"
                                  ? "PEREMPUAN"
                                  : "LAKI LKAI"
                              }}
                            </p>
                            <p class="data-title">Jenis Identitas</p>
                            <p class="data-value">
                              {{
                                $labelIdentityType(
                                  myPolicy.policyWithCode.policyHolder.person
                                    .certiType
                                )
                              }}
                            </p>
                            <p class="data-title">Nomor Identitas</p>
                            <p class="data-value">
                              {{
                                myPolicy.policyWithCode.policyHolder.person
                                  .certiCode
                              }}
                            </p>
                            <p class="data-title">Tanggal Lahir</p>
                            <p class="data-value">
                              {{
                                $moment(
                                  myPolicy.policyWithCode.policyHolder.person
                                    .birthday
                                ).format("DD/MM/Y")
                              }}
                            </p>
                          </div>
                          <div class="col-md-6 col-xs-12">
                            <p class="data-title">Alamat KTP</p>
                            <p class="data-value">
                              {{
                                myPolicy.policyWithCode.policyHolder.address
                                  .address1
                              }}
                            </p>
                            <p class="data-title">Alamat Koresponden</p>
                            <p class="data-value">-</p>
                            <p class="data-title">Nomor HP</p>
                            <p class="data-value">
                              {{
                                myPolicy.policyWithCode.policyHolder.person
                                  .mobile
                              }}
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
                        <template
                          v-if="myPolicy.policyWithCode.coverages.length > 0"
                        >
                          <v-expansion-panels focusable multiple>
                            <v-expansion-panel
                              v-for="(item, i) in myPolicy.policyWithCode
                                .coverages"
                              :key="i"
                            >
                              <v-expansion-panel-header>{{
                                item.productName || "Memuat..."
                              }}</v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <div class="row">
                                  <div class="col-12">
                                    <br />
                                    <p class="data-title">Uang Pertanggungan</p>
                                    <p class="data-value mb-3">
                                      {{ item.currentPremium.sumAssured }}
                                    </p>
                                    <p class="data-title">Plan</p>
                                    <p class="data-value mb-3">
                                      {{ item.benefitLevel }}
                                    </p>
                                    <p class="data-title">Premi</p>
                                    <p class="data-value mb-3">
                                      {{ item.currentPremium.stdPremAf }}
                                    </p>
                                    <p class="data-title">Benefit Status</p>
                                    <p class="data-value">
                                      {{
                                        item.riskStatus != 1
                                          ? "Terminated"
                                          : "Active"
                                      }}
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
                  <div class="col-12">
                    <v-tabs :v-model="'2'" show-arrows color="#F15921">
                      <v-tab
                        v-for="item in items"
                        :id="'tab' + item.index"
                        :ref="'tab' + item.index"
                        :key="item.index"
                        :to="item.link"
                        :ripple="false"
                        active-class="information-tab-active"
                        class="information-tab"
                      >
                        {{ item.tab }}
                      </v-tab>
                    </v-tabs>
                    <br />
                    <v-tabs-items v-model="tab">
                      <NuxtChild />
                    </v-tabs-items>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div
                class="page-body"
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <v-progress-circular
                  indeterminate
                  size="64"
                  color="#F15921"
                  width="7"
                >
                </v-progress-circular>
                <p style="color: black">Mohon Tunggu...</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="text-center">

    </div> -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  mounted() {
    if ($nuxt.$route.name != "polis-information") {
      this.showMenu = false;
    } else {
      this.showMenu = true;
      this.current_header_title = this.default_header_title;
    }

    this.$router.push({ path: "/polis/information/insured" });
    // this.getInformationPolicyList();
  },
  data() {
    return {
      showMenu: true,
      default_header_title: "Informasi Data Polis",
      current_header_title: "",
      tab: 1,
      items: [
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
</style>
