<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(save)">
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
          <p class="data-value">xx/xx/xxxx</p>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Informasi Virtual Account</p>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <v-select
              :items="virtualAccountOptions"
              v-model="form.virtualAccountNumber"
              label="Virtual Account"
              dense
              outlined
              :error-messages="errors[0]"
            ></v-select>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tagihan Premi</p>
          <p class="data-value">Rp xx.xxx.xxx</p>
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
          <p class="data-title mb-2">Unggah Bukti Transfer</p>
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <input
              type="file"
              ref="inputBuktiTransferImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addBuktiTransferImage(e);
                }
              "
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
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">Unggah Foto Selfie dengan KTP</p>
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
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
            <br />
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar rounded-lg">
            <p><b>Perhatian !</b></p>
            <ul>
              <li>
                Pemulihan polis hanya berlaku jika usia dibawah atau sama dengan
                2 tahun sejak tanggal <strong>lapsed date</strong>
              </li>
              <li>
                Mohon lakukan pembayaran dahulu sebelum melakukan pengajuan
                pemulihan polis
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <button class="btn btn-primary btn-save float-right" type="submit">
            Simpan
          </button>
        </div>
      </div>
    </form>

    <HealthDeclarationFormModal
      :show="showModalHealth"
      :default-value="form.healthQuestionaire"
      @submit="form.healthQuestionaire = $event"
      @close="showModalHealth = false"
    />
  </ValidationObserver>
</template>

<script>
export default {
  name: "policy-recovery",
  data() {
    return {
      form: {
        healthQuestionaire: [],
        virtualAccountNumber: null,
        transferAttachment: {},
        ktpSelfieAttachment: {},
      },
      showModalHealth: false,
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
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
  },
  methods: {
    save() {
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
