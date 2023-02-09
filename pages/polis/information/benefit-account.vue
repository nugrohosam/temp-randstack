<template>
  <div class="row">
    <div class="col-12">
      <div class="page-body">
        <h4>Data {{$syariGeneralLabel('Rekening Manfaat')}} </h4>
        <br />
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Nomor Rekening</p>
            <p class="data-value mb-3">{{ refundPayeeBankAccount.bankAccount }}</p>
            <p class="data-title">Nama Pemilik Rekening</p>
            <p class="data-value mb-3">{{ refundPayeeBankAccount.accoName }}</p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Nama Bank</p>
            <p class="data-value mb-3">{{ refundPayeeBankAccount.bankName }}</p>
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
      refundPayeeBankAccount: {
        bankAccount: "-",
        accoName: "-",
        bankName: "-"
      }
    }

  },
  mounted(){
    this.policyMapping();
  },
  computed: {
    myPolicy(){
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  methods: {
    policyMapping: function(){
      if(this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 && this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null){
        this.refundPayeeBankAccount.bankAccount = this.myPolicy.policyWithCode.refundPayeeBankAccount[0].bankAccount;
        this.refundPayeeBankAccount.accoName = this.myPolicy.policyWithCode.refundPayeeBankAccount[0].accoName;
        this.refundPayeeBankAccount.bankName = this.myPolicy.policyWithCode.refundPayeeBankAccount[0].bankName;
      }
    }
  }
};
</script>
