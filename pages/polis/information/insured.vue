<template>
  <div class="row">
 
    <div class="col-12">
      <div class="page-body">
        <h4>
          Data
          {{
            myPolicy.policyWithCode.isSyariah
              ? $syariGeneralLabel("Tertanggung")
              : "Tertanggung"
          }}
        </h4>
        <br />
        <div v-for="(item, i) in myPolicy.policyWithCode.insureds" :key="i">
          <div class="row">
            <div class="col-md-4 col-sm-6">
              <p class="data-title">Nama</p>
              <p class="data-value mb-3">
                {{
                  $isNullWithSpace(item.person.firstName) +
                  $isNullWithSpace(item.person.midName) +
                  $isNullWithSpace(item.person.lastName)
                }}
              </p>
              <p class="data-title">Jenis Kelamin</p>
              <p class="data-value mb-3">
                {{ item.gender == "F" ? "PEREMPUAN" : "LAKI LAKI" }}
              </p>
            </div>
            <div class="col-md-4 col-sm-6">
              <p class="data-title">Jenis Identitas</p>
              <p class="data-value mb-3">
                {{
                  $labelIdentityType(
                    item.person.certiType
                  )
                }}
              </p>
              <p class="data-title">Tanggal Lahir</p>
              <p class="data-value mb-3">
                {{ $moment(item.birthDate).format("DD/MM/Y") }}
              </p>
            </div>
            <div class="col-md-4 col-sm-6">
              <p class="data-title">Jenis Pekerjaan</p>
              <p class="data-value mb-3">
                {{ item.occupCateName }}
              </p>
              <p class="data-title">Jenis Tertanggung</p>
              <p class="data-value mb-3">{{ item.insuredNo == 0 ? "UTAMA" : "TAMBAHAN" }}</p>
            </div>
          </div>
          <div v-if="i != myPolicy.policyWithCode.insureds.length - 1">
            <br />
            <hr />
            <br />
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
