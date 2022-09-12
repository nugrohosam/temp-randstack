<template>
  <v-dialog v-model="isShow" :max-width="1000">
    <div class="modal">
      <h2>Formulir Pernyataan Kesehatan</h2>

      <hr class="my-4"> <br>

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

      <div v-for="(item, index) in formOptions" :key="index">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-8 d-flex" style="align-items: center;">
                <h4>{{item.pertanyaan}}</h4>
              </div>
              <div class="col-2">
                <v-radio-group v-if="!isUndefined(item.tertanggung)" v-model="item.tertanggung" row>
                  <v-radio
                    v-for="(item, index) in radios"
                    :key="index"
                    color="#F15921"
                    v-bind="item"
                  ></v-radio>
                </v-radio-group>
              </div>
              <div class="col-2">
                <v-radio-group v-if="!isUndefined(item.pemegang_polis)" v-model="item.pemegang_polis" row>
                  <v-radio
                    v-for="(item, index) in radios"
                    :key="index"
                    color="#F15921"
                    v-bind="item"
                  ></v-radio>
                </v-radio-group>
              </div>
            </div>

            <template v-if="item.childs">
              <div v-for="(child, index) in item.childs" :key="index" class="row">
                <div class="col-8 d-flex" style="align-items: center;">
                  <ul>
                    <li>{{child.pertanyaan}}</li>
                  </ul>
                </div>
                <div class="col-2">
                  <v-radio-group v-if="!isUndefined(child.tertanggung)" v-model="child.tertanggung" row>
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                  <input
                    v-if="!isUndefined(child.tertanggung_number)"
                    class="outlined"
                    type="number"
                    v-model="child.tertanggung_number"
                  />
                  <input
                    v-if="!isUndefined(child.tertanggung_date)"
                    type="date"
                    class="outlined"
                    v-model="child.tertanggung_date"
                  />
                </div>
                <div class="col-2">
                  <v-radio-group v-if="!isUndefined(child.pemegang_polis)" v-model="child.pemegang_polis" row>
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                  <input
                    v-if="!isUndefined(child.pemegang_polis_number)"
                    class="outlined"
                    type="number"
                    v-model="child.pemegang_polis_number"
                  />
                  <input
                    v-if="!isUndefined(child.pemegang_polis_date)"
                    type="date"
                    class="outlined"
                    v-model="child.pemegang_polis_date"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
        <br>
      </div>
      
      <div class="d-flex flex-row-reverse">
        <button
          class="btn btn-primary btn-save mb-0"
          @click="submit"
        >
          Submit
        </button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ["show"],
  data () {
    return {
      isShow: this.show,
      radios: [
        { label: 'Ya', value: true },
        { label: 'Tidak', value: false }
      ],
      formOptions: [
        {
          pertanyaan: 'Apakah Tertanggung/Pemegang Polis sekarang dalam keadaaan sehat?',
          tertanggung: null,
          pemegang_polis: null
        },
        {
          pertanyaan: 'Sejak Polis tersebut di atas berlaku apakah Tertanggung/Pemegang Polis',
          childs: [
            {
              pertanyaan: 'Pernah berkonsultasi dengan dokter, dirawat di Rumah Sakit, menjalani operasi atau mendapat perawatan?',
              tertanggung: null,
              pemegang_polis: null
            },
            {
              pertanyaan: 'Pernah dianjurkan oleh dokter atau pernah melakukan pemeriksaan kesehatan diagnostic, check up seperti : sinar X, MRI, USG, CT scan,',
              tertanggung: null,
              pemegang_polis: null
            },
            {
              pertanyaan: 'Menderita cacat atau kelainan fisik?',
              tertanggung: null,
              pemegang_polis: null
            }
          ]
        },
        {
          pertanyaan: 'Apakah Tertanggung/Pemegang Polis mempunyai kebiasaan sebagai berikut:',
          childs: [
            {
              pertanyaan: 'Merokok? Jika YA, berapa batang dalam sehari?',
              tertanggung: null,
              pemegang_polis: null,
              pemegang_polis_number: null
            },
            {
              pertanyaan: 'Menggunakan obat bius/narkotik ,obat/zat terlarang?',
              tertanggung: null,
              pemegang_polis: null
            },
            {
              pertanyaan: 'Minum alkohol? Jika YA, berapa banyak dalam seminggu?',
              tertanggung: null,
              pemegang_polis: null,
              tertanggung_number: null
            }
          ]
        },
        {
          pertanyaan: 'Apakah kondisi kesehatan Tertanggung/Pemegang Polis sekarang dalam keadaan terganggu, memerlukan atau dianjurkan operasi atau dalam perawatan dokter /makan obat untuk alasan apapun?',
          tertanggung: null,
          pemegang_polis: null
        },
        {
          childs: [
            {
              pertanyaan: 'Apakah Tertanggung sering melakukan kegiatan penerbangan komersial/non-komersial?',
              tertanggung: null,
              pemegang_polis: null
            },
            {
              pertanyaan: 'Apakah Tertanggung pernah atau bermaksud ikut dalam olah raga yang beresiko tinggi ? (Balap mobil, terjun payung, dll) /',
              tertanggung: null,
              pemegang_polis: null
            }
          ]
        },
        {
          pertanyaan: 'Hanya untuk wanita',
          childs: [
            {
              pertanyaan: 'Apakah Anda sekarang sedang hamil ? bila YA, bulan',
              tertanggung: null,
              pemegang_polis: null,
              pemegang_polis_number: null
            },
            {
              pertanyaan: 'Apakah ada gangguan menstruasi atau menstruasi tidak teratur?',
              tertanggung: null,
              pemegang_polis: null,
            },
            {
              pertanyaan: 'Tanggal terakhir menstruasi:',
              tertanggung_date: null,
              pemegang_polis_date: null
            },
            {
              pertanyaan: 'Tanggal terakhir Anda melahirkan:',
              tertanggung_date: null,
              pemegang_polis_date: null
            }
          ]
        },
        {
          childs: [
            {
              pertanyaan: 'Tinggi Badan (cm)',
              tertanggung_number: null,
              pemegang_polis_number: null,
            },
            {
              pertanyaan: 'Berat Badan (kg)',
              tertanggung_number: null,
              pemegang_polis_number: null,     
            }
          ]
        }
      ]
    }
  },
  watch: {
    show(value) {
      this.isShow = this.show;
    },
    isShow(value) {
      if (!value) this.$emit("close")
    }
  },
  methods: {
    isUndefined (value) {
      return typeof value === "undefined"
    },
    submit() {
      let healthQuestionaire = []
      this.formOptions.forEach(item => {
        if (item.childs && item.childs.length) {
          item.childs.forEach((child) => {
            healthQuestionaire.push((child))
          })
        } else {
          healthQuestionaire.push(item)
        }
      })

      this.$emit('submit', healthQuestionaire)
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.modal {
  background-color: white;
  padding: 2rem;
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
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
}
</style>
