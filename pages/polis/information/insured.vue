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
                information_policy
                  ? (information_policy.policy_with_code.insureds[0].person
                      .first_name != null
                      ? (information_policy.policy_with_code.insureds[0].person
                          .first_name + " ")
                      : "") +
                    (information_policy.policy_with_code.insureds[0].person
                      .mid_name != null
                      ? (information_policy.policy_with_code.insureds[0].person
                          .mid_name + " ")
                      : "") +
                    (information_policy.policy_with_code.insureds[0].person
                      .last_name != null
                      ? (information_policy.policy_with_code.insureds[0].person
                          .last_name + " ")
                      : "")
                  : "memuat..."
              }}
            </p>
            <p class="data-title">Jenis Kelamin</p>
            <p class="data-value mb-3">
              {{
                information_policy
                  ? information_policy.policy_with_code.insureds[0].gender ==
                    "F"
                    ? "PEREMPUAN"
                    : "LAKI LAKI"
                  : "memuat..."
              }}
            </p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Jenis Identitas</p>
            <p class="data-value mb-3">-</p>
            <p class="data-title">Tanggal Lahir</p>
            <p class="data-value mb-3">
              {{
                information_policy
                  ? information_policy.policy_with_code.insureds[0].birth_date
                  : "memuat..."
              }}
            </p>
          </div>
          <div class="col-md-4 col-sm-6">
            <p class="data-title">Jenis Pekerjaan</p>
            <p class="data-value mb-3">
              {{
                information_policy
                  ? information_policy.policy_with_code.insureds[0].occup_cate
                  : "memuat..."
              }}
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
  mounted() {
    this.getInformationPolicyList();
  },
  data() {
    return {
      information_policy: null,
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
