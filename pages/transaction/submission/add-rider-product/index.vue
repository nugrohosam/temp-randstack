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
          <p class="data-title mb-2">Existing Rider Information</p>
          <p class="data-value">XX</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <v-data-table
            :headers="table.headers"
            :items="
              my_policy.policyWithCode.coverages.length > 0
                ? my_policy.policyWithCode.coverages
                : []
            "
            mobile-breakpoint="480"
            hide-default-footer
          >
            <template v-slot:item.nextPremium.sumAssured="{ item }">
              {{ $convertCurrency(item ? item.nextPremium.sumAssured : "") }}
            </template>
            <template v-slot:item.lifeInsured.insured.person="{ item }">
              {{
                item
                  ? $isNullWithSpace(
                      item.lifeInsured.insured.person.firstName
                    ) +
                    $isNullWithSpace(item.lifeInsured.insured.person.midName) +
                    $isNullWithSpace(item.lifeInsured.insured.person.lastName)
                  : ""
              }}
            </template>
          </v-data-table>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Rider Name wanted (PR BUAT MULTIPLE)</p>
          <div>
            <v-select
              :items="[]"
              v-model="form.product_id"
              label="Pilih Rider Name"
            ></v-select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Rider Plan</p>
          <div>
            <v-select
              :items="[]"
              v-model="form.plan"
              label="Pilih Rider Plan"
            ></v-select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">Pilih Tertanggung untuk Rider Baru</p>
          <v-data-table
            :headers="riderNameTable.headers"
            :items="
              my_policy.policyWithCode.coverages.length > 0
                ? my_policy.policyWithCode.coverages
                : []
            "
            v-model="form.party_ids"
            mobile-breakpoint="480"
            show-select
            hide-default-footer
          >
            <template #header.data-table-select> Pilihan </template>
          </v-data-table>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Depan</p>
          <div class="form-input">
            <input
              type="text"
              class="form-control"
              v-model="form.insured.first_name"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Belakang</p>
          <div class="form-input">
            <input
              type="text"
              class="form-control"
              v-model="form.insured.last_name"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Kartu Identitas</p>
          <div class="form-input">
            <v-select
              :items="[]"
              v-model="form.insured.identity_type"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Identitas</p>
          <div class="form-input">
            <input
              type="number"
              class="form-control"
              v-model="form.insured.identity"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Hubungan dengan Tertanggung Utama</p>
          <div class="form-input">
            <input
              type="text"
              class="form-control"
              v-model="form.insured.relation"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Jenis Kelamin</p>
          <div class="form-input">
            <v-select :items="[]" v-model="form.insured.gender"></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Lahir</p>
          <div class="form-input">
            <input
              type="date"
              class="form-control"
              v-model="form.insured.birth_date"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tempat lahir</p>
          <div class="form-input">
            <input
              type="text"
              class="form-control"
              v-model="form.insured.birth_place"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Kewarganegaraan</p>
          <div class="form-input">
            <v-select :items="[]" v-model="form.insured.nationality"></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Status Perkawinan</p>
          <div class="form-input">
            <v-select
              :items="[]"
              v-model="form.insured.marital_status"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tinggi Badan (cm)</p>
          <div class="form-input">
            <input
              type="number"
              class="form-control"
              v-model="form.insured.height"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Berat Badan (kg)</p>
          <div class="form-input">
            <input
              type="number"
              class="form-control"
              v-model="form.insured.weight"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Apakah Merokok</p>
          <div class="form-input">
            <v-select :items="[]" v-model="form.insured.is_smoker"></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Profesi</p>
          <div class="form-input">
            <v-select :items="[]" v-model="form.insured.occupation"></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Hp</p>
          <div class="form-input">
            <input
              type="number"
              class="form-control"
              v-model="form.insured.phone_number"
            />
          </div>
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
          <small>{{ form.ktp_selfie_attachment.name }}</small>
          <br />
          <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
        </div>
      </div>

      <ValidationMessage :validation-message="validationMessage" />

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
      :default-value="form.healthQuestionnaire"
      @submit="form.healthQuestionnaire = $event"
      @close="showModalHealth = false"
    />
  </div>
</template>

<script>
export default {
  name: "add-rider-product",
  data() {
    return {
      form: {
        product_id: null,
        plan: null,
        insured: {
          first_name: null,
          last_name: null,
          identity_type: null,
          identity: null,
          relation: null,
          gender: null,
          birth_date: null,
          birth_place: null,
          nationality: null,
          marital_status: null,
          height: null,
          weight: null,
          is_smoker: false,
          occupation: null,
          phone_number: null,
        },
        party_ids: [],
        health_questionnaire: [],
        ktp_selfie_attachment: {},
      },
      showModalHealth: false,
      validationMessage: [],
      table: {
        headers: [
          {
            text: "Nama Produk",
            value: "productName",
          },
          {
            text: "Uang Pertangguhan/Benefit",
            value: "nextPremium.sumAssured",
          },
          {
            text: "Nama Tertanggung",
            value: "lifeInsured.insured.person",
          },
          {
            text: "Jenis produk",
            value: "productType",
          },
        ],
      },
      riderNameTable: {
        headers: [
          {
            text: "Nama Tertanggung",
            value: "",
          },
        ],
      },
    };
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
  },
  methods: {
    validate() {
      this.validationMessage = [];
      if (!this.form.health_questionnaire.length) {
        this.validationMessage.push("Health Questionnaire diperlukan");
      }
      if (!this.form.ktp_selfie_attachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
    },
    save: async function () {
      this.validate();
      if (this.validationMessage.length) return false;
      this.$store.commit(
        "submission_transaction/rider_product/setAddRider",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/add-rider-product/resume",
      });
    },
  },
};
</script>
