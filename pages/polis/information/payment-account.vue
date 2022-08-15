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
            <p class="data-value mb-3">{{ $labelPaymentMethod(myPolicy.policyWithCode.payerAccounts[0].paymentMethod) }}</p>
            <p class="data-title">Jenis Kartu</p>
            <p class="data-value mb-3">{{ $labelCardType(myPolicy.policyWithCode.payerBankAccount[0].debitCreditType) }}</p>
            <p class="data-title">Nomor Rekening/Kartu Kredit</p>
            <p class="data-value mb-3">{{ myPolicy.policyWithCode.payerBankAccount[0].bankAccount }}</p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Nama Pemilik Rekening</p>
            <p class="data-value mb-3">{{ myPolicy.policyWithCode.payerBankAccount[0].accoName }}</p>
            <p class="data-title">Nama Bank</p>
            <p class="data-value mb-3">{{ myPolicy.policyWithCode.payerBankAccount[0].bankName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
    this.getBankName();
  },
  computed: {
    myPolicy(){
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  methods: {
    getBankName: async function(){
      this.myPolicy.policyWithCode.payerBankAccount[0].bankName = await this.$getBankName(data.policyWithCode.payerBankAccount[0].bankCode)
    }
  }
};
</script>
