<template>
  <div class="row">
    <!-- Search -->
    <div class="col-12">
      <div class="page-body">
        <h4>Data {{myPolicy.policyWithCode.isSyariah ? $syariGeneralLabel('Ahli Waris') : "Ahli Waris"}} </h4>
        <br />
        <div class="row">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nama</th>
                  <th class="text-left">Persentase</th>
                  <th class="text-left">Jenis Kelamin</th>
                  <th class="text-left">Hubungan dengan Tertanggung</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in myPolicy.policyWithCode.beneficiaries"
                  :key="item.name"
                >
                  <td>
                    {{ $isNullWithSpace(item.person.firstName) + $isNullWithSpace(item.person.midName) + $isNullWithSpace(item.person.lastName) }}
                  </td>
                  <td>{{ item.shareRate * 100 }}%</td>
                  <td>{{ item.person.gender == "F" ? "PEREMPUAN" : "LAKI LAKI" }}</td>
                  <td>{{ $labelRelationType(item.designation) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    myPolicy(){
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
};
</script>
