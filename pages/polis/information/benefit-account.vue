<template>
  <div class="row">
    <!-- Search -->
    <div class="col-12">
      <div class="page-body">
        <h4>Data Ahli Waris</h4>
        <br />
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Nomor Rekening</p>
            <p class="data-value mb-3">{{ myPolicy.policyWithCode.refundPayeeBankAccount[0].bankAccount }}</p>
            <p class="data-title">Nama Pemilik Rekening</p>
            <p class="data-value mb-3">{{ myPolicy.policyWithCode.refundPayeeBankAccount[0].accoName }}</p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Nama Bank</p>
            <p class="data-value mb-3">{{ myPolicy.policyWithCode.refundPayeeBankAccount[0].bankName }}</p>
            <!-- <p class="data-title">Cabang Bank</p>
            <p class="data-value mb-3">JAKARTA TIMOER</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
    // this.getBankName();
  },
  computed: {
    myPolicy(){
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  methods: {

  }
};
</script>
