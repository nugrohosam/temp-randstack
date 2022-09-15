<template>
  <v-dialog v-model="isShow" :max-width="1000" content-class="modal-health">
    <div class="modal-health-body">
      <h2>Formulir Pernyataan Kesehatan</h2>

      <br />

      <div class="d-none d-md-block">
        <div class="row">
          <div class="col-8">
            <p>Pertanyaan</p>
          </div>
          <div class="col-2">
            <p>Tertanggung</p>
          </div>
          <div class="col-2">
            <p>Pemegang Polis</p>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-8 d-flex" style="align-items: center">
              <h4>{{ healthQuestionaire[0].pertanyaan }}</h4>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <v-radio-group v-model="healthQuestionaire[0].tertanggung" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <v-radio-group v-model="healthQuestionaire[0].pemegang_polis" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <h4>
                Sejak Polis tersebut di atas berlaku apakah Tertanggung/Pemegang
                Polis
              </h4>
            </div>
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionaire[1].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <v-radio-group v-model="healthQuestionaire[1].tertanggung" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <v-radio-group v-model="healthQuestionaire[1].pemegang_polis" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionaire[2].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <v-radio-group v-model="healthQuestionaire[2].tertanggung" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <v-radio-group v-model="healthQuestionaire[2].pemegang_polis" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionaire[3].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <v-radio-group v-model="healthQuestionaire[3].tertanggung" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <v-radio-group v-model="healthQuestionaire[3].pemegang_polis" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <h4>
                Apakah Tertanggung/Pemegang Polis mempunyai kebiasaan sebagai
                berikut:
              </h4>
            </div>
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionaire[4].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <v-radio-group v-model="healthQuestionaire[4].tertanggung" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <v-radio-group
                v-model="healthQuestionaire[4].pemegang_polis"
                row
                @change="healthQuestionaire[4].pemegang_polis_number = null"
              >
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
              <input
                v-if="healthQuestionaire[4].pemegang_polis"
                class="outlined form-control"
                type="number"
                v-model="healthQuestionaire[4].pemegang_polis_number"
              />
            </div>
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionaire[5].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <v-radio-group v-model="healthQuestionaire[5].tertanggung" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <v-radio-group v-model="healthQuestionaire[5].pemegang_polis" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionaire[6].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <v-radio-group
                v-model="healthQuestionaire[6].tertanggung"
                row
                @change="healthQuestionaire[6].tertanggung_number = null"
              >
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
              <input
                v-if="healthQuestionaire[6].tertanggung"
                class="outlined form-control"
                type="number"
                v-model="healthQuestionaire[6].tertanggung_number"
              />
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <v-radio-group v-model="healthQuestionaire[6].pemegang_polis" row>
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body row">
          <div class="col-12 col-md-8">
            <h4>{{ healthQuestionaire[7].pertanyaan }}</h4>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Tertanggung</p>
            <v-radio-group v-model="healthQuestionaire[7].tertanggung" row>
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Pemegang Polis</p>
            <v-radio-group v-model="healthQuestionaire[7].pemegang_polis" row>
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body row">
          <div class="col-12 col-md-8">
            <ul>
              <li>{{ healthQuestionaire[8].pertanyaan }}</li>
            </ul>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Tertanggung</p>
            <v-radio-group v-model="healthQuestionaire[8].tertanggung" row>
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Pemegang Polis</p>
            <v-radio-group v-model="healthQuestionaire[8].pemegang_polis" row>
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
          </div>
          <div class="col-12 col-md-8">
            <ul>
              <li>{{ healthQuestionaire[9].pertanyaan }}</li>
            </ul>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Tertanggung</p>
            <v-radio-group v-model="healthQuestionaire[9].tertanggung" row>
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Pemegang Polis</p>
            <v-radio-group v-model="healthQuestionaire[9].pemegang_polis" row>
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body row">
          <div class="col-12">
            <h4>Hanya Untuk Wanita</h4>
          </div>
          <div class="col-12 col-md-8">
            <ul>
              <li>{{ healthQuestionaire[10].pertanyaan }}</li>
            </ul>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Tertanggung</p>
            <v-radio-group v-model="healthQuestionaire[10].tertanggung" row>
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Pemegang Polis</p>
            <v-radio-group
              v-model="healthQuestionaire[10].pemegang_polis"
              row
              @change="healthQuestionaire[10].pemegang_polis_number = null"
            >
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
            <input
              v-if="healthQuestionaire[10].pemegang_polis"
              class="outlined form-control"
              type="number"
              v-model="healthQuestionaire[10].pemegang_polis_number"
            />
          </div>
          <div class="col-12 col-md-8">
            <ul>
              <li>{{ healthQuestionaire[11].pertanyaan }}</li>
            </ul>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Tertanggung</p>
            <v-radio-group v-model="healthQuestionaire[11].tertanggung" row>
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Pemegang Polis</p>
            <v-radio-group v-model="healthQuestionaire[11].pemegang_polis" row>
              <v-radio
                v-for="(item, index) in radios"
                :key="index"
                color="#F15921"
                v-bind="item"
              ></v-radio>
            </v-radio-group>
          </div>
          <div class="col-12 col-md-8">
            <ul>
              <li>{{ healthQuestionaire[12].pertanyaan }}</li>
            </ul>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Tertanggung</p>
            <input
              class="outlined form-control"
              type="date"
              v-model="healthQuestionaire[12].tertanggung_date"
            />
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Pemegang Polis</p>
            <input
              class="outlined form-control"
              type="date"
              v-model="healthQuestionaire[12].pemegang_polis_date"
            />
          </div>
          <div class="col-12 col-md-8">
            <ul>
              <li>{{ healthQuestionaire[13].pertanyaan }}</li>
            </ul>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Tertanggung</p>
            <input
              class="outlined form-control"
              type="date"
              v-model="healthQuestionaire[13].tertanggung_date"
            />
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Pemegang Polis</p>
            <input
              class="outlined form-control"
              type="date"
              v-model="healthQuestionaire[13].pemegang_polis_date"
            />
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body row">
          <div class="col-12 col-md-8">
            <ul>
              <li>{{ healthQuestionaire[14].pertanyaan }}</li>
            </ul>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Tertanggung</p>
            <input
              class="outlined form-control"
              type="number"
              v-model="healthQuestionaire[14].tertanggung_date_number"
            />
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Pemegang Polis</p>
            <input
              class="outlined form-control"
              type="number"
              v-model="healthQuestionaire[14].pemegang_polis_number"
            />
          </div>
          <div class="col-12 col-md-8">
            <ul>
              <li>{{ healthQuestionaire[15].pertanyaan }}</li>
            </ul>
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Tertanggung</p>
            <input
              class="outlined form-control"
              type="number"
              v-model="healthQuestionaire[15].tertanggung_date_number"
            />
          </div>
          <div class="col-12 col-md-2">
            <p class="d-block d-md-none">Pemegang Polis</p>
            <input
              class="outlined form-control"
              type="number"
              v-model="healthQuestionaire[15].pemegang_polis_number"
            />
          </div>
        </div>
      </div>

      <div v-if="!preview" class="d-flex flex-row-reverse">
        <button class="btn btn-primary btn-save mb-0" @click="submit">
          Submit
        </button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: Array,
      default: () => [],
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: this.show,
      radios: [
        { label: "Ya", value: true },
        { label: "Tidak", value: false },
      ],
      healthQuestionaire: [
        {
          pertanyaan:
            "Apakah Tertanggung/Pemegang Polis sekarang dalam keadaaan sehat?",
          tertanggung: null,
          pemegang_polis: null,
        },
        {
          pertanyaan:
            "Pernah berkonsultasi dengan dokter, dirawat di Rumah Sakit, menjalani operasi atau mendapat perawatan?",
          tertanggung: null,
          pemegang_polis: null,
        },
        {
          pertanyaan:
            "Pernah dianjurkan oleh dokter atau pernah melakukan pemeriksaan kesehatan diagnostic, check up seperti : sinar X, MRI, USG, CT scan,",
          tertanggung: null,
          pemegang_polis: null,
        },
        {
          pertanyaan: "Menderita cacat atau kelainan fisik?",
          tertanggung: null,
          pemegang_polis: null,
        },
        {
          pertanyaan: "Merokok? Jika YA, berapa batang dalam sehari?",
          tertanggung: null,
          pemegang_polis: null,
          pemegang_polis_number: null,
        },
        {
          pertanyaan: "Menggunakan obat bius/narkotik ,obat/zat terlarang?",
          tertanggung: null,
          pemegang_polis: null,
        },
        {
          pertanyaan: "Minum alkohol? Jika YA, berapa banyak dalam seminggu?",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_number: null,
        },
        {
          pertanyaan:
            "Apakah kondisi kesehatan Tertanggung/Pemegang Polis sekarang dalam keadaan terganggu, memerlukan atau dianjurkan operasi atau dalam perawatan dokter /makan obat untuk alasan apapun?",
          tertanggung: null,
          pemegang_polis: null,
        },
        {
          pertanyaan:
            "Apakah Tertanggung sering melakukan kegiatan penerbangan komersial/non-komersial?",
          tertanggung: null,
          pemegang_polis: null,
        },
        {
          pertanyaan:
            "Apakah Tertanggung pernah atau bermaksud ikut dalam olah raga yang beresiko tinggi ? (Balap mobil, terjun payung, dll) /",
          tertanggung: null,
          pemegang_polis: null,
        },
        {
          pertanyaan: "Apakah Anda sekarang sedang hamil? bila YA, bulan",
          tertanggung: null,
          pemegang_polis: null,
          pemegang_polis_number: null,
        },
        {
          pertanyaan:
            "Apakah ada gangguan menstruasi atau menstruasi tidak teratur?",
          tertanggung: null,
          pemegang_polis: null,
        },
        {
          pertanyaan: "Tanggal terakhir menstruasi:",
          tertanggung_date: null,
          pemegang_polis_date: null,
        },
        {
          pertanyaan: "Tanggal terakhir Anda melahirkan:",
          tertanggung_date: null,
          pemegang_polis_date: null,
        },
        {
          pertanyaan: "Tinggi Badan (cm)",
          tertanggung_number: null,
          pemegang_polis_number: null,
        },
        {
          pertanyaan: "Berat Badan (kg)",
          tertanggung_number: null,
          pemegang_polis_number: null,
        },
      ],
    };
  },
  watch: {
    show(value) {
      this.isShow = this.show;
      if (this.show && this.defaultValue.length) {
        this.healthQuestionaire = this.defaultValue;
      }
    },
    isShow(value) {
      if (!value) this.$emit("close");
    },
  },
  methods: {
    isUndefined(value) {
      return typeof value === "undefined";
    },
    submit() {
      this.$emit("submit", this.healthQuestionaire);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-health {
  margin: 0;
}

.modal-health-body {
  background-color: white;
  padding: 1rem;

  @media screen and (min-width: 480px) {
    padding: 2rem;
  }
}

.outlined {
  width: inherit;
}

.card {
  position: relative;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
}
</style>
