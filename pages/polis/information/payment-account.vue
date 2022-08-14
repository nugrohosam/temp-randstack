<template>
  <div class="row">
    <!-- Search -->
    <div class="col-12">
      <div class="page-body">
        <h4>Data Ahli Waris</h4>
        <br />
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Metode Pembayaran</p>
            <p class="data-value mb-3">{{ information_policy ? information_policy.policy_with_code.payer_accounts[0].payment_method : "memuat..." }}</p>
            <p class="data-title">Jenis Kartu</p>
            <p class="data-value mb-3">-</p>
            <p class="data-title">Nomor Rekening/Kartu Kredit</p>
            <p class="data-value mb-3">{{ information_policy ? information_policy.policy_with_code.payer_accounts[0].account_id : "memuat..." }}</p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Nama Pemilik Rekening</p>
            <p class="data-value mb-3">-</p>
            <p class="data-title">Nama Bank</p>
            <p class="data-value mb-3">-</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getInformationPolicyList();
  },
  data() {
    return {
      information_policy: null,
    };
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
    },
  },
};
</script>
