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
          <p class="data-value">
            {{ myPolicy.policyWithCode.policyNumber }}
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Jatuh Tempo Polis</p>
          <p class="data-value">{{ $formatDate(dueDatePremi) }}</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Installment Premium<span>
              <VDropdown :distance="6" :skidding="-190">
                <button>
                  <info-icon class="ic-primary mr-2"></info-icon>
                </button>
                <template #popper>
                  <div style="width: 240px; border-radius: 40px">
                    <InfoPanel :style="'max-height: 420px;'" :information="'Berapa kali pembayaran premi sampai dengan selesai'" />
                  </div>
                </template>
              </VDropdown>
            </span>
          </p>
          <p class="data-value">-</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Premi yang ditagihkan</p>
          <p class="data-value">
            {{
              $currencyName(myPolicy.policyWithCode.currency)
            }}
            {{ $convertCurrency(totalPremAll(myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null))) }}
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Metode Pembayaran</p>
          <p class="data-value">
            {{ $labelPaymentMethod(myPolicy.policyWithCode.payerAccounts[0].paymentMethod) }}</p>
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
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2 d-flex">Masa Pembayaran Premi</p>
          <p class="data-value">{{ $formatDate(myPolicy.policyWithCode.lockedPeriodDate) }}</p>
        </div>
      </div>

      <hr class="my-4" />

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Frekuensi Pembayaran Baru</p>
          <v-select
            :items="optionPaymentFreq"
            dense
            outlined
            item-value="value"
            item-text="name"
            class="payment_freq"
            v-model="form.paymentFreq"
          ></v-select>
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
                <li>- Jumlah Premi yang harus dibayarkan akan disesuaikan dengan frekuensi pembayaran yang dipilih</li>
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
        paymentFreq: "",
        ktpSelfieAttachment: {},
      },
      validationMessage: [],
    };
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Perubahan Frekuensi Pembayaran",
      sub: "Pengajuan Perubahan Frekuensi Pembayaran",
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
    optionPaymentFreq() {
      const paymentFreq = this.$listPaymentFrequency();
      return paymentFreq.map((item, index) => {
        return {
          'name': item,
          'value': index
        }
      })
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
      if (this.form.paymentFreq == this.myPolicy.policyWithCode.coverages.find(x => x.masterProduct == null).currentPremium.paymentFreq) {
        this.validationMessage.push("Frekuensi pembayaran harus beda dari sebelumnya");
      }
    },
    save() {
      this.validate();
      if (this.validationMessage.length) return false;
      this.$store.commit(
        "submission_transaction/change_payment_freq/setChangePaymentFreq",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/change-payment-freq/resume",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .payment_freq {
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