const state = () => ({
  increaseSA: {
    items: [],
    ktpSelfieAttachment: "",
  },
});

const getters = {
  getIncreaseSA: (state) => state.increaseSA,
};

const mutations = {
  setIncreaseSA(state, data) {
    state.increaseSA = data;
  },
};

const actions = {
  async increaseSA({ state, rootGetters, dispatch }) {
    const form = {
      items: state.increaseSA.items,
      ktp_selfie_attachment: state.increaseSA.ktpSelfieAttachment.name,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/increase-sa", form)
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
