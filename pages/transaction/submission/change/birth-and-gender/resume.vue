<template>
  <div>
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

    <hr class="my-4" />

    <div class="row">
      <div class="col-12">
        <div class="col-md-12">
          <p class="data-title">Informasi Tanggal dan Jenis Kelamin Tertanggung</p>
        </div>
        <template>
          <v-data-table
            :headers="tableSebelum.headers"
            :items="
              myPolicy.policyWithCode.insureds.length > 0
                ? myPolicy.policyWithCode.insureds
                : []
            "
            mobile-breakpoint="480"
            hide-default-footer
            v-model="insuredSelected"
            item-key="partyId"
            class="elevation-1"
          >
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
    
    <hr class="my-4" />
    
    <div class="row">
      <div class="col-12">
        <div class="col-md-12">
          <p class="data-title">Informasi Tanggal dan Jenis Kelamin Tertanggung Dirubah</p>
        </div>
        <template>
          <v-data-table
            :headers="tableSesudah.headers"
            :items="
              getChangeBirthDateAndGender.items.length > 0
                ? getChangeBirthDateAndGender.items
                : []
            "
            mobile-breakpoint="480"
            hide-default-footer
            item-key="partyId"
            class="elevation-1"
          >
            <template v-slot:item.person="{ item }">
              {{
                item
                  ? $isNullWithSpace(
                      myPolicy.policyWithCode.insureds.find(x => x.partyId == item.partyId).person.firstName
                    ) +
                    $isNullWithSpace(
                      myPolicy.policyWithCode.insureds.find(x => x.partyId == item.partyId).person.midName
                    ) +
                    $isNullWithSpace(
                      myPolicy.policyWithCode.insureds.find(x => x.partyId == item.partyId).person.lastName
                    )
                  : ""
              }}
            </template>
            <template v-slot:item.gender="{ item }">
              {{ item.gender == "M" ? "Laki Laki" : "Perempuan" }}
            </template>
            <template v-slot:item.birthday="{ item }">
              {{
                $formatDate(item.birthDate)
              }}
            </template>
            <template v-slot:item.document="{ item }">
              <b
                style="cursor:pointer; text-color:orange"
                @click="showKtpSelfiePreview(findIndexItems(item.partyId))"
              >
                Selfie KTP
              </b>
              &nbsp
              <b
                style="cursor:pointer; text-color:orange"
                @click="showKtpPreview(findIndexItems(item.partyId))"
              >
                KTP
              </b>
              &nbsp
              <b
                style="cursor:pointer; text-color:orange"
                @click="showDocumentPreview(findIndexItems(item.partyId))"
              >
                Akte/Ijazah
              </b>
            </template>
          </v-data-table>
        </template>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted1"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya menyetujui transaksi dan kebenaran data yang disampaikan.
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-sm-12 d-flex">
        <v-checkbox
          v-model="accepted2"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
        ></v-checkbox>
        <p>
          Saya <b>tertanggung</b> telah mengisi perubahan <b>Tanggal lahir dan/atau jenis kelamin tertanggung</b> dengan benar dan tanpa paksaan, apabila dikemudian hari ditemukan kesalahan pengisian maka saya siap menanggung segala risiko dan akibatnya
        </p>
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
        <button class="btn btn-primary btn-save float-right" @click="submit">
          <save-icon></save-icon> Submit
        </button>
      </div>
    </div>

    <ModalImagePreview
      :src="image_preview.src"
      :show="image_preview.show"
      @closeImagePreview="image_preview.show = false"
    />
  </div>
</template>

<script>
import resumePageMixin from "@/mixins/resumePage";
import InfoPanel from "../../../../../components/InfoPanel.vue";
import { SaveIcon, InfoIcon } from "vue-feather-icons";

export default {
  components: {
    SaveIcon,
    InfoIcon,
    InfoPanel
  },
  mixins: [resumePageMixin],
  data() {
    return {
      accepted1: false,
      accepted2: false,
      tableSebelum: {
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
      tableSesudah: {
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
          {
            text: "Document",
            value: "document",
          },
        ],
      },
      validationMessage: [],
      image_preview: {
        src: "",
        show: false,
      },
    };
  },
  beforeMount() {
    this.$store.commit("submission_transaction/setCurrentHeaderTitle", {
      title: "Resume Perubahan Data Pekerjaan Tertanggung",
      sub: "Perubahan Data Pekerjaan Tertanggung",
    });
  },
  computed: {
    myPolicy() {
      return this.$store.getters["submission_transaction/getMyPolicy"];
    },
    getChangeBirthDateAndGender() {
      return this.$store.getters[
        "submission_transaction/change_birth_date_and_gender/getChangeBirthDateAndGender"
      ];
    },
  },
  methods: {
    findIndexItems(partyId) {
      return this.getChangeBirthDateAndGender.items.findIndex(x => x.partyId == partyId)
    },
    showKtpSelfiePreview: function (index) {
      if (this.getChangeBirthDateAndGender.items[index].ktpSelfieAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeBirthDateAndGender.items[index].ktpSelfieAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showKtpPreview: function (index) {
      if (this.getChangeBirthDateAndGender.items[index].ktpAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeBirthDateAndGender.items[index].ktpAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    showDocumentPreview: function (index) {
      if (this.getChangeBirthDateAndGender.items[index].documentAttachment.file) {
        this.image_preview.src = URL.createObjectURL(
          this.getChangeBirthDateAndGender.items[index].documentAttachment.file
        );
        this.image_preview.show = true;
      }
    },
    validate: async function () {
      this.validationMessage = [];
      if (!this.accepted1 || !this.accepted2) {
        this.validationMessage.push(
          "Setujui transaksi untuk memproses pengajuan"
        );
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        const result = await this.$store.dispatch(
          "submission_transaction/change_birth_date_and_gender/changeBirthDateAndGender"
        );
        if (result && result.success == true) {
          let transactionIds = result.data.transactionIds;
          this.$router.push({
            path:
              "/transaction/submission/change/birth-and-gender/thankyou?transaction_ids=" +
              transactionIds.join(","),
          });
        }
      }
    },
  },
};
</script>