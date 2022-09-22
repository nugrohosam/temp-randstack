const state = () => ({
  addRider: {
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
});

const getters = {
  getAddRider: (state) => state.addRider,
};

const mutations = {
  setAddRider(state, data) {
    state.addRider = data;
  },
};

const actions = {
  async addRider({ state, rootGetters, dispatch }) {
    const form = state.addRider;

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    const response = await this.$axios
      .$post("/api/v1/transaction-proposal/add-rider", form)
      .then((response) => {
        dispatch(
          "toggleOverlayLoading",
          { show: false, message: "Mohon Tunggu..." },
          { root: true }
        );
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
