<template>
  <div class="row">
 
    <div class="col-12">
      <div class="page-body">
        <h4>Data {{$syariGeneralLabel('Rekening Pembayaran')}} </h4>
        <br />
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Metode Pembayaran</p>
            <p class="data-value mb-3">
              {{
                $labelPaymentMethod(
                  myPolicy.policyWithCode.payerAccounts[0].paymentMethod
                )
              }}
            </p>
            <p class="data-title">Nomor Rekening/Kartu Kredit</p>
            <p class="data-value mb-3">{{ payerBankAccount.bankAccount }}</p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Nama Pemilik Rekening</p>
            <p class="data-value mb-3">{{ payerBankAccount.accoName }}</p>
            <p class="data-title">Nama Bank</p>
            <p class="data-value mb-3">{{ payerBankAccount.bankName }}</p>
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
      payerBankAccount: {
        debitCreditType: "-",
        bankAccount: "-",
        accoName: "-",
        bankName: "-",
      },
    };
  },
  mounted() {
    this.accountMapping();
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  methods: {
    accountMapping: async function () {
      if (
        this.myPolicy.policyWithCode.payerAccounts[0].paymentMethodNext == 93
      ) {
        this.payerBankAccount.bankAccount =
          this.myPolicy.policyWithCode.virtualAccountInfo[0].virtualAccountNumber;
        this.payerBankAccount.bankName =
          this.myPolicy.policyWithCode.virtualAccountInfo[0].bankName;
      } else if (this.myPolicy.policyWithCode.payerBankAccount.length > 0 && this.myPolicy.policyWithCode.payerBankAccount[0] != null) {
        this.payerBankAccount.bankAccount =
          this.myPolicy.policyWithCode.payerBankAccount[0].bankAccount
        this.payerBankAccount.accoName =
          this.myPolicy.policyWithCode.payerBankAccount[0].accoName
        this.payerBankAccount.bankName = 
          this.myPolicy.policyWithCode.payerBankAccount[0].bankName
      }
    },
  },
};
</script>
