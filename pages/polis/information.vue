<template>
  <div>
    <div class="row">
      <div class="col-12">
        <!-- Head -->
        <div class="row">
          <div class="col-12">
            <div class="page-header">
              <h3 class="page-title">{{ current_header_title }}</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- Search -->
          <div class="col-12">
            <template v-if="information_policy">
              <div class="page-body">
                <!-- Transaction Status Menu -->
                <div class="row">
                  <div class="col-md-6 col-xs-12 v-card-parent">
                    <div class="row">
                      <div class="col-12 main-v-card">
                        <p class="data-title">Nomor Polis</p>
                        <h3>
                          {{
                            information_policy != null
                              ? information_policy.policy_with_code
                                  .policy_number
                              : ""
                          }}
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
                                information_policy != null
                                  ? information_policy.policy_with_code
                                      .policy_holder.person.first_name
                                  : ""
                              }}
                            </p>
                            <p class="data-title">Jenis Kelamin</p>
                            <p class="data-value">
                              {{
                                information_policy != null
                                  ? information_policy.policy_with_code
                                      .policy_holder.person.gender
                                  : ""
                              }}
                            </p>
                            <p class="data-title">Jenis Identitas</p>
                            <p class="data-value">
                              {{
                                information_policy != null
                                  ? information_policy.policy_with_code
                                      .policy_holder.person.certi_type
                                  : ""
                              }}
                            </p>
                            <p class="data-title">Nomor Identitas</p>
                            <p class="data-value">
                              {{
                                information_policy != null
                                  ? information_policy.policy_with_code
                                      .policy_holder.person.certi_code
                                  : ""
                              }}
                            </p>
                            <p class="data-title">Tanggal Lahir</p>
                            <p class="data-value">
                              {{
                                information_policy != null
                                  ? information_policy.policy_with_code
                                      .policy_holder.person.birthday
                                  : ""
                              }}
                            </p>
                          </div>
                          <div class="col-md-6 col-xs-12">
                            <p class="data-title">Alamat KTP</p>
                            <p class="data-value">
                              {{
                                information_policy != null
                                  ? information_policy.policy_with_code
                                      .policy_holder.address.address1
                                  : ""
                              }}
                            </p>
                            <p class="data-title">Alamat Koresponden</p>
                            <p class="data-value">-</p>
                            <p class="data-title">Nomor HP</p>
                            <p class="data-value">
                              {{
                                information_policy != null
                                  ? information_policy.policy_with_code
                                      .policy_holder.person.mobile
                                  : ""
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
                        <v-expansion-panels
                          focusable
                          multiple
                          v-if="information_policy"
                        >
                          <v-expansion-panel
                            v-for="(item, i) in information_policy
                              .policy_with_code.coverages"
                            :key="i"
                          >
                            <v-expansion-panel-header>{{
                              item.product_id
                            }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <div class="row">
                                <div class="col-12">
                                  <br />
                                  <p class="data-title">Uang Pertanggungan</p>
                                  <p class="data-value mb-3">
                                    {{ item.current_premium.sum_assured }}
                                  </p>
                                  <p class="data-title">Plan</p>
                                  <!-- <p class="data-value mb-3">{{item.pay_plans}}</p> -->
                                  <p class="data-value mb-3">-</p>
                                  <p class="data-title">Premi</p>
                                  <p class="data-value mb-3">
                                    {{ item.current_premium.std_prem_af }}
                                  </p>
                                  <p class="data-title">Benefit Status</p>
                                  <p class="data-value">-</p>
                                </div>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <v-tabs :v-model="'2'" show-arrows color="#F15921" >
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
              <div class="page-body" style="display:flex; flex-direction:column; justify-content: center; align-items:center;">
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

    this.getInformationPolicyList();
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
  watch: {
  },
  computed: {
    informationPolicyList() {
      return this.$store.getters["information_policy/getInformationPolicyList"];
    },
  },
  methods: {
    getInformationPolicyList: async function () {
      await this.$store.dispatch("information_policy/getInformationPolicyList");
      this.information_policy = this.informationPolicyList;
      this.$router.push({path: '/polis/information/insured'})
    },
  },
};
</script>
<style lang="scss">
.v-slide-group__content a {
  border-bottom: 1.5px solid #716f6f;
}
</style>
