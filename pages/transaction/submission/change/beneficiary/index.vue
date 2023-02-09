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
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-1">Perubahan Ahli Waris</p>
          <v-select
            :items="optionChanges"
            dense
            outlined
            item-value="value"
            item-text="name"
            class="changes_option"
            v-model="form.changes"
            @change="() => { resetData() }"
          ></v-select>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar rounded-lg">
              <ul>
                <li>Jika ingin merubah Persentase ahli waris, dapat memilih Ubah data dan langsung merubah persentase</li>
              </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="col-md-12">
            <p class="data-title">{{ form.changes == 'Hapus' ? "Pilih Ahli Waris Untuk Di Hapus" : "Ahli Waris Saat Ini" }}</p>
          </div>
          <template>
            <v-data-table
              :headers="table.headers"
              :items="myPolicy.policyWithCode.beneficiaries"
              mobile-breakpoint="480"
              hide-default-footer
              v-model="beneficiarySelected"
              item-key="partyId"
              :show-select="form.changes == 'Hapus' || form.changes == 'Penambahan / Revisi'"
              class="elevation-1"
              selectable-key="isSelectable"
              :single-select="form.changes == 'Penambahan / Revisi'"
              @input="(e) => { beneficiaryAddOrRevise(e) }"
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
              <template v-slot:item.percentage="{ item }">
                {{ (item.shareRate * 100) }}%
              </template>
              <template v-slot:item.birthday="{ item }">
                {{
                  $formatDate(item.person.birthday)
                }}
              </template>
              <template v-slot:item.gender="{ item }">
                {{ item.person.gender == "M" ? "Laki Laki" : "Perempuan" }}
              </template>
              <template v-slot:item.relationWithPolicyHolder="{ item }">
                {{ $labelRelationType(item.designation) }}
              </template>
              <template v-slot:body.append>
                <tr>
                  <td :colspan="form.changes != 'Ubah' ? (form.changes == '' ? '1' : '2') : '1'">Total</td>
                  <td :colspan="form.changes != 'Ubah' ? '5' : '5'">100%</td>
                </tr>
              </template>
            </v-data-table>
          </template>
        </div>
      </div>

      <div class="row" v-if="form.changes == 'Hapus' || form.changes == 'Ubah'">
        <div class="col-12">
          <div class="col-md-12">
            <p class="data-title">Ubah / Sesuaikan Prosentase Ahli Waris</p>
          </div>
          <template>
            <v-data-table
              :headers="table.headers"
              :items="restOfBeneficiaries"
              mobile-breakpoint="480"
              hide-default-footer
              class="elevation-1"
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
              <template v-slot:item.percentage="{ item }">
                <div class="form-input">
                  <input
                    type="number"
                    max="100"
                    min="0"
                    class="form-control"
                    v-model="form.changeItems[findIndexItems(item.partyId)].percentage"
                  />
                </div>
              </template>
              <template v-slot:item.birthday="{ item }">
                {{
                  $formatDate(item.person.birthday)
                }}
              </template>
              <template v-slot:item.gender="{ item }">
                {{ item.person.gender == "M" ? "Laki Laki" : "Perempuan" }}
              </template>
              <template v-slot:item.relationWithPolicyHolder="{ item }">
                {{ $labelRelationType(item.designation) }}
              </template>
              <template v-slot:body.append>
                <tr>
                  <td colspan="1">Total</td>
                  <td colspan="5">{{ form.changeItems.filter(x => !partyIdsBeneficiarySelected.includes(x.partyId)).map(x => +x.percentage).reduce((a, b) => a+b, 0) }}%</td>
                </tr>
              </template>
            </v-data-table>
          </template>
        </div>
      </div>

      <hr class="my-4" />
      
      <div class="row" v-if="form.changes == 'Penambahan / Revisi'">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Depan</p>
          <div class="form-input">
            <input
              type="text"
                pattern="[a-zA-Z.,\s]+"
              class="form-control"
              v-model="form.addItem.person.firstName"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nama Belakang</p>
          <div class="form-input">
            <input
              type="text"
                pattern="[a-zA-Z.,\s]+"
              class="form-control"
              v-model="form.addItem.person.lastName"
            />
          </div>
        </div>
      </div>

      <div class="row" v-if="form.changes == 'Penambahan / Revisi'">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Kartu Identitas</p>
          <div class="form-input">
            <v-select
              outlined
              dense
              item-text="name"
              item-value="value"
              :items="optionCertiType"
              v-model="form.addItem.person.certiType"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Nomor Identitas</p>
          <div class="form-input">
            <input
              type="text"
                pattern="[0-9a-zA-Z.,\s]+"
              class="form-control"
              v-model="form.addItem.person.certiCode"
            />
          </div>
        </div>
      </div>
      
      <div class="row" v-if="form.changes == 'Penambahan / Revisi'">
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Jenis Kelamin</p>
          <div class="form-input">
            <v-select
              outlined
              dense
              item-text="name"
              item-value="value"
              :items="optionGenders"
              v-model="form.addItem.person.gender"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tanggal Lahir</p>
          <div class="form-input">
            <input
              type="date"
              class="form-control"
              v-model="form.addItem.person.birthday"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Tempat lahir</p>
          <div class="form-input">
            <input
              type="text"
              pattern="[a-zA-Z.,\s]+"
              class="form-control"
              v-model="form.addItem.person.birthPlace"
            />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Status Perkawinan</p>
          <div class="form-input">
            <v-select
              outlined
              dense
              :items="options.martialStatus"
              v-model="form.addItem.person.maritalStatus"
            ></v-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <p class="data-title mb-2">Hubungan dengan Pemegang Polis</p>
          <div class="form-input">
            <v-select
              outlined
              dense
              item-text="name"
              item-value="value"
              :items="optionRelations"
              v-model="form.addItem.designation"
            ></v-select>
          </div>
        </div>
      </div>

      <div class="row" v-if="form.changes == 'Penambahan / Revisi' && !submitClicked">
        <div class="col-lg-12 col-sm-12">
          <button
            class="btn btn-primary-outlined"
            @click.prevent="addOrReviseBeneficiary()"
          >
            {{ beneficiarySelected.lenght > 0 ? "Submit" : "Tambah Ahli Waris"}}
          </button>
        </div>
      </div>
      
      <div class="row" v-if="form.changes == 'Penambahan / Revisi'">
        <div class="col-12">
          <div class="col-md-12">
            <p class="data-title">Ubah / Sesuaikan Prosentase Ahli Waris</p>
          </div>
          <template>
            <v-data-table
              :headers="table.headers"
              :items="form.changeItems"
              mobile-breakpoint="480"
              hide-default-footer
              class="elevation-1"
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
              <template v-slot:item.percentage="{ item }">
                <div class="form-input">
                  <input
                    type="number"
                    max="100"
                    min="0"
                    class="form-control"
                    v-model="form.changeItems[findIndexItems(item.partyId)].percentage"
                  />
                </div>
              </template>
              <template v-slot:item.birthday="{ item }">
                {{
                  $formatDate(item.person.birthday)
                }}
              </template>
              <template v-slot:item.gender="{ item }">
                {{ item.person.gender == "M" ? "Laki Laki" : "Perempuan" }}
              </template>
              <template v-slot:item.relationWithPolicyHolder="{ item }">
                {{ $labelRelationType(item.designation) }}
              </template>
              <template v-slot:body.append>
                <tr>
                  <td colspan="1">Total</td>
                  <td colspan="5">{{ form.changeItems.filter(x => !partyIdsBeneficiarySelected.includes(x.partyId)).map(x => +x.percentage).reduce((a, b) => a+b, 0) }}%</td>
                </tr>
              </template>
            </v-data-table>
          </template>
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

      <div class="row" v-if="form.changes == 'Penambahan / Revisi'">
        <div class="col-lg-6 col-sm-12">
          <ValidationProvider
            rules="required|image"
            v-slot="{ validate, errors }"
          >
            <p class="data-title mb-2">Unggah KTP Ahli Waris Baru</p>
            <input
              type="file"
              ref="inputBeneficiaryKtpImage"
              v-show="false"
              accept="image/*"
              @change="
                (e) => {
                  validate(e);
                  addBeneficiaryKtpImage(e);
                }
              "
            />
            <button
              class="btn btn-primary-outlined"
              @click.prevent="$refs.inputBeneficiaryKtpImage.click()"
            >
              Unggah
            </button>
            <small>{{ form.beneficiaryKtpAttachment.name }}</small>
            <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
            <br />
            <span class="text-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="data-title mb-2">
            {{
              "Kartu Keluarga" + (form.changes != "Penambahan / Revisi" ? " (Opsional)" : "")
            }}
          </p>
          <input
            type="file"
            ref="inputDocumentImage"
            v-show="false"
            accept="image/*"
            @change="(e) => addDocumentImage(e)"
          />
          <button
            class="btn btn-primary-outlined"
            @click.prevent="$refs.inputDocumentImage.click()"
          >
            Unggah
          </button>
          <small>{{ form.documentAttachment.name }}</small>
          <br />
          <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>          
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
        <div class="col-lg-12 col-sm-12">
          <div class="message-bar rounded-lg">
              <div class="d-flex">
                <info-icon class="ic-primary mr-2"></info-icon>
                Perhatian !
              </div>
              <br>
              <ul>
                <li>- Kesesuaian data Ahli Waris mohon di perhatikan!</li>
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

