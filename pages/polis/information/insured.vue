<template>
  <div class="row">
    <!-- Search -->
    <div class="col-12">
      <div class="page-body">
        <h4>Data Tetanggung</h4>
        <br />
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Nama</p>
            <p class="data-value mb-3">{{ name }}</p>
            <p class="data-title">Jenis Kelamin</p>
            <p class="data-value mb-3">{{ gender }}</p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Jenis Identitas</p>
            <p class="data-value mb-3">{{ policyNumber }}</p>
            <p class="data-title">Tanggal Lahir</p>
            <p class="data-value mb-3">{{ dateOfBirth }}</p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Jenis Pekerjaan</p>
            <p class="data-value mb-3">{{ occupation }}</p>
            <p class="data-title">Jenis Tertanggung</p>
            <p class="data-value mb-3">UTAMA</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
};
</script>
