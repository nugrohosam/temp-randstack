const state = () => ({
  decreaseSA: {
    items: [],
    ktpSelfieAttachment: "",
  },
});

const getters = {
  getDecreaseSA: (state) => state.decreaseSA,
};

const mutations = {
  setDecreaseSA(state, data) {
    state.decreaseSA = data;
  },
};

const actions = {
  async decreaseSA({ state, rootGetters, dispatch }) {
    const form = {
      items: state.decreaseSA.items,
      ktp_selfie_attachment: state.decreaseSA.ktpSelfieAttachment.name,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/decrease-sa", form)
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
