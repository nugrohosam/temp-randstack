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
            <p class="data-value mb-3">
              {{
                $isNullWithSpace(
                  myPolicy.policyWithCode.insureds[0].person.firstName
                ) +
                $isNullWithSpace(
                  myPolicy.policyWithCode.insureds[0].person.midName
                ) +
                $isNullWithSpace(
                  myPolicy.policyWithCode.insureds[0].person.lastName
                )
              }}
            </p>
            <p class="data-title">Jenis Kelamin</p>
            <p class="data-value mb-3">
              {{
                myPolicy.policyWithCode.insureds[0].gender == "F"
                  ? "PEREMPUAN"
                  : "LAKI LAKI"
              }}
            </p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Jenis Identitas</p>
            <p class="data-value mb-3">
              {{
                $labelIdentityType(
                  myPolicy.policyWithCode.policyHolder.person.certiType
                )
              }}
            </p>
            <p class="data-title">Tanggal Lahir</p>
            <p class="data-value mb-3">
              {{
                $moment(myPolicy.policyWithCode.insureds[0].birthDate).format(
                  "DD/MM/Y"
                )
              }}
            </p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Jenis Pekerjaan</p>
            <p class="data-value mb-3">
              {{ myPolicy.policyWithCode.policyHolder.person.occupCateName }}
            </p>
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
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
};
</script>
