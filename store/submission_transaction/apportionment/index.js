const state = () => ({
  apportionment: {
    items: [],
    ktpSelfieAttachment: {},
  },
});

const getters = {
  getApportionment: (state) => state.apportionment,
};

const mutations = {
  setApportionment(state, data) {
    state.apportionment = data;
  },
};

const actions = {
  async apportionment({ state, rootGetters, dispatch }) {
    const items = [];
    for (let i = 0; i < state.apportionment.items.length; i++) {
      items.push({
        fund_code : state.apportionment.items[i].from,
        percentage : +state.apportionment.items[i].percentage,
      })
    }

    const form = {
      items,
      ktp_selfie_attachment: state.apportionment.ktpSelfieAttachment.name,
    };
    
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-apportionment", form)
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
