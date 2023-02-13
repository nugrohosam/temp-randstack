<template>
  <div>
    <form @submit.prevent="save">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Pemegang Polis</p>
          <p class="data-value">
            {{ $isNullWithSpace(
                        myPolicy.policyWithCode.policyHolder.person.firstName
            ) +
            $isNullWithSpace(
              myPolicy.policyWithCode.policyHolder.person.midName
            ) +
            $isNullWithSpace(
              myPolicy.policyWithCode.policyHolder.person.lastName
            ) }}
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
          <p class="data-title mb-2">Masa Tahun Premi</p>
          <p class="data-value">{{ (+(paidupDatePremi.substring(0, 4)) - +(issueDatePremi.substring(0, 4))) }} Tahun</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Jatuh Tempo</p>
          <p class="data-value">{{ $formatDate(dueDatePremi) }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Metode Pembayaran Saat Ini</p>
          <p class="data-value">{{ myPolicy.policyWithCode.payerAccounts[0].paymentMethod == 93 ? "VIRTUAL" : "TABUNGAN" }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Jenis Pembayaran</p>
          <p class="data-value">
            {{ $labelPaymentType(myPolicy.policyWithCode.payerAccounts[0].paymentMethod) }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Frekuensi Pembayaran Saat Ini</p>
          <p class="data-value">
            {{
              $paymentFrequency(
                myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).currentPremium.paymentFreq
              ) || "-"
            }}
          </p>
        </div>
      </div>

      <div v-if="myPolicy.policyWithCode.payerAccounts[0].paymentMethod == 30">
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nomor Kartu Kredit</p>
            <p class="data-value">
              {{ myPolicy.policyWithCode.payerBankAccount[0].bankAccount || "-" }}</p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Masa Kadaluarsa Kartu Kredit</p>
            <p class="data-value">
              {{ $formatCCExpireDate(myPolicy.policyWithCode.payerBankAccount[0].expireDate) }}
            </p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2 d-flex">Tipe Kartu Kredit</p>
            <p class="data-value">{{ myPolicy.policyWithCode.payerBankAccount[0].creditCardType == "2" ? "MASTER CARD" : "VISA" }}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nama Pemilik Kartu Kredit</p>
            <p class="data-value">
              {{ myPolicy.policyWithCode.payerBankAccount[0].accoName || "-" }}</p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Bank</p>
            <p class="data-value">
              {{ myPolicy.policyWithCode.payerBankAccount[0].bankName || "-" }}</p>
          </div>
        </div>
      </div>

      <div v-if="myPolicy.policyWithCode.payerAccounts[0].paymentMethod == 3">
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nomor Rekening</p>
            <p class="data-value">
              {{ myPolicy.policyWithCode.payerBankAccount[0].bankAccount || "-" }}</p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nama Pemilik Rekening</p>
            <p class="data-value">
              {{ myPolicy.policyWithCode.payerBankAccount[0].accoName || "-" }}</p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Bank</p>
            <p class="data-value">
              {{ myPolicy.policyWithCode.payerBankAccount[0].bankName || "-" }}</p>
          </div>
        </div>
      </div>

      <div v-if="myPolicy.policyWithCode.payerAccounts[0].paymentMethod == 93">
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Nomor VA</p>
            <p class="data-value">
              {{ myPolicy.policyWithCode.virtualAccountInfo[0].virtualAccountNumber || "-" }}</p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <p class="data-title mb-2">Bank</p>
            <p class="data-value">
              {{ myPolicy.policyWithCode.virtualAccountInfo[0].bankName || "-" }}</p>
          </div>
        </div>
      </div>

      <hr class="my-4" />

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Apakah pembayar adalah individu yang terdaftar dalam polis ?</p>
          <v-select
            :items="optionRegisteredPayerInPolis"
            dense
            outlined
            item-value="value"
            item-text="name"
            class="payment_method"
            v-model="form.isPayerRegisteredInPolicy"
          ></v-select>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Metode Pembayaran</p>
          <v-select
            :items="optionPaymentMethod"
            dense
            outlined
            item-value="value"
            item-text="name"
            class="payment_method"
            v-model="form.paymentMethod"
          ></v-select>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-3 col-sm-4" v-if="form.paymentMethod == 3 || form.paymentMethod == 30">
          <p class="data-title mb-2">Bank</p>
            <div>
              <v-autocomplete
                outlined
                dense
                class="bank_option"
                :items="form.paymentMethod == 30 ? optionCreditCardBank : optionBank"
                v-model="form.bank"
                label=""
              ></v-autocomplete>
            </div>
        </div>

        <div class="col-lg-3 col-sm-4" v-if="form.paymentMethod == 30">
          <p class="data-title mb-2">Tipe Kartu Kredit</p>
            <div>
              <v-autocomplete
                outlined
                dense
                class="bank_option"
                :items="optionCreditCardType"
                v-model="form.creditCardType"
                label=""
              ></v-autocomplete>
            </div>
        </div>
        <div class="col-lg-3 col-sm-4" v-if="form.paymentMethod == 30">
          <p class="data-title mb-2">Nomor Kartu Kredit</p>
            <div class="form-input">
              <input
                  v-mask="'####-####-####-####'"
                  type="text"
                  pattern="[0-9\-\s]+"
                  class="form-control"
                  v-model="form.accountCC"
                />
            </div>
        </div>  
        <div class="col-lg-3 col-sm-4" v-if="form.paymentMethod == 30">
          <p class="data-title mb-2">Tanggal Kadaluarsa</p>
            <div class="form-input">
              <input
                v-mask="'##/##'"
                type="text"
                placeholder="mm/yy"
                pattern="[0-9\/\s]+"
                class="form-control"
                v-model="form.expireDateCC"
              />
          </div>
        </div>
        <div class="col-lg-3 col-sm-4" v-if="form.paymentMethod == 93">
          <p class="data-title mb-2">Nomor VA</p>
            <div class="form-input">
              <v-select
                :items="virtualAccountOptions"
                v-model="form.accountVA"
                label="Virtual Account"
                dense
                outlined
              ></v-select>
          </div>
        </div>
        <div class="col-lg-3 col-sm-4" v-if="form.paymentMethod == 3">
          <p class="data-title mb-2">Nomor Rekening Debit</p>
            <div class="form-input">
              <input
                type="text"
                pattern="[0-9\s]+"
                class="form-control"
                v-model="form.accountDebit"
              />
          </div>
        </div>
        <div class="col-lg-3 col-sm-4" v-if="form.paymentMethod == 3">
          <p class="data-title mb-2">Nama Cabang</p>
            <div class="form-input">
              <input
                type="text"
                pattern="[a-zA-Z0-9.,\s]+"
                class="form-control"
                v-model="form.branch"
              />
          </div>
          <small>Nama Cabang tidak bisa menggunakan huruf dan tanda baca</small>
        </div>
        <div class="col-lg-3 col-sm-4" v-if="form.paymentMethod == 3 || form.paymentMethod == 30">
          <p class="data-title mb-2">Nama Pemilik Rekening</p>
            <div class="form-input">
              <input
                type="text"
                pattern="[a-zA-Z.,\s]+"
                class="form-control"
                v-model="form.ownerAccount"
              />
          </div>
          <small>Nama Pemilik Rekening tidak bisa menggunakan huruf dan tanda baca</small>
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
        <div class="col-12">
          <p class="data-title mb-2">Unggah Foto KTP</p>
          <input
            type="file"
            ref="inputKtpImage"
            v-show="false"
            accept="image/*"
            @change="(e) => addKtpImage(e)"
          />
          <button
            class="btn btn-primary-outlined"
            @click.prevent="$refs.inputKtpImage.click()"
          >
            Unggah
          </button>
          <small>{{ form.ktpAttachment.name }}</small>
          <br />
          <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
        </div>
      </div>

      <div class="row" v-if="!form.isPayerRegisteredInPolicy">
        <div class="col-12">
          <p class="data-title mb-2">Unggah Beneficiary Owner</p>
          <input
            type="file"
            ref="inputBeneficiaryOwnerImage"
            v-show="false"
            accept="image/*"
            @change="(e) => addBeneficiaryOwnerImage(e)"
          />
          <button
            class="btn btn-primary-outlined"
            @click.prevent="$refs.inputBeneficiaryOwnerImage.click()"
          >
            Unggah
          </button>
          <small>{{ form.beneficiaryOwnerAttachment.name }}</small>
          <br />
          <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
        </div>
      </div>

      <div class="row" v-if="form.paymentMethod != 93">
        <div class="col-12">
          <p class="data-title mb-2">{{ form.paymentMethod == 3 ? "Unggah Scan Surat Otorisasi Debit Rekening" : "Unggah Scan Surat Otorisasi Kredit" }}</p>
          <input
            type="file"
            ref="inputBankAuthorizationImage"
            v-show="false"
            accept="image/*"
            @change="(e) => addBankAuthorizationImage(e)"
          />
          <button
            class="btn btn-primary-outlined"
            @click.prevent="$refs.inputBankAuthorizationImage.click()"
          >
            Unggah
          </button>
          <small>{{ form.bankAuthorizationAttachment.name }}</small>
          <br />
          <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
        </div>
      </div>

      <div class="row" v-if="form.paymentMethod != 93">
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">{{ form.paymentMethod == 3 ? "Unggah Halaman Depan Buku Tabungan" : "Unggah Halaman depan Foto Kartu Kredit" }}</p>
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
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar rounded-lg">
              <div class="d-flex">
                <info-icon class="ic-primary mr-2"></info-icon>
                Perhatian !
              </div>
              <br>
              <ul>
                <li>- Untuk Perubahan Pembayaran menggunakan Bank BCA dan Mandiri, mohon menggunakan formulir asli</li>
                <li>- Hubungi kantor layanan atau pemasar terdekat untuk mendapatkan formulir Otorisasi Kredit, formulir Otorisasi Debit Rekening dan formulir Beneficiary Owner</li>
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

<script>
import { SaveIcon, InfoIcon } from "vue-feather-icons";
import InfoPanel from "../../../../components/InfoPanel.vue";

export default {
  components: {
    SaveIcon,
    InfoIcon,
    InfoPanel
  },  
  name: "cuti-premi",
  data() {
    return {
      form: {
        isPayerRegisteredInPolicy: false,
        paymentMethod: 3,
        ownerAccount: "",
        accountCC: "",
        accountDebit: "",
        accountVA: "",
        expireDateCC: "",
        creditCardType: "",
        bank: "",
        branch: "",
        ktpSelfieAttachment: {},
        ktpAttachment: {},
        savingBookAttachment: {},
        beneficiaryOwnerAttachment: {},
        bankAuthorizationAttachment: {},
      },
      validationMessage: [],
    };
  },
  async beforeMount() {
    await this.$store.dispatch("submission_transaction/getBanks", { serviceId : "173"});
    await this.$store.dispatch("submission_transaction/getCreditCardBanks", { serviceId : "173" });

    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Perubahan Metode Pembayaran",
      sub: "Pengajuan Perubahan Metode Pembayaran",
    });
  },
  computed: {
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
    optionRegisteredPayerInPolis() {
      return [
        { value: true, name: "Ya" },
        { value: false, name: "Tidak" },
      ]
    },
    optionCreditCardType() {
      return [
        { value: "Visa Card", text: "Visa Card" },
        { value: "Master Card", text: "Master Card" },
      ]
    },
    banks() {
      return this.$store.getters["submission_transaction/getBanks"];
    },
    optionBank() {
      return this.banks.map(v => ({ value: v.bankId, text: v.name }))
    },
    creditCardBanks() {
      return this.$store.getters["submission_transaction/getCreditCardBanks"];
    },
    optionCreditCardBank() {
      return this.creditCardBanks.map(v => ({ value: v.bankId, text: v.name }))
    },
    optionPaymentMethod() {
      let methods = new Array();
      methods[3] = "AUTO DEBIT - TABUNGAN";
      methods[30] = "AUTO DEBIT - KARTU KREDIT";
      methods[93] = "VIRTUAL ACCOUNT";

      return methods.map((value, index) => ({
        value: index,
        name: value
      }));
    },
    virtualAccountOptions() {
      if (this.myPolicy.policyWithCode.virtualAccountInfo.length) {
        return this.myPolicy.policyWithCode.virtualAccountInfo.map((item) => ({
          text: `${item.bankAbbrName} - ${item.virtualAccountNumber}`,
          value: item.virtualAccountNumber,
        }));
      }

      return [];
    },
    paidupDatePremi() {
      console.log(this.myPolicy.policyWithCode.payerBankAccount[0])
      return this.myPolicy.policyWithCode.coverages?.find(x => x?.masterProduct == null || false)?.paidupDate || '-'
    },
    issueDatePremi() {
      return this.myPolicy.policyWithCode.coverages?.find(x => x?.masterProduct == null || false)?.issueDate || '-'
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
    async addBeneficiaryOwnerImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadBeneficiaryOwnerFile",
          { file: e.target.files[0] }
        );
        this.form.beneficiaryOwnerAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addBankAuthorizationImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadBankAuthorizationFile",
          { file: e.target.files[0] }
        );
        this.form.bankAuthorizationAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    validate() {
      this.validationMessage = [];
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
      
      if (!this.form.ktpAttachment.name) {
        this.validationMessage.push("Unggah KTP diperlukan");
      }

      if (!this.form.isPayerRegisteredInPolicy && !this.form.beneficiaryOwnerAttachment.name) {
        this.validationMessage.push("Unggah Beneficiary Owner");
      }

      if (!this.form.bank && (this.form.paymentMethod == 3 || this.form.paymentMethod == 30)) {
        this.validationMessage.push("Bank harus dipilih");
      }
      
      if (this.form.paymentMethod == 93 && !this.form.accountVA) {
        this.validationMessage.push("Nomor VA diperlukan");
      } else if (this.form.paymentMethod == 3) {
        if (!this.form.accountDebit) {
          this.validationMessage.push("Nomor Rekening diperlukan");
        }
        if (!this.form.ownerAccount) {
          this.validationMessage.push("Nama Pemilik Rekening diperlukan");
        }
        if (!this.form.branch) {
          this.validationMessage.push("Cabang diperlukan");
        }
      } else if (this.form.paymentMethod == 30) {
        if (!this.form.accountCC) {
          this.validationMessage.push("Nomor Rekening diperlukan");
        }
        if (!this.form.ownerAccount) {
          this.validationMessage.push("Nama Pemilik Kartu Kredit diperlukan");
        }
        if (!this.form.creditCardType) {
          this.validationMessage.push("Tipe Kartu Kredit diperlukan");
        }
        if (!this.form.expireDateCC) {
          this.validationMessage.push("Tanggal Kadaluarsa Kartu Kredit diperlukan");
        }
      }

      if (this.form.paymentMethod != 93) {
        if (!this.form.bankAuthorizationAttachment.name) {
          this.validationMessage.push((this.form.paymentMethod == 3 ? "Unggah Scan Surat Otorisasi Debit Rekening" : "Unggah Scan Surat Otorisasi Kredit") + " diperlukan");
        }
        if (!this.form.savingBookAttachment.name) {
          this.validationMessage.push((this.form.paymentMethod == 3 ? "Unggah Halaman Depan Buku Tabungan" : "Unggah Foto Kartu Kredit") + " diperlukan");
        }
      }
    },
    save() {
      this.validate();
      if (this.validationMessage.length) return false;
      else if (this.form.accountVA) {
        const virtualAccount = this.myPolicy.policyWithCode.virtualAccountInfo.find(x => x.virtualAccountNumber == this.form.accountVA);
        this.form.bank = virtualAccount.bankAbbrName
      }

      this.$store.commit(
        "submission_transaction/change_payment_method/setChangePaymentMethod",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/change-payment-method/resume",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .payment_method {
    max-width: 250px !important;
  }
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