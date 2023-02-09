<template>
  <div>
    <template v-if="!isLoading">
      <div v-show="showMe">
        <form @submit.prevent="save">
          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Nama Pemegang Polis</p>
              <p class="data-value">
                {{ 
                  $isNullWithSpace(myPolicy.policyWithCode.policyHolder.person.firstName) + " " +
                  $isNullWithSpace(myPolicy.policyWithCode.policyHolder.person.midName) + " " +
                  $isNullWithSpace(myPolicy.policyWithCode.policyHolder.person.lastName)
                }}
              </p>
            </div>
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Nomor Polis</p>
              <p class="data-value">
                {{ myPolicy.policyWithCode.policyNumber }}
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Profesi Saat Ini</p>
              <p class="data-value">{{ myPolicy.policyWithCode.policyHolder.person.occupCate == 0 ? myPolicy.policyWithCode.policyHolder.person.otherOccupation : myPolicy.policyWithCode.policyHolder.person.occupCateName }}</p>
            </div>
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Jabatan Saat Ini</p>
              <p class="data-value">{{ myPolicy.policyWithCode.policyHolder.person.occupCate == 0 ? "-" : (myPolicy.policyWithCode.policyHolder.person.positionLevel || "-") }}</p>
            </div>
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Nama Perusahaan Saat Ini</p>
              <p class="data-value">{{ myPolicy.policyWithCode.policyHolder.person.occupCate == 0 ? "-" : (myPolicy.policyWithCode.policyHolder.person.jobCom || "-")}}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Industri</p>
              <p class="data-value">
                {{ myPolicy.policyWithCode.policyHolder.person.occupCate == 0 ? myPolicy.policyWithCode.policyHolder.person.otherIndustry : (!myPolicy.policyWithCode.policyHolder.person.industryName ? "-" : myPolicy.policyWithCode.policyHolder.person.industryName)}}</p>
            </div>
          </div>

          <hr class="my-4" />

          <div class="row">
            <div class="col-12">
              <template>
                <v-data-table
                  :headers="table.headers"
                  :items="
                    my_policy.policyWithCode.coverages.length > 0
                      ? my_policy.policyWithCode.coverages
                      : []
                  "
                  mobile-breakpoint="480"
                  hide-default-footer
                  v-model="coverageSelected"
                  item-key="itemId"
                  show-select
                  class="elevation-1"
                  selectable-key="isSelectable"
                  :single-select="true"
                >
                  <template #header.data-table-select> Pilihan </template>
                  <template v-slot:item.issueDate="{ item }">
                    {{ item ? $moment(item.issueDate).format("DD/MM/Y") : "" }}
                  </template>
                  <template v-slot:item.benefitLevelDescrp="{ item }">
                    {{  item.benefitLevelDescrp != "-" ? item.benefitLevelDescrp : $convertCurrency(item.currentPremium.sumAssured || 0) }}
                  </template>
                  <template v-slot:item.lifeInsured.insured.person="{ item }">
                    {{
                      item
                        ? $isNullWithSpace(
                            item.lifeInsured.insured.person.firstName
                          ) +
                          $isNullWithSpace(
                            item.lifeInsured.insured.person.midName
                          ) +
                          $isNullWithSpace(
                            item.lifeInsured.insured.person.lastName
                          )
                        : ""
                    }}
                  </template>
                  <template v-slot:item.nextPremium.sumAssured="{ item }">
                    {{ $convertCurrency(totalPremAll(item)) }}
                  </template>
                  <template v-slot:item.riskStatus="{ item }">
                    {{
                      (item ? $riskStatus(item.riskStatus) : "-")
                    }}
                  </template>
                </v-data-table>
              </template>
            </div>
          </div>

          <div class="row" v-if="partySelected">
            <div class="col-lg-4 col-sm-4">
              <p class="data-title mb-2">Profesi Baru</p>
              <div>
                <v-autocomplete
                  outlined
                  dense
                  class="occupation_option"
                  :items="optionOccupation"
                  v-model="form.occupation"
                  label=""
                ></v-autocomplete>
              </div>
            </div>
            <div class="col-lg-4 col-sm-4" v-if="form.occupation == '361'">
              <p class="data-title mb-2">Tulis Profesi Baru</p>
                <div class="form-input">
                  <input
                    type="text"
                    pattern="[a-zA-Z.,\s]+"
                    placeholder="cth: Retail, Jasa, dll"
                    class="form-control"
                    v-model="form.otherOccupation"
                  />
              </div>
              <small>Industri Baru tidak bisa menggunakan huruf dan tanda baca</small>
            </div>
          </div>
          <div class="row" v-if="partySelected">
            <div class="col-lg-4 col-sm-4">
              <p class="data-title mb-2">Jabatan</p>
                <div class="form-input">
                  <input
                    type="text"
                    pattern="[a-zA-Z.,\s]+"
                    placeholder="cth: STAFF, MANAGER, dll"
                    class="form-control"
                    v-model="form.positionLevel"
                  />
              </div>
              <small>Jabatan tidak bisa menggunakan huruf dan tanda baca</small>
            </div>
            <div class="col-lg-4 col-sm-4">
              <p class="data-title mb-2">Perusahaan</p>
                <div class="form-input">
                  <input
                    type="text"
                    pattern="[0-9a-zA-Z.,\s]+"
                    placeholder="cth: BNI Life, dll"
                    class="form-control"
                    v-model="form.company"
                  />
              </div>
              <small>Perusahaan tidak bisa menggunakan huruf dan tanda baca</small>
            </div>
          </div>
          
          <div class="row" v-if="partySelected">
            <div class="col-lg-4 col-sm-4">
              <p class="data-title mb-2">Industri Baru</p>
              <div>
                <v-select
                  outlined
                  dense
                  class="industry_option"
                  :items="optionIndustries"
                  v-model="form.industry"
                  label=""
                ></v-select>
              </div>
            </div>
            <div class="col-lg-4 col-sm-4" v-if="form.industry == '8'">
              <p class="data-title mb-2">Tulis Industri Baru</p>
                <div class="form-input">
                  <input
                    type="text"
                    pattern="[a-zA-Z.,\s]+"
                    placeholder="cth: Retail, Jasa, dll"
                    class="form-control"
                    v-model="form.otherIndustry"
                  />
              </div>
              <small>Industri Baru tidak bisa menggunakan huruf dan tanda baca</small>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
              <input
                type="file"
                ref="inputSelfieKtpImage"
                v-show="false"
                accept="image/*"
                @change="(e) => addSelfieKtpImage(e)"
              />
              <button
                class="btn btn-primary-outlined"
                @click.prevent="$refs.inputSelfieKtpImage.click()"
              >
                Unggah
              </button>
              <small>{{ form.ktpSelfieAttachment.name }}</small>
              <br />
              <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 col-sm-12">
              <div class="message-bar rounded-lg">
                  <div class="d-flex">
                    <info-icon class="ic-primary mr-2"></info-icon>
                    Perhatian !
                  </div>
                  <br>
                  <ul>
                    <li>- Pastikan perubahaan pekerjaan sudah di isi dengan benar.</li>
                    <li>- Perubahan pekerjaan diisi oleh tertanggung.</li>
                    <li>- Premi dapat berubah sesuai dengan jenis pekerjaan.</li>
                  </ul>
              </div>
            </div>
          </div>

          <ValidationMessage :validation-message="validationMessage" />

          <div class="row">
            <div class="col-12">
              <button class="btn btn-primary btn-save float-right" type="submit">
                <save-icon></save-icon> Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </template>
    <template v-else>
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <v-progress-circular indeterminate size="64" color="#F15921" width="7">
        </v-progress-circular>
        <p style="color: black">Mohon Tunggu...</p>
      </div>
    </template>

    <NuxtChild />
    <ModalMessage
      :message="modal.message"
      :show="modal.show"
      :button="modal.button"
      @closeModal="modal.show = false"
    />
  </div>
