<template>
  <div>
    <form @submit.prevent="save">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyHolder.person.firstName }}
          </p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Polis</p>
          <p class="data-value">{{ myPolicy.policyWithCode.policyNumber }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Due Date Premium</p>
          <p class="data-value">{{ $formatDate(dueDatePremi) }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Informasi Virtual Account</p>
          <v-select
            :items="virtualAccountOptions"
            v-model="form.virtualAccountNumber"
            label="Virtual Account"
            dense
            outlined
          ></v-select>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tagihan Premi</p>
          <p class="data-value">{{ $currencyName(myPolicy.policyWithCode.currency) }} {{ $convertCurrency(billReinstate) }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">Isi Formulir Kesehatan</p>
          <button
            class="btn btn-primary-outlined"
            @click.prevent="showModalHealth = !showModalHealth"
          >
            Formulir Kesehatan
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">Unggah Bukti Transfer (Opsional)</p>
          <input
            type="file"
            ref="inputBuktiTransferImage"
            v-show="false"
            accept="image/*"
            @change="(e) => addBuktiTransferImage(e)"
          />
          <button
            class="btn btn-primary-outlined"
            @click.prevent="$refs.inputBuktiTransferImage.click()"
          >
            Unggah
          </button>
          <small>{{ form.transferAttachment.name }}</small>
          <br />
          <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
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
              <li>
                - Pemulihan polis hanya berlaku jika usia dibawah atau sama dengan
                2 tahun sejak tanggal <strong>lapsed date</strong>
              </li>
              <li>
                - Dianjurkan melakukan pembayaran dahulu agar penyelesaian proses lebih cepat
              </li>
              <li>
                - Khusus telemarketing jika terjadi perubahan rekening debet, lakukan juga perubahan metode bayar
              </li>
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

    <HealthDeclarationFormModal
      :show="showModalHealth"
      :default-value="form.healthQuestionnaire"
      @submit="form.healthQuestionnaire = $event"
      @close="showModalHealth = false"
    />
  </div>
</template>

<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  name: "policy-recovery",
  components: {
    SaveIcon,
    InfoIcon,
  },
  data() {
    return {
      form: {
        healthQuestionnaire: [],
        virtualAccountNumber: null,
        transferAttachment: {},
        ktpSelfieAttachment: {},
      },
      showModalHealth: false,
      validationMessage: [],
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    myPolicyLoanInfo() {
      return this.$store.getters["submission_transaction/getMyPolicyLoanInfo"];
    },
    billReinstate() {
      var bill = this.myPolicyLoanInfo?.financialInfo?.fullReinstate || 0
      if (bill == 0) {
        const overduePrem = this.myPolicyLoanInfo?.financialInfo?.overduePremium || 0
        const plBalance = this.myPolicyLoanInfo?.financialInfo?.aplBalance || 0
        bill = overduePrem + plBalance
      }

      return bill
    },
    virtualAccountOptions() {
      if (this.myPolicy.policyWithCode.virtualAccountInfo.length) {
        return this.myPolicy.policyWithCode.virtualAccountInfo.map((item) => ({
          text: `${item.virtualAccountNumber} - ${item.bankAbbrName}`,
          value: item.virtualAccountNumber,
        }));
      }
      return [];
    },
    dueDatePremi() {
      return this.myPolicy.policyWithCode.coverages?.find(x => x?.masterProduct == null || false)?.coverageExtend?.dueDate || '-'
    }
  },
  methods: {
    validate() {
      this.validationMessage = [];
      if (!this.form.healthQuestionnaire.length) {
        this.validationMessage.push("Health Questionnaire diperlukan");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    save() {
      this.validate();
      if (this.validationMessage.length) return false;
      this.$store.commit(
        "submission_transaction/policy_recovery/setPolicyRecovery",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/policy-recovery/resume",
      });
    },
    async addBuktiTransferImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadAttachment",
          { file: e.target.files[0], type: "TRANSFER" }
        );
        this.form.transferAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
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
  },
};
</script>
