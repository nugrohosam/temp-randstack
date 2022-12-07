const state = () => ({
  periodicalyTopUp: {
    basePrem: null,
    topUpPrem: null,
    totalPrem: null,
    healthQuestionnaire: [],
    ktpSelfieAttachment: {},
    documentAttachment: {},
    ilustrationAttachment: {}
  },
});

const getters = {
  getPeriodicalyTopUp: (state) => state.periodicalyTopUp,
};

const mutations = {
  setPeriodicalyTopUp(state, data) {
    state.periodicalyTopUp = data;
  },
};

const actions = {
  async periodicalyTopUp({ state, rootGetters, dispatch }) {
    const form = {
      base_prem: state.periodicalyTopUp.basePrem,
      top_up_prem: state.periodicalyTopUp.topUpPrem,
      total_prem: state.periodicalyTopUp.totalPrem,
      health_questionnaire: state.periodicalyTopUp.healthQuestionnaire,
      ktp_selfie_attachment: state.periodicalyTopUp.ktpSelfieAttachment.name,
      document_attachment: state.periodicalyTopUp.documentAttachment?.name || null,
      ilustration_attachment: state.periodicalyTopUp.ilustrationAttachment?.name || null,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/periodicaly-top-up", form)
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
