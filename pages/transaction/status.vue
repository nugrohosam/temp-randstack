<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="page-header">
              <h3 class="page-title">{{ current_header_title }}</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="page-body">
              <template v-if="table.items">
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <v-text-field
                    class="search-bar"
                    hide-details
                    prepend-icon="mdi-magnify"
                    single-line
                    placeholder="Cari Data"
                    flat
                    solo
                    v-model="data_search"
                  ></v-text-field>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <template>
                    <v-data-table
                      :headers="table.headers"
                      :items="table.items"
                      :page.sync="page"
                      :items-per-page="itemsPerPage"
                      :search="data_search"
                      mobile-breakpoint="480"
                      hide-default-footer
                      @page-count="pageCount = $event"
                    >
                      <template v-slot:item.actions="{ item }">
                        <button
                          v-if="item.status == 3 || item.status == 'Pending'"
                          class="btn btn-primary btn-table"
                          @click="() => { 
                            uploadDialog = true; 
                            form.transaction_id = item.pengajuanTransactionId;
                            form.service_id = item.serviceId;
                          }"
                        >
                          Lengkapi
                        </button>
                      </template>
                      <template v-slot:item.status="{ item }">
                        <a class="bni-primary" @click.prevent="showTransactionStatusDetail(item.status != 'Done' ? item.errorMessage : '')">
                          <b>{{item.status}}  
                            <info-icon v-if="item.status == 'Gagal'" style="position:relative; bottom:-3px;" size="1.3x" bottom="10px"></info-icon>
                            <info-icon v-if="item.status == 'Pending'" style="position:relative; bottom:-3px;" size="1.3x" bottom="10px"></info-icon>
                          </b>
                        </a>
                      </template>
                      <template v-slot:item.createdAt="{ item }">
                        {{ $moment(item.createdAt).format("DD/MM/Y") }}
                      </template>
                      <template v-slot:item.name="{ item }">
                        <a
                          @click.prevent="showDetail(item)"
                          class="bni-primary"
                        >
                          {{ item.name }}
                        </a>
                      </template>
                    </v-data-table>
                  </template>
                  <div
                    class="row pt-2 d-flex"
                    style="justify-content: space-between"
                  >
                    <div class="col-md-4 d-none d-md-block"></div>
                    <div class="col-md-4 col-6">
                      <v-pagination
                        v-model="page"
                        :length="pageCount"
                        color="#F15921"
                      ></v-pagination>
                    </div>
                    <div class="col-md-4 col-6">
                      <div class="row">
                        <div class="col-md-6 d-none d-md-block">
                          <v-subheader>Per Page </v-subheader>
                        </div>
                        <div class="col-md-6 col-12">
                          <v-select
                            :items="limitPages"
                            :value="itemsPerPage"
                            @change="itemsPerPage = parseInt($event, 10)"
                            label="Solo field"
                            solo
                          ></v-select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
            </div>

          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="detailDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Detail</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-card-text>
            <p class="detail-value">
              {{ transaction_detail.message }}
            </p>
            <p class="detail-title">
              Jika tidak sesuai dapat menghubungi Customer Care 1-500-045
            </p>
          </v-card-text>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="statusDetail.show" :max-width="1000" >
      <v-card>
        <v-card-title class="text-h5">Detail</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-card-text>
            <p class="detail-value">
              {{ statusDetail.message }}
            </p>
            <p class="detail-title">
              Jika tidak sesuai dapat menghubungi Customer Care 1-500-045
            </p>
          </v-card-text>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Upload Dialog -->
    <v-dialog v-model="uploadDialog">
      <v-card>
        <v-card-title class="text-h5">Reupload Dokumen</v-card-title>

        <div class="card-body" v-for="(item, index) in form.documents" :key="index">
          <br v-if="index > 0">
          <v-divider v-if="index > 0"></v-divider>
          <br v-if="index > 0">

          <div class="row" v-if="index > 0">
            <div class="col-12">
              <button
                class="btn btn-primary btn-danger float-right"
                @click.prevent="removeDocument(index)"
              >
                X
              </button>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 col-sm-12">
              <p class="data-title mb-2">Nama Dokumen ke-{{ index+1 }}</p>
                <div class="form-input">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.documents[index].name"
                  />
              </div>
            </div>
          </div>
            
          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <ValidationProvider
                rules="required|image"
                v-slot="{ validate, errors }"
              >
                <p class="data-title mb-2">Unggah Dokumen ke-{{ index+1 }}</p>
                <input
                  type="file"
                  :id="'inputDocumentImage-' + index"
                  v-show="true"
                  accept="image/*"
                  @change="
                    (e) => {
                      validate(e);
                      inputDocumentImage(e, index);
                    }
                  "
                />
                <small>Format file jpg, jpeg, dan png. Maksimal 7MB</small>
                <br />
                <span class="text-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <br v-if="index == form.documents.length - 1">
          <v-divider v-if="index == form.documents.length - 1"></v-divider>
          <br v-if="index == form.documents.length - 1">

          <div class="row" v-if="index == form.documents.length - 1">
            <div class="col-12">
              <button
                class="btn btn-primary btn-save float-right"
                @click.prevent="addDocument()"
              >
                + Dokumen
              </button>
            </div>
          </div>

          <ValidationMessage v-if="index == form.documents.length - 1" :validation-message="validationMessage" />

          <div class="row" v-if="index == form.documents.length - 1">
            <div class="col-12">
              <button
                class="btn btn-primary btn-save float-left"
                @click.prevent="submit()"
              >
                Submit
              </button>
            </div>
          </div>
          
        </div>
        
      </v-card>
    </v-dialog>
  </div>

