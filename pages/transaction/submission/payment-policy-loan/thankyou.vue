<template>
  <div>
    <div class="row">
      <div class="col-12">
        <check-circle-icon class="ic-primary" size="4.5x"></check-circle-icon>
        <div class="thankyou-message">
          <p class="mb-10">Pengajuan Sudah kami terima dan akan kami proses</p>
          <p class="mb-0"><b>{{ this.$route.query.transaction_ids.split(',').map((id) => "#" + id).join(', ') }}</b></p>
           <p class="mb-0">Berikut adalah nomor transaksi.</p>
          <p class="mb-10">Mohon Disimpan</p>
          <p class="mb-0">Notifikasi akan dikirim melalui WA/SMS dan Email,</p>
          <p>Terimakasih</p>
        </div>
        <button class="btn btn-primary mt-6" @click.prevent="home()">
          Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { CheckCircleIcon } from "vue-feather-icons";
export default {
  name: "add-investment-fund",
  components: {
    CheckCircleIcon,
  },
  data() {
    return {};
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Pembayaran Pinjaman Polis",
      sub: "Pengajuan Pinjaman Nilai Tunai Polis",
    });
  },
  destroyed() {
    this.$store.commit("submission_transaction/removeCurrentHeaderTitle");
  },
  methods: {
    home: function () {
      this.$router.push({ path: "/transaction/submission" });
    },
  },
};
</script>
<style lang="scss" scoped>
.thankyou-message {
  margin-top: 53px;
}
</style>