</template>

<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
import InfoPanel from "../../../../../components/InfoPanel.vue";

export default {
  components: {
    SaveIcon,
    InfoIcon,
    InfoPanel
  },  
  name: "change-occupation",
  data() {
    return {
      form: {
        partyId: "",
        occupation: "",
        otherOccupation: "",
        positionLevel: "",
        company: "",
        industry: "",
        otherIndustry: "",
        ktpSelfieAttachment: {},
      },
      isLoading: true,
      coverageSelected: [],
      my_policy: null,
      showMe: true,
      table: {
        headers: [
          {
            text: "Nama Manfaat",
            align: "center",
            value: "productName",
          },
          {
            text: "Nama Tertanggung",
            value: "lifeInsured.insured.person",
          },
          {
            text: "Benefit",
            value: "benefitLevelDescrp",
          },
          {
            text: "Premi",
            value: "nextPremium.sumAssured",
          },
          {
            text: "Status Benefit",
            value: "productType",
          },
        ],
      },
      validationMessage: [],
      modal: {
        message: "",
        show: false,
        button: {
          text: "Tutup",
          redirect_link: "/transaction/submission",
          redirect_type: "spa",
        },
      },
    };
  },
  beforeMount() {
    if (this.myPolicy.policyWithCode.riskStatus != 1) {
      this.modal.show = true;
      this.modal.message =
        "Polis Anda sudah tidak aktif transaksi tidak dapat dilakukan, untuk informasi lebih lanjut silahkan menghubungi Customer Care 1-500-045 atau e-mail ke care@bni-life.co.id";
    }
    
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Perubahan Data Pekerjaan Tertanggung",
      sub: "Pengajuan Perubahan Data Pekerjaan Tertanggung",
    });
  },
  mounted() {
    this.getData();
  },
  computed: {
    partySelected() {
      const insured = this.coverageSelected.length > 0 ? this.coverageSelected[0].insureds[0].insured : null;
      const party = this.coverageSelected.length > 0 ? this.coverageSelected[0].insureds[0].insured.party : null;

      if (insured) {
        this.form.partyId = party.partyId;
        this.form.occupation = this.form.occupation != "" || insured.occupCate == 0 ? this.form.occupation : (insured.occupCate?.toString() || this.form.occupation);
        this.form.industry = this.form.industry != "" || insured.industryId == 0 ? this.form.industry : (insured.person.industryId?.toString() || "8");
        this.form.otherIndustry = this.form.industry == "8" ? insured.person.otherIndustry : this.form.otherIndustry;
        this.form.otherOccupation = this.form.occupation != "" || this.form.otherOccupation && this.occupations.find(x => x.categoryCode == insured.occupCate)?.name.includes("Other") ? insured.person.otherOccupation : this.form.otherOccupation;
        this.form.positionLevel = insured.occupCate == 0 ? this.form.positionLevel : (insured.person?.positionLevel || this.form.positionLevel);
        this.form.company = insured.occupCate == 0 ? this.form.company : (insured.person?.jobCom || this.form.company);
      }

      return insured;
    },
    isCoverageSelected() {
      return this.coverageSelected.length > 0;
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    dueDatePremi() {
      return (
        this.myPolicy.policyWithCode.coverages.find(
          (x) => x.masterProduct == null
        )?.coverageExtend?.dueDate || "-"
      );
    },
    occupations() {
      return this.$store.getters["submission_transaction/getOccupations"];
    },
    optionOccupation() {
      return this.occupations.map(v => ({ value: v.categoryCode, text: v.name }))
    },
    industries() {
      return this.$store.getters["submission_transaction/getIndustries"];
    },
    optionIndustries() {
      return this.industries.map(v => ({ value: v.industryId, text: v.name }))
    }
  },
  methods: {
    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadAttachment",
          { file: e.target.files[0], type: "KTPSELFIE" }
        );
        this.form.ktpSelfieAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    getData: async function () {
      let data = this.myPolicy;
      let productIds = [],
        products = [];
      data.policyWithCode.coverages = data.policyWithCode.coverages.filter(
        (coverage) => coverage.riskStatus == 1
      );
      data.policyWithCode.coverages.forEach((v, i) => {
        productIds.push(v.productId);
        data.policyWithCode.coverages[i].lifeInsured = v.lifeInsured1;
        data.policyWithCode.coverages[i].productName = "";
        data.policyWithCode.coverages[i].isSelectable = true;
        data.policyWithCode.coverages[i].productType =
          data.policyWithCode.coverages[i].masterProduct == null
            ? "Utama"
            : "Tambahan";
        data.policyWithCode.coverages[i].productStatus = "Aktif";
      });
      products = await this.$store.dispatch(
        "submission_transaction/getProducts",
        productIds.join()
      );
      data.policyWithCode.coverages.forEach((v, i) => {
        v.productName = products.find(
          (product) => product.id == v.productId
        ).name;
      });
      data.policyWithCode.coverages = [
        data.policyWithCode.coverages.find((cov) => cov.masterProduct == null),
        ...data.policyWithCode.coverages.filter(
          (cov) => cov.masterProduct != null
        ),
      ];
      this.my_policy = data;
      this.isLoading = false;
    },
    totalPremAll: (item) => {
      return item
        ? item.currentPremium.stdPremAf +
            (item.recurringTopup?.topupAmount || 0)
        : 0;
    },
    validate() {
      this.validationMessage = [];
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
      if (!this.form.company) {
        this.validationMessage.push("Perusahaan Baru diperlukan");
      }
      if (!this.form.positionLevel) {
        this.validationMessage.push("Jabatan Baru diperlukan");
      }
      if (this.form.industry == "8" && !this.form.otherIndustry) {
        this.validationMessage.push("Tulis Industri Baru Lainnya diperlukan");
      }
      if (this.occupations.find(x => x.categoryCode == this.form.occupation)?.name.includes('Other') && !this.form.otherIndustry) {
        this.validationMessage.push("Tulis Profesi Baru Lainnya diperlukan");
      }
    },
    save() {
      this.validate();
      if (this.validationMessage.length) return false;
      this.$store.commit(
        "submission_transaction/change_occupation/setChangeOccupation",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/change/occupation/resume",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .occupation_option {
    max-width: 250px !important;
  }
  .industry_option {
    max-width: 250px !important;
  }
  .btn-add-investment {
    max-width: 250px !important;
  }
  .btn-save {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 150px;
    justify-content: center;
  }
</style>