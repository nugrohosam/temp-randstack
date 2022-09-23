<template>
  <div class="row">
    <!-- Search -->
    <div class="col-12">
      <div class="page-body">
        <h4>
          Data
          {{
            myPolicy.policyWithCode.isSyariah
              ? $syariGeneralLabel("Ahli Waris")
              : "Ahli Waris"
          }}
        </h4>
        <br />
        <div class="row">
          <div class="col-12">
            <v-data-table
              :headers="table.headers"
              mobile-breakpoint="480"
              hide-default-footer
              :items="myPolicy.policyWithCode.beneficiaries"
            >
              <template v-slot:item.name="{ item }">
                {{
                  $isNullWithSpace(item.person.firstName) +
                  $isNullWithSpace(item.person.midName) +
                  $isNullWithSpace(item.person.lastName)
                }}
              </template>
              <template v-slot:item.shareRate="{ item }">
                {{ item.shareRate * 100 }}%
              </template>
              <template v-slot:item.gender="{ item }">
                {{ item.person.gender == "F" ? "PEREMPUAN" : "LAKI LAKI" }}
              </template>
              <template v-slot:item.designation="{ item }">
                {{ $labelRelationType(item.designation) }}
              </template>
            </v-data-table>
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
      table: {
        headers: [
          { text: "Nama", value: "name" },
          { text: "Persentase", value: "shareRate" },
          { text: "Jenis Kelamin", value: "gender" },
          { text: "Hubungan dengan Tertanggung", value: "designation" },
        ],
      },
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
};
</script>
