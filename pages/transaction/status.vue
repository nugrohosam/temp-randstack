<template>
  <div>
    <div class="row">
      <div class="col-12">
        <!-- Head -->
        <div class="row">
          <div class="col-12">
            <div class="page-header">
              <h3 class="page-title">{{ current_header_title }}</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- Search -->
          <div class="col-12">
            <div class="page-body">
              <!-- Transaction Status Menu -->
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <!-- <v-toolbar> -->
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
                  <!-- </v-toolbar> -->
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
                      mobile-breakpoint="0"
                      hide-default-footer
                      @page-count="pageCount = $event"
                    >
                      <template v-slot:item.actions="{ item }">
                        <button
                          class="btn btn-primary btn-table"
                          @click="showUpload(item)"
                        >
                          Lengkapi
                        </button>
                      </template>
                      <template v-slot:item.status="{ item }">
                        <a
                          @click.prevent="showDetail(item)"
                          class="bni-primary"
                          >{{ item.status }}</a
                        >
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="text-center">

    </div> -->
    <!-- Details Dialog -->
    <v-dialog v-model="detailDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Detail</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-card-text>
            <p class="detail-value">
              {{ transaction_detail.message }}
            </p>

            <p class="detail-title">Nomor Rekening</p>
            <p class="detail-value">{{ transaction_detail.account_number }}</p>

            <p class="detail-title">Nama Pemegang Rekening</p>
            <p class="detail-value">{{ transaction_detail.holder_name }}</p>

            <p class="detail-title">Bank</p>
            <p class="detail-value">{{ transaction_detail.bank }}</p>

            <p class="detail-title">
              Jika tidak sesuai dapat menghubungi Customer Care 1-500-045
            </p>
          </v-card-text>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Upload Dialog -->
    <v-dialog v-model="uploadDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Upload</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text>Cancel</v-btn>
          <v-btn color="blue darken-1" text>Upload</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Temp Overlay Loading -->
    <!-- <div class="text-center">
      <v-overlay :value="overlay" color="rgba(250, 250, 250, 0.9)">
        <v-progress-circular indeterminate size="64" color="#F15921"></v-progress-circular>
      </v-overlay>
    </div> -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
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
      transaction_detail: {
        message: "",
        account_number: "",
        holder_name: "",
        bank: "",
        status: "",
      },
      table: {
        headers: [
          {
            text: "ID Pengajuan",
            align: "start",
            value: "submission_id",
          },
          { text: "Tgl Pengajuan", value: "date" },
          { text: "Nama Transaksi", value: "name" },
          { text: "Status", value: "status" },
          { text: "Dokumen", value: "document" },
          { text: "Edit", value: "actions" },
        ],
        items: [],
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
      this.overlay = true;
      const detail = await this.$store.dispatch(
        "transaction_status/getTransactionStatusDetail",
        {
          id: item.submission_id,
        }
      );
      this.detailDialog = true;
      this.overlay = false;
      // mapping detail if has different format with response
      this.transaction_detail = detail;
    },

    async getData() {
      const list = await this.$store.dispatch(
        "transaction_status/getTransactionStatusList"
      );
      console.log(list);
      // mapping if list has different format with response
      this.table.items = list;
    },
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
</style>