</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { SaveIcon, InfoIcon } from "vue-feather-icons";
export default {
  mounted() {
    this.getData();
    if ($nuxt.$route.name != "transaction-status") {
      this.showMenu = false;
    } else {
      this.showMenu = true;
      this.current_header_title = this.default_header_title;
    }
  },
  components: {
    SaveIcon,
    InfoIcon
  },
  data() {
    return {
      overlay: false,
      data_search: "",
      showMenu: true,
      default_header_title: "Status Transaksi",
      current_header_title: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      limitPages: [5, 10, 15, 20, 25],
      detailDialog: false,
      uploadDialog: false,
      validationMessage: [],
      transaction_detail: {
        message: "",
        account_number: "",
        holder_name: "",
        bank: "",
        status: "",
      },
      form: {
        documents: [{
          name: null,
          attachment: {},
        }],
        transaction_id: null,
        service_id: null,
      },
      statusDetail: {
        show: false,
        message: ""
      },

      table: {
        headers: [
          {
            text: "ID Pengajuan",
            align: "start",
            value: "pengajuanTransactionId",
          },
          { text: "Tgl Pengajuan", value: "createdAt" },
          { text: "Nama Transaksi", value: "transactionName" },
          { text: "Status", value: "status" },
          { text: "Dokumen", value: "documentAttachment" },
          { text: "Edit", value: "actions" },
        ],
        items: null,
      },
      modal: {
        message: "",
        show: false,
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      data: "transaction_status/getTransactionStatusList",
    }),
  },
  methods: {
    showUpload(item) {},
    async showDetail(item) {
      const detail = await this.$store.dispatch(
        "transaction_status/getTransactionStatusDetail",
        {
          id: item.submission_id,
        }
      );
      this.detailDialog = true;
      this.transaction_detail = detail;
    },
    async inputDocumentImage(e, i) {
      if (e.target.files[0]) {
        const result = await this.$store.dispatch(
          "submission_transaction/uploadDocumentFile",
          { file: e.target.files[0] }
        );
        this.form.documents[i].attachment = {
          file: e.target.files[0],
          name: result.name,
        };
      }
    },
    validate: async function () {
      this.validationMessage = [];
      for (let i = 0; i < this.form.documents.length; i++){
        if (!this.form.documents[i].name || this.form.documents[i].name == ""){
          this.validationMessage.push(
            "Nama dokumen ke-"+ (i+1) +" harus diisi"
          );
        }
        if (!this.form.documents[i].attachment.name){
          this.validationMessage.push(
            "Upload file ke-" + (i+1)
          );
        }
      }
    },
    async submit() {
      this.validate();
      if (this.validationMessage.length <= 0) {
        this.uploadDialog = false;
        this.$store.commit(
          "submission_transaction/reupload_document/setReuploadDocument",
          this.form
        );
        const result = await this.$store.dispatch(
          "submission_transaction/reupload_document/reuploadDocument"
        );
        if (result && result.success == true) {
          this.$router.push({
            path: "/transaction/status",
          });
        }
      }
    },
    addDocument: function () {
      this.form.documents.push({
        name: "",
        attachment: {},
      });
    },
    removeDocument: function (index) {
      this.form.documents.splice(index, 1)
    },
    async getData() {
      const list = await this.$store.dispatch(
        "transaction_status/getTransactionStatusList"
      );
      this.table.items = list.items;
    },
    showTransactionStatusDetail: function(message){
      this.statusDetail.show = true;
      this.statusDetail.message = message;
    }
  },
};
</script>
<style lang="scss" scoped>
.btn-table {
  margin: 0;
  height: 30px;
}
p.detail-value {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* Text/Normal */
  color: #2e343d;
  margin-bottom: 30px;
}
p.detail-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  color: #767676;
  margin: 0;
}
.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
}
</style>