import {
  identityType,
  martialStatus,
} from "@/utils/constant";

import { SaveIcon, InfoIcon } from "vue-feather-icons";
import InfoPanel from "../../../../../components/InfoPanel.vue";

export default {
  components: {
    SaveIcon,
    InfoIcon,
    InfoPanel
  },  
  name: "change-beneficiary",
  data() {
    return {
      options: {
        identityType,
        martialStatus,
      },
      form: {
        changeItems: [],
        addItem: {},
        changes: "",
        ktpSelfieAttachment: {},
        documentAttachment: {},
        beneficiaryKtpAttachment: {},
        ktpAttachment: {},
      },
      submitClicked: false,
      beneficiarySelected: [],
      showMe: true,
      table: {
        headers: [
          {
            text: "Nama",
            value: "person",
          },
          {
            text: "Prosentase (%)",
            value: "percentage",
          },
          {
            text: "Tanggal Lahir",
            value: "birthday",
          },
          {
            text: "Jenis Kelamin",
            value: "gender",
          },
          {
            text: "Hubungan Dengan Pemegang Polis",
            value: "relationWithPolicyHolder",
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
      title: "Perubahan Data Ahli Waris",
      sub: "Pengajuan Perubahan Data Ahli Waris",
    });
  },
  mounted() {
    this.resetData()
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    partyIdsBeneficiarySelected() {
      if (this.form.changes == 'Hapus') {
        return this.beneficiarySelected.map(x => x.partyId);
      }

      return []
    },
    restOfBeneficiaries() {
      return this.myPolicy.policyWithCode.beneficiaries.filter(
        x => !this.partyIdsBeneficiarySelected.includes(x.partyId)
      )
    },
    optionChanges() {
      return ["Hapus", "Ubah", "Penambahan / Revisi"].map((item) => {
        return {
          'name': item,
          'value': item
        }
      })
    },
    optionGenders() {
      return ["M", "F"].map((item) => {
        return {
          'name': item == "M" ? "Laki-laki" : "Perempuan",
          'value': item
        }
      })
    },
    optionRelations() {
      return this.$relationType().map((item, index) => {
        return {
          'name': item,
          'value': index
        }
      })
    },
    optionCertiType() {
      return this.options.identityType.map((item, index) => {
        return {
          'name': item,
          'value': 1 + +index
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
    async addBeneficiaryKtpImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadBeneficiaryOwnerFile",
          { file: e.target.files[0] }
        );
        this.form.beneficiaryKtpAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    async addDocumentImage(e) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadDocumentFile",
          { file: e.target.files[0] }
        );
        this.form.documentAttachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    resetData() {
      this.beneficiarySelected = [];
      
      this.form.changeItems = this.restOfBeneficiaries.map(x => ({
        person: x.person,
        partyId: x.partyId,
        birthDate: this.$formatDateField(x.person.birthday),
        gender: x.person.gender,
        percentage: +(x.shareRate * 100),
        designation: x.designation
      }));

      this.form.addItem = {
        person: {
          firstName: "",
          midName: "",
          lastName: "",
          certiType: "",
          certiCode: "",
          gender: "",
          birthday: "",
          birthPlace: "",
          maritalStatus: ""
        },
        designation: "",
        percentage: "0",
      };

    },
    findIndexItems(partyId) {
      return this.form.changeItems.findIndex(x => x.partyId == partyId)
    },
    addOrReviseBeneficiary(){
      if (this.form.changes == 'Penambahan / Revisi') {
        const isRevise = this.form.changeItems.map(x => x.partyId).includes(this.form.addItem.partyId);
        if (isRevise){
          const indexBeneficiary = this.findIndexItems(this.form.addItem.partyId);
          this.form.changeItems.splice(indexBeneficiary, 1, { 
            ...this.form.addItem,
            percentage: +this.form.addItem.shareRate * 100
          });
        } else {
          this.form.changeItems.push({
            ...this.form.addItem,
            partyId: this.form.changeItems.length + 1 + "",
          })
        }
      }
      this.submitClicked = true;
    },
    beneficiaryAddOrRevise(value) {
      if (Array.isArray(value) && value.length > 0 && this.form.changes == 'Penambahan / Revisi') {
        const choosenItem = value[0];  
        this.form.addItem = {
          ...choosenItem,
          person: {
            ...choosenItem.person,
            birthday: this.$formatDateField(choosenItem.person.birthday),
            maritalStatus: choosenItem.person.marriageId != null ? 'KAWIN' : 'BELUM KAWIN'
          },
        };
      } else if (Array.isArray(value) && value.length == 0) {
        this.form.addItem = {
          person: {
            firstName: "",
            midName: "",
            lastName: "",
            certiType: "",
            certiCode: "",
            gender: "",
            birthday: "",
            birthPlace: "",
            maritalStatus: ""
          },
          designation: "",
          percentage: "0",
        };     
      }
    },
    validate() {
      this.validationMessage = [];
      const percentage = this.form.changeItems.map(x => +x.percentage).reduce((a, b) => a + b, 0);
      if (percentage != 100) {
        this.validationMessage.push("Total persentase harus 100%");
      }
      if (!this.form.ktpSelfieAttachment.name) {
        this.validationMessage.push("Unggah Selfie + KTP diperlukan");
      }
      if (!this.form.ktpAttachment.name) {
        this.validationMessage.push("Unggah KTP diperlukan");
      }
      if (this.form.changes == 'Penambahan / Revisi' && !this.form.documentAttachment.name) {
        this.validationMessage.push("Unggah Kartu Keluarga diperlukan");
      }
    },
    save() {
      this.form.changeItems = this.form.changeItems.filter(x => !this.partyIdsBeneficiarySelected.includes(x.partyId));
      this.validate();

      if (this.validationMessage.length) {
        return false;
      };

      this.$store.commit(
        "submission_transaction/change_beneficiary/setChangeBeneficiary",
        this.form
      );
      this.$router.push({
        path: "/transaction/submission/change/beneficiary/resume",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .changes_option {
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