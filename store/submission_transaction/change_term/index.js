const state = () => ({
  changeTerm: {
    term: "",
    ktpSelfieAttachment: "",
    ilustrationAttachment: "",
  },
});

const getters = {
  getChangeTerm: (state) => state.changeTerm,
};

const mutations = {
  setChangeTerm(state, data) {
    state.changeTerm = data;
  },
};

const actions = {
  async changeTerm({ state, rootGetters, dispatch }) {
    const form = {
      term: state.changeTerm.term,
      ktp_selfie_attachment: state.changeTerm.ktpSelfieAttachment.name,
      ilustration_attachment: state.changeTerm.ilustrationAttachment.name,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-term", form)
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
