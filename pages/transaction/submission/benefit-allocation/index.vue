<template>
  <div>
    <div v-show="showMe">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyHolder.person.firstName }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Polis</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyNumber }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title">Nomor Rekening Saat Ini</p>
          <p class="data-value">
            {{
              this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
              this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
                ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0]
                    .bankAccount
                : "-"
            }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">
            Nama Pemilik Nomor Rekening Manfaat Saat Ini
          </p>
          <p class="data-value">
            {{
              this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
              this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
                ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0]
                    .accoName
                : "-"
            }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Bank Saat Ini</p>
          <p class="data-value">
            {{
              this.myPolicy.policyWithCode.refundPayeeBankAccount.length > 0 &&
              this.myPolicy.policyWithCode.refundPayeeBankAccount[0] != null
                ? this.myPolicy.policyWithCode.refundPayeeBankAccount[0]
                    .bankName
                : "-"
            }}
          </p>
        </div>
      </div>

      <br />
      <v-divider></v-divider>
      <br />

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Rekening Baru</p>
            <div class="form-input">
              <input
                type="text"
                class="form-control"
                v-model="form.newNoRek"
              />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemilik Rekening Baru</p>
            <div class="form-input">
              <input
                type="text"
                class="form-control"
                v-model="form.rekOwner"
              />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Cabang</p>
            <div class="form-input">
              <input
                type="text"
                class="form-control"
                v-model="form.branch"
              />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-2 col-sm-6">
          <p class="data-title mb-2">Bank</p>
          <div>
            <v-select
              class="bank_option"
              :items="optionBank"
              v-model="form.bank"
              label=""
            ></v-select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
            <input
              type="file"
              ref="inputSelfieKtpImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addSelfieKtpImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputSelfieKtpImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.ktpSelfieAttachment.name }}</small>
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">Unggah Foto KTP</p>
            <input
              type="file"
              ref="inputKtpImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addKtpImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputKtpImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.ktpAttachment.name }}</small>
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">
              Unggah Halaman Depan Buku Tabungan Baru
            </p>
            <input
              type="file"
              ref="inputSavingBookImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addSavingBookImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputSavingBookImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.savingBookAttachment.name }}</small>
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <v-radio-group
            v-model="form.statusFamilyAttachment"
            row
            @change="form.familyAttachment = {}"
          >
            <v-radio
              v-for="(item, index) in radios"
              :key="index"
              color="#F15921"
              v-bind="item"
            ></v-radio>
          </v-radio-group>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">
              {{
                form.statusFamilyAttachment === "KK"
                  ? "Unggah Kartu Keluarga"
                  : "Akte Kelahiran (Pemegang polis)"
              }}
            </p>
            <input
              type="file"
              ref="inputFamilyAttachment"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addFamilyAttachment(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputFamilyAttachment.click()"
            >
              Unggah
            </button>
            <small>{{ form.familyAttachment.name }}</small>
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
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
                <li>
                  - Pengajuan ini hanya untuk manfaat hidup, bonus sehat, akhir asuransi dan anuitas
                </li>
              </ul>
          </div>
        </div>
      </div>

      <ValidationMessage :validation-message="validationMessage" />

      <div class="row">
        <div class="col-12">
          <button
            class="btn btn-primary btn-save float-right"
            @click.prevent="save()"
          >
            <save-icon></save-icon> Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  name: "benefit-allocation",
  components: {
    SaveIcon,
    InfoIcon,
  },
  mounted() {
    if ($nuxt.$route.name != "benefit-allocation") {
      this.showMe = false;
    } else {
      this.showMe = true;
    }
  },
  data() {
    return {
      radios: [
        { label: "Kartu Keluarga (Pemegang polis)", value: "KK" },
        {
          label: "Akte Kelahiran (Pemegang polis)",
          value: "BIRTHCERTIFICATE",
        },
      ],
      validationMessage: [],
      validationAddInvesment: [],
      form: {
        newNoRek: null,
        bank: null,
        branch: null,
        rekOwner: null,
        ktpAttachment: {},
        savingBookAttachment: {},
        ktpSelfieAttachment: {},
        statusFamilyAttachment: "KK",
        familyAttachment: {},
        kkAttachment: {},
        ktpSelfieAttachment: {},
      },
      modal: {
        message: "",
        show: false,
        button: {
          text: "Tutup",
          redirect_link: "/transaction/submission",
          redirect_type: "spa",
        },
      },
      showMe: true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      limitPages: [5, 10, 15, 20, 25],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name != "benefit-allocation") {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    },
  },
  mounted() {
    var contractInvest = [];

    this.myPolicy.policyWithCode.coverages.forEach((item) => {
      if (item?.contractInvests.length > 0) {
        contractInvest = contractInvest.concat(item.contractInvests);
      }
    });

    this.investment_types = contractInvest.map((item) => ({
      value: item.fundCode,
      text: this.$fundName(item.fundCode),
    }));
  },
  computed: {
    selfieKtpFileName() {
      return this.$store.getters["submission_transaction/getSelfieKtpFileName"];
    },
    ktpFileName() {
      return this.$store.getters["submission_transaction/getKtpFileName"];
    },
    savingBookFileName() {
      return this.$store.getters[
        "submission_transaction/getSavingBookFileName"
      ];
    },
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    banks() {
      return this.$store.getters["submission_transaction/getBanks"];
    },
    optionBank() {
      return this.banks.map((v) => ({ value: v.bankId, text: v.name }));
    },
    sumTotalInvestemnt() {
      return this.contractInvests(this.myPolicy.policyWithCode.coverages)
        .map(
          (item) =>
            item.accumUnits *
            this.getFundPrices(
              this.myPolicy.policyWithCode.fundPrices,
              item.fundCode
            )
        )
        .reduce((a, b) => a + b, 0);
    },
  },
  methods: {
    contractInvests(coverages) {
      var contractInvest = [];

      coverages.forEach((item) => {
        if (item?.contractInvests.length > 0) {
          contractInvest = contractInvest.concat(item.contractInvests);
        }
      });

      return contractInvest;
    },
    removeInvestment(i) {
      this.totalWithdraw -= this.form.items[i].applyAmount;
      this.form.items.splice(i, 1);
    },
    addInvestment() {
      this.validationAddInvesment = [];
      if (!this.investment_choosen) {
        this.validationAddInvesment.push("Jenis Dana Investasi perlu dipilih");
        return false;
      }

      const indexObject = this.$indexOfObject(
        this.form.items,
        this.investment_choosen,
        (v) => v.fundCode
      );
      if (indexObject != -1) {
        this.totalWithdraw -= parseFloat(
          this.form.items[indexObject].applyAmount
        );
        this.form.items.splice(indexObject, 1, {
          applyAmount: this.amount,
          applyUnits: null,
          fundCode: this.investment_choosen,
        });
        this.totalWithdraw += parseFloat(this.amount);
      } else {
        this.totalWithdraw += parseFloat(this.amount);
        this.form.items.push({
          applyAmount: this.amount,
          applyUnits: null,
          fundCode: this.investment_choosen,
        });
      }

      this.amount = null;
      this.investment_choosen = null;
    },
    getFundPrices(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;

      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? found.bidPrice : 0;
    },
    getFundPriceDate(fundPrices = [], fundCode) {
      if (!fundPrices.length) return 0;

      const found = fundPrices.find((item) => item.fundCode === fundCode);
      return found ? this.$moment(found.pricingDate).format("DD/MM/Y") : "-";
    },

    async addSelfieKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadSelieKtpFile",
          { file: e.target.files[0] }
        );
        this.form.ktpSelfieAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadKtpFile",
          { file: e.target.files[0] }
        );
        this.form.ktpAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addSavingBookImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadSavingBookFile",
          { file: e.target.files[0] }
        );
        this.form.savingBookAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addFamilyAttachment(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadAttachment",
          { file: e.target.files[0], type: this.form.statusFamilyAttachment }
        );
        this.form.familyAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    sumTopUpValue() {
      return this.form.items
        .map((item) => parseFloat(item.applyAmount))
        .reduce((a, b) => a + b, 0);
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.form.newNoRek) {
        this.validationMessage.push("Nomor Rekening Baru diperlukan");
      }
      if (!this.form.rekOwner) {
        this.validationMessage.push("Nama Pemilik Rekening Baru diperlukan");
      }
      if (!this.form.bank) {
        this.validationMessage.push("Bank diperlukan");
      }
      if (!this.form.branch) {
        this.validationMessage.push("Cabang diperlukan");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
      if (!this.form.ktpAttachment.name) {
        this.validationMessage.push("Unggah KTP diperlukan");
      }
      if (!this.form.savingBookAttachment.name) {
        this.validationMessage.push("Unggah Halaman Depan Buku Tabungan Yang Baru diperlukan");
      }
      if (!this.form.familyAttachment.name) {
        this.validationMessage.push("Unggah " + (this.form.statusFamilyAttachment == "KK" ? "KK" : "Akte Kelahiran") + " diperlukan");
      }
    },
    save: async function () {
      this.validate();
      if (this.validationMessage.length <= 0) {
        this.$store.commit(
          "submission_transaction/benefit_allocation/setBenefitAllocation",
          this.form
        );
        this.$router.push({
          path: "./benefit-allocation/resume",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bank_option {
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
