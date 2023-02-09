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

      <hr class="my-4" />

      <div class="row">
        <div class="col-12">
          <div class="col-md-12">
            <p class="data-title">Informasi Tanggal dan Jenis Kelamin Tertanggung</p>
          </div>
          <template>
            <v-data-table
              :headers="table.headers"
              :items="
                myPolicy.policyWithCode.insureds.length > 0
                  ? myPolicy.policyWithCode.insureds
                  : []
              "
              mobile-breakpoint="480"
              hide-default-footer
              v-model="insuredSelected"
              item-key="partyId"
              show-select
              class="elevation-1"
              selectable-key="isSelectable"
            >
              <template #header.data-table-select> Pilihan </template>
              <template v-slot:item.person="{ item }">
                {{
                  item
                    ? $isNullWithSpace(
                        item.person.firstName
                      ) +
                      $isNullWithSpace(
                        item.person.midName
                      ) +
                      $isNullWithSpace(
                        item.person.lastName
                      )
                    : ""
                }}
              </template>
              <template v-slot:item.gender="{ item }">
                {{ item.person.gender == "M" ? "Laki Laki" : "Perempuan" }}
              </template>
              <template v-slot:item.birthday="{ item }">
                {{
                  $formatDate(item.person.birthday)
                }}
              </template>
            </v-data-table>
          </template>
        </div>
      </div>
      
      <br>

      <div v-if="insuredSelected.length > 0">
        <div v-for="(insured, index) in insuredSelected" :key="index">

          <hr class="my-4" />

          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Nama Tertanggung</p>
              <p class="data-value">
                {{
                    insured
                      ? $isNullWithSpace(
                          insured.person.firstName
                        ) +
                        $isNullWithSpace(
                          insured.person.midName
                        ) +
                        $isNullWithSpace(
                          insured.person.lastName
                        )
                      : ""
                  }}
              </p>
            </div>
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-2">Tanggal Lahir</p>
              <div class="data-value">
                <input
                  type="date"
                  class="outlined form-control"
                  v-model="form.items[findIndexItems(insured.partyId)].birthDate"
                />
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <p class="data-title mb-1">Jenis Kelamin</p>
              <v-select
                :items="optionGender"
                dense
                outlined
                item-value="value"
                item-text="name"
                class="gender_option"
                v-model="form.items[findIndexItems(insured.partyId)].gender"
              ></v-select>
            </div>
          </div>
          
          <div class="row">
            <div class="col-12">
              <p class="data-title mb-2">Unggah Foto Selfie dengan KTP : {{
                    insured
                      ? $isNullWithSpace(
                          insured.person.firstName
                        ) +
                        $isNullWithSpace(
                          insured.person.midName
                        ) +
                        $isNullWithSpace(
                          insured.person.lastName
                        )
                      : ""
                  }}</p>
              <input
                type="file"
                :id="'inputSelfieKtpImage-' + findIndexItems(insured.partyId)"
                v-show="false"
                accept="image/*"
                @change="(e) => addSelfieKtpImage(e, findIndexItems(insured.partyId))"
              />
              <button
                class="btn btn-primary-outlined"
                @click.prevent="$el.querySelector('#inputSelfieKtpImage-' + findIndexItems(insured.partyId)).click()"
              >
                Unggah
              </button>
              <small>{{ form.items[findIndexItems(insured.partyId)].ktpSelfieAttachment.name }}</small>
              <br />
              <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <v-radio-group
                v-model="form.items[findIndexItems(insured.partyId)].familyAttachment"
                row
                @change="form.items[findIndexItems(insured.partyId)].documentAttachment = {}"
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
            <div class="col-12">
              <p class="data-title mb-2">
                {{
                  form.items[findIndexItems(insured.partyId)].familyAttachment === "IJAZAH"
                    ? "Ijazah"
                    : "Akte Kelahiran"
                }} : {{
                    insured
                      ? $isNullWithSpace(
                          insured.person.firstName
                        ) +
                        $isNullWithSpace(
                          insured.person.midName
                        ) +
                        $isNullWithSpace(
                          insured.person.lastName
                        )
                      : ""
                  }}
              </p>
              <input
                type="file"
                :id="'inputDocumentImage-' + findIndexItems(insured.partyId)"
                v-show="false"
                accept="image/*"
                @change="(e) => addDocumentImage(e, findIndexItems(insured.partyId))"
              />
              <button
                class="btn btn-primary-outlined"
                @click.prevent="$el.querySelector('#inputDocumentImage-' + findIndexItems(insured.partyId)).click()"
              >
                Unggah
              </button>
              <small>{{ form.items[findIndexItems(insured.partyId)].documentAttachment.name }}</small>
              <br />
              <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>          
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <p class="data-title mb-2">Unggah Foto KTP : {{
                    insured
                      ? $isNullWithSpace(
                          insured.person.firstName
                        ) +
                        $isNullWithSpace(
                          insured.person.midName
                        ) +
                        $isNullWithSpace(
                          insured.person.lastName
                        )
                      : ""
                  }}</p>
              <input
                type="file"
                :id="'inputKtpImage-' + findIndexItems(insured.partyId)"
                v-show="false"
                accept="image/*"
                @change="(e) => addKtpImage(e, findIndexItems(insured.partyId))"
              />
              <button
                class="btn btn-primary-outlined"
                @click.prevent="$el.querySelector('#inputKtpImage-' + findIndexItems(insured.partyId)).click()"
              >
                Unggah
              </button>
              <small>{{ form.items[findIndexItems(insured.partyId)].ktpAttachment.name }}</small>
              <br />
              <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            </div>
          </div>
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
                <li>- Akan ada kemungkinan perubahan Premi</li>
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
      radios: [
        { label: "Ijazah", value: "IJAZAH" },
        {
          label: "Akte Kelahiran",
          value: "BIRTHCERTIFICATE",
        },
      ],
      form: {
        items: []
      },
      insuredSelected: [],
      showMe: true,
      table: {
        headers: [
          {
            text: "Nama Tertanggung",
            value: "person",
          },
          {
            text: "Jenis Kelamin",
            value: "gender",
          },
          {
            text: "Tanggal Lahir",
            value: "birthday",
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
      title: "Perubahan Data Tanggal Lahir & Jenis Kelamin",
      sub: "Pengajuan Perubahan Data Tanggal Lahir & Jenis Kelamin",
    });
  },
  mounted() {
    this.resetData()
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    optionGender() {
      return ["M", "F"].map((item) => {
        return {
          'name': item == "M" ? ("Laki Laki").toUpperCase() : ("Perempuan").toUpperCase(),
          'value': item
        }
      })
    }
  },
  methods: {
    async addSelfieKtpImage(e, index) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadAttachment",
          { file: e.target.files[0], type: "KTPSELFIE" }
        );
        this.form.items[index].ktpSelfieAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addKtpImage(e, index) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadKtpFile",
          { file: e.target.files[0] }
        );
        this.form.items[index].ktpAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addDocumentImage(e, index) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadDocumentFile",
          { file: e.target.files[0] }
        );
        this.form.items[index].documentAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    resetData() {
      this.form.items = this.myPolicy.policyWithCode.insureds.map(x => ({
        partyId: x.partyId,
        birthDate: this.$formatDateField(x.person.birthday),
        gender: x.person.gender,
        ktpSelfieAttachment: {},
        ktpAttachment: {},
        documentAttachment: {},
        familyAttachment: "BIRTHCERTIFICATE"
      }));
    },
    findIndexItems(partyId) {
      return this.form.items.findIndex(x => x.partyId == partyId)
    },
    validate() {
      this.validationMessage = [];
      if (this.form.items.length < 1) {
        this.validationMessage.push("Perubahan tidak terdeteksi");

      }
      for (let i = 0; i < this.form.items.length; i++){
        if (!this.form.items[i].ktpSelfieAttachment.name) {
          const isInclude = this.validationMessage.includes("Unggah Selfie + KTP diperlukan")
          if (!isInclude) this.validationMessage.push("Unggah Selfie + KTP diperlukan")
        }
        if (!this.form.items[i].ktpAttachment.name) {
          const isInclude = this.validationMessage.includes("Unggah KTP diperlukan")
          if (!isInclude) this.validationMessage.push("Unggah KTP diperlukan");
        }
        if (!this.form.items[i].documentAttachment.name) {
          const isInclude = this.validationMessage.includes("Unggah Akta / Ijazah diperlukan")
          if (!isInclude) this.validationMessage.push("Unggah Akta / Ijazah diperlukan");
        }
      }
    },
    save() {
      const partiesChoosen = this.insuredSelected.map(x => x.partyId)
      this.form.items = this.form.items.filter(x => partiesChoosen.includes(x.partyId));
      this.validate();

      if (this.validationMessage.length) {
        // reset data
        this.resetData()
        return false;
      };

      this.$store.commit(
        "submission_transaction/change_birth_date_and_gender/setChangeBirthDateAndGender",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/change/birth-and-gender/resume",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .gender_option {
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