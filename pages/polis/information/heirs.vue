<template>
  <div class="row">
    <!-- Search -->
    <div class="col-12">
      <div class="page-body">
        <h4>Data Ahli Waris</h4>
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
                  v-for="item in information_policy
                    ? information_policy.policy_with_code.beneficiaries
                    : []"
                  :key="item.name"
                >
                  <td>
                    {{
                      (item.person.first_name != null
                        ? item.person.first_name + " "
                        : "") +
                      (item.person.mid_name != null
                        ? item.person.mid_name + " "
                        : "") +
                      (item.person.last_name != null
                        ? item.person.last_name + " "
                        : "")
                    }}
                  </td>
                  <td>{{ item.share_rate * 100 }}%</td>
                  <td>{{ item.gender == "F" ? "PEREMPUAN" : "LAKI LAKI" }}</td>
                  <td>{{ item.designation }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
    </div>

    <!-- <div class="col-12">
      <div class="page-body">
        <h4>Nilai Polis</h4>
        <br />

        <div class="row">
          <div class="col-12">
            <p class="data-title">Nilai Tunai</p>
            <h3>Rp 4,100,000,000</h3>
            <br>
            <p class="data-title">Jenis dan Dana Investasi yang dimiliki</p>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">No</th>
                    <th class="text-left">Jenis Dana Investasi</th>
                    <th class="text-left">Mata Uang</th>
                    <th class="text-left">Jumlah Unit</th>
                    <th class="text-left">Harga Unit</th>
                    <th class="text-left">Tanggal NAB</th>
                    <th class="text-left">Total Investasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in items" :key="item.name">
                    <td>{{ i + 1}}</td>
                    <td>{{ item.investment_type}}</td>
                    <td>{{ item.currency}}</td>
                    <td>{{ item.total_unit }}</td>
                    <td>{{ item.price_unit }}</td>
                    <td>{{ item.date_nab }}</td>
                    <td>{{ item.investment_total }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  mounted() {
    this.getInformationPolicyList();
  },
  data() {
    return {
      information_policy: null,

      // items: [
      //   {
      //     investment_type: "BNI LIFE MAXIMA",
      //     currency: "Rp",
      //     total_unit: "1000",
      //     price_unit: "100,000",
      //     date_nab: "10/10/2010",
      //     investment_total: "100.000,00",
      //   },
      //   {
      //     investment_type: "BNI LIFE ENDAVO",
      //     currency: "Rp",
      //     total_unit: "1000",
      //     price_unit: "100,000",
      //     date_nab: "10/10/2010",
      //     investment_total: "100.000,00",
      //   },
      //   {
      //     investment_type: "BNI LIFE MAXIMA",
      //     currency: "Rp",
      //     total_unit: "1000",
      //     price_unit: "100,000",
      //     date_nab: "10/10/2010",
      //     investment_total: "100.000,00",
      //   },
      // ],
      
    };
  },
  computed: {
    informationPolicyList() {
      return this.$store.getters["information_policy/getInformationPolicyList"];
    },
  },
  methods: {
    getInformationPolicyList: async function () {
      await this.$store.dispatch("information_policy/getInformationPolicyList");
      this.information_policy = this.informationPolicyList;
    },
  },
};
</script>
