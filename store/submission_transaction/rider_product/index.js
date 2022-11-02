const state = () => ({
  addRider: {
    add_riders: [
      {
        product_id: null,
        party_ids: [],
        plan: null,
        sum_asured: null,
        health_questionnaire: [],
        show_modal_health: false,
      }
    ],
    insured: null,
    ktp_selfie_attachment: {},
    kk_attachment: {},
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
    let form = state.addRider;

    form = { 
      ...form, 
      kk_attachment: state.addRider.kk_attachment.name,
      ktp_selfie_attachment: state.addRider.ktp_selfie_attachment.name,
    }

    for (let i = 0; i < form.add_riders.length; i++){
      delete form.add_riders[i].parties
      delete form.add_riders[i].show_modal_health
    }
    
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await await this.$axios
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
