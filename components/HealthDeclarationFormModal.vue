<template>
  <v-dialog v-model="isShow" :max-width="1000" content-class="modal-health">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="modal-health-body" @submit.prevent="handleSubmit(submit)">
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
                <h4>{{ healthQuestionnaire[0].pertanyaan }}</h4>
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Tertanggung</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[0].tertanggung"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Pemegang Polis</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[0].pemegang_polis"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h4>
                  Sejak Polis tersebut di atas berlaku apakah
                  Tertanggung/Pemegang Polis
                </h4>
              </div>
              <div class="col-12 col-md-8">
                <ul>
                  <li>{{ healthQuestionnaire[1].pertanyaan }}</li>
                </ul>
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Tertanggung</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[1].tertanggung"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <textarea
                  v-if="healthQuestionnaire[1].tertanggung"
                  class="form-control"
                  placeholder="Mohon disebutkan.."
                  v-model="healthQuestionnaire[1].tertanggung_text"
                />
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Pemegang Polis</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[1].pemegang_polis"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <textarea
                  v-if="healthQuestionnaire[1].pemegang_polis"
                  class="form-control"
                  placeholder="Mohon disebutkan.."
                  v-model="healthQuestionnaire[1].pemegang_polis_text"
                />
              </div>
              <div class="col-12 col-md-8">
                <ul>
                  <li>{{ healthQuestionnaire[2].pertanyaan }}</li>
                </ul>
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Tertanggung</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[2].tertanggung"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <textarea
                  v-if="healthQuestionnaire[2].tertanggung"
                  class="form-control"
                  placeholder="Mohon disebutkan.."
                  v-model="healthQuestionnaire[2].tertanggung_text"
                />
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Pemegang Polis</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[2].pemegang_polis"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <textarea
                  v-if="healthQuestionnaire[2].pemegang_polis"
                  class="form-control"
                  placeholder="Mohon disebutkan.."
                  v-model="healthQuestionnaire[2].pemegang_polis_text"
                />
              </div>
              <div class="col-12 col-md-8">
                <ul>
                  <li>{{ healthQuestionnaire[3].pertanyaan }}</li>
                </ul>
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Tertanggung</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[3].tertanggung"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <textarea
                  v-if="healthQuestionnaire[3].tertanggung"
                  class="form-control"
                  placeholder="Mohon disebutkan.."
                  v-model="healthQuestionnaire[3].tertanggung_text"
                />
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Pemegang Polis</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[3].pemegang_polis"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <textarea
                  v-if="healthQuestionnaire[3].pemegang_polis"
                  class="form-control"
                  placeholder="Mohon disebutkan.."
                  v-model="healthQuestionnaire[3].pemegang_polis_text"
                />
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
                  <li>{{ healthQuestionnaire[4].pertanyaan }}</li>
                </ul>
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Tertanggung</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[4].tertanggung"
                    row
                    @change="healthQuestionnaire[4].tertanggung_number = null"
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <input
                  v-if="healthQuestionnaire[4].tertanggung"
                  class="form-control"
                  type="number"
                  min="0"
                  v-model="healthQuestionnaire[4].tertanggung_number"
                />
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Pemegang Polis</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[4].pemegang_polis"
                    row
                    @change="
                      healthQuestionnaire[4].pemegang_polis_number = null
                    "
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <input
                  v-if="healthQuestionnaire[4].pemegang_polis"
                  class="form-control"
                  type="number"
                  min="0"
                  v-model="healthQuestionnaire[4].pemegang_polis_number"
                />
              </div>

              <div class="col-12 col-md-8">
                <ul>
                  <li>{{ healthQuestionnaire[5].pertanyaan }}</li>
                </ul>
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Tertanggung</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[5].tertanggung"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <textarea
                  v-if="healthQuestionnaire[5].tertanggung"
                  class="form-control"
                  placeholder="Mohon disebutkan.."
                  v-model="healthQuestionnaire[5].tertanggung_text"
                />
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Pemegang Polis</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[5].pemegang_polis"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <textarea
                  v-if="healthQuestionnaire[5].pemegang_polis"
                  class="form-control"
                  placeholder="Mohon disebutkan.."
                  v-model="healthQuestionnaire[5].pemegang_polis_text"
                />
              </div>

              <div class="col-12 col-md-8">
                <ul>
                  <li>{{ healthQuestionnaire[6].pertanyaan }}</li>
                </ul>
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Tertanggung</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[6].tertanggung"
                    row
                    @change="healthQuestionnaire[6].tertanggung_number = null"
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <input
                  v-if="healthQuestionnaire[6].tertanggung"
                  class="form-control"
                  type="number"
                  min="0"
                  v-model="healthQuestionnaire[6].tertanggung_number"
                />
              </div>
              <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Pemegang Polis</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[6].pemegang_polis"
                    row
                    @change="
                      healthQuestionnaire[6].pemegang_polis_number = null
                    "
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <input
                  v-if="healthQuestionnaire[6].pemegang_polis"
                  class="form-control"
                  type="number"
                  min="0"
                  v-model="healthQuestionnaire[6].pemegang_polis_number"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body row">
            <div class="col-12 col-md-8">
              <h4>{{ healthQuestionnaire[7].pertanyaan }}</h4>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <ValidateForm rules="required">
                <v-radio-group
                  v-model="healthQuestionnaire[7].tertanggung"
                  row
                  @change="healthQuestionnaire[7].tertanggung_text = null"
                >
                  <v-radio
                    v-for="(item, index) in radios"
                    :key="index"
                    color="#F15921"
                    v-bind="item"
                  ></v-radio>
                </v-radio-group>
              </ValidateForm>
              <textarea
                v-if="healthQuestionnaire[7].tertanggung"
                class="form-control"
                placeholder="Mohon disebutkan.."
                v-model="healthQuestionnaire[7].tertanggung_text"
              />
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <ValidateForm rules="required">
                <v-radio-group
                  v-model="healthQuestionnaire[7].pemegang_polis"
                  row
                  @change="healthQuestionnaire[7].pemegang_polis_text = null"
                >
                  <v-radio
                    v-for="(item, index) in radios"
                    :key="index"
                    color="#F15921"
                    v-bind="item"
                  ></v-radio>
                </v-radio-group>
              </ValidateForm>
              <textarea
                v-if="healthQuestionnaire[7].pemegang_polis"
                class="form-control"
                placeholder="Mohon disebutkan.."
                v-model="healthQuestionnaire[7].pemegang_polis_text"
              />
            </div>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body row">
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionnaire[8].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <ValidateForm rules="required">
                <v-radio-group v-model="healthQuestionnaire[8].tertanggung" row>
                  <v-radio
                    v-for="(item, index) in radios"
                    :key="index"
                    color="#F15921"
                    v-bind="item"
                  ></v-radio>
                </v-radio-group>
              </ValidateForm>
              <textarea
                v-if="healthQuestionnaire[8].tertanggung"
                class="form-control"
                placeholder="Mohon disebutkan.."
                v-model="healthQuestionnaire[8].tertanggung_text"
              />
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <ValidateForm rules="required">
                <v-radio-group
                  v-model="healthQuestionnaire[8].pemegang_polis"
                  row
                >
                  <v-radio
                    v-for="(item, index) in radios"
                    :key="index"
                    color="#F15921"
                    v-bind="item"
                  ></v-radio>
                </v-radio-group>
              </ValidateForm>
              <textarea
                v-if="healthQuestionnaire[8].pemegang_polis"
                class="form-control"
                placeholder="Mohon disebutkan.."
                v-model="healthQuestionnaire[8].pemegang_polis_text"
              />
            </div>

            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionnaire[9].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <ValidateForm rules="required">
                <v-radio-group v-model="healthQuestionnaire[9].tertanggung" row>
                  <v-radio
                    v-for="(item, index) in radios"
                    :key="index"
                    color="#F15921"
                    v-bind="item"
                  ></v-radio>
                </v-radio-group>
              </ValidateForm>
              <textarea
                v-if="healthQuestionnaire[9].tertanggung"
                class="form-control"
                placeholder="Mohon disebutkan.."
                v-model="healthQuestionnaire[9].tertanggung_text"
              />
            </div>
            <div class="col-12 col-md-2">
                <p class="d-block d-md-none">Pemegang Polis</p>
                <ValidateForm rules="required">
                  <v-radio-group
                    v-model="healthQuestionnaire[9].pemegang_polis"
                    row
                  >
                    <v-radio
                      v-for="(item, index) in radios"
                      :key="index"
                      color="#F15921"
                      v-bind="item"
                    ></v-radio>
                  </v-radio-group>
                </ValidateForm>
                <textarea
                  v-if="healthQuestionnaire[9].pemegang_polis"
                  class="form-control"
                  placeholder="Mohon disebutkan.."
                  v-model="healthQuestionnaire[9].pemegang_polis_text"
                />
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
                <li>{{ healthQuestionnaire[10].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <v-radio-group
                v-model="healthQuestionnaire[10].tertanggung"
                row
                @change="healthQuestionnaire[10].tertanggung_number = null"
              >
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
              <input
                v-if="healthQuestionnaire[10].tertanggung"
                class="form-control"
                type="number"
                  min="0"
                v-model="healthQuestionnaire[10].tertanggung_number"
              />
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <v-radio-group
                v-model="healthQuestionnaire[10].pemegang_polis"
                row
                @change="healthQuestionnaire[10].pemegang_polis_number = null"
              >
                <v-radio
                  v-for="(item, index) in radios"
                  :key="index"
                  color="#F15921"
                  v-bind="item"
                ></v-radio>
              </v-radio-group>
              <input
                v-if="healthQuestionnaire[10].pemegang_polis"
                class="form-control"
                type="number"
                  min="0"
                v-model="healthQuestionnaire[10].pemegang_polis_number"
              />
            </div>
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionnaire[11].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <v-radio-group v-model="healthQuestionnaire[11].tertanggung" row>
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
                v-model="healthQuestionnaire[11].pemegang_polis"
                row
              >
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
                <li>{{ healthQuestionnaire[12].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <input
                class="form-control"
                type="date"
                :max="today"
                v-model="healthQuestionnaire[12].tertanggung_date"
              />
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <input
                class="form-control"
                type="date"
                :max="today"
                v-model="healthQuestionnaire[12].pemegang_polis_date"
              />
            </div>
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionnaire[13].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <input
                class="form-control"
                type="date"
                :max="today"
                v-model="healthQuestionnaire[13].tertanggung_date"
              />
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <input
                class="form-control"
                type="date"
                :max="today"
                v-model="healthQuestionnaire[13].pemegang_polis_date"
              />
            </div>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body row">
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionnaire[14].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <ValidateForm rules="required">
                <input
                  class="form-control"
                  type="number"
                  min="0"
                  v-model="healthQuestionnaire[14].tertanggung_number"
                />
              </ValidateForm>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <ValidateForm rules="required">
                <input
                  class="form-control"
                  type="number"
                  min="0"
                  v-model="healthQuestionnaire[14].pemegang_polis_number"
                />
              </ValidateForm>
            </div>
            <div class="col-12 col-md-8">
              <ul>
                <li>{{ healthQuestionnaire[15].pertanyaan }}</li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Tertanggung</p>
              <ValidateForm rules="required">
                <input
                  class="form-control"
                  type="number"
                  min="0"
                  v-model="healthQuestionnaire[15].tertanggung_number"
                />
              </ValidateForm>
            </div>
            <div class="col-12 col-md-2">
              <p class="d-block d-md-none">Pemegang Polis</p>
              <ValidateForm rules="required">
                <input
                  class="form-control"
                  type="number"
                  min="0"
                  v-model="healthQuestionnaire[15].pemegang_polis_number"
                />
              </ValidateForm>
            </div>
          </div>
        </div>

        <div v-if="!preview" class="d-flex flex-row-reverse">
          <button type="submit" class="btn btn-primary btn-save mb-0">
          <save-icon></save-icon> Submit
          </button>
        </div>
      </form>
    </ValidationObserver>
  </v-dialog>
</template>

<script>

import { SaveIcon } from "vue-feather-icons";
import ValidateForm from "./ValidateForm.vue";
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
      healthQuestionnaire: [
        {
          pertanyaan:
            "Apakah Tertanggung/Pemegang Polis sekarang dalam keadaaan sehat?",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_text: null,
          pemegang_polis_text: null,
        },
        {
          pertanyaan:
            "Pernah berkonsultasi dengan dokter, dirawat di Rumah Sakit, menjalani operasi atau mendapat perawatan?",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_text: null,
          pemegang_polis_text: null,
        },
        {
          pertanyaan:
            "Pernah dianjurkan oleh dokter atau pernah melakukan pemeriksaan kesehatan diagnostic, check up seperti : sinar X, MRI, USG, CT scan, ECG,treadmill, darah, urine atau pemeriksaan laboratorium lainnya?",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_text: null,
          pemegang_polis_text: null,
        },
        {
          pertanyaan: "Menderita cacat atau kelainan fisik?",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_text: null,
          pemegang_polis_text: null,
        },
        {
          pertanyaan: "Merokok? Jika YA, berapa batang dalam sehari?",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_number: null,
          pemegang_polis_number: null,
        },
        {
          pertanyaan: "Menggunakan obat bius/narkotik,obat/zat terlarang?",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_text: null,
          pemegang_polis_text: null,
        },
        {
          pertanyaan: "Minum alkohol? Jika YA, berapa banyak dalam seminggu?",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_number: null,
          pemegang_polis_number: null,
          tertanggung_text: null,
          pemegang_polis_text: null,
        },
        {
          pertanyaan:
            "Apakah kondisi kesehatan Tertanggung/Pemegang Polis sekarang dalam keadaan terganggu, memerlukan atau dianjurkan operasi atau dalam perawatan dokter /makan obat untuk alasan apapun?",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_text: null,
          pemegang_polis_text: null,
          tertanggung_text: null,
          pemegang_polis_text: null,
        },
        {
          pertanyaan:
            "Apakah Tertanggung sering melakukan kegiatan penerbangan komersial/non-komersial?",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_text: null,
          pemegang_polis_text: null,
        },
        {
          pertanyaan:
            "Apakah Tertanggung pernah atau bermaksud ikut dalam olah raga yang beresiko tinggi ? (Balap mobil, terjun payung, dll)",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_text: null,
          pemegang_polis_text: null,
        },
        {
          pertanyaan: "Apakah Anda sekarang sedang hamil? bila YA, bulan",
          tertanggung: null,
          pemegang_polis: null,
          tertanggung_number: null,
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
  computed: {
    today() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      return yyyy + "-" + mm + "-" + dd;
    },
  },
  watch: {
    show(value) {
      this.isShow = this.show;
      if (this.show && this.defaultValue.length) {
        this.healthQuestionnaire = this.defaultValue;
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
      this.$emit("submit", this.healthQuestionnaire);
      this.$emit("close");
    },
  },
  components: { ValidateForm },
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
