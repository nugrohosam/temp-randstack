const state = () => ({
  transferOfFund: {
    items: [],
    ktpSelfieAttachment: {},
  },
});

const getters = {
  getTransferOfFund: (state) => state.transferOfFund,
};

const mutations = {
  setTransferOfFund(state, data) {
    state.transferOfFund = data;
  },
};

const actions = {
  async transferOfFund({ state, rootGetters, dispatch }) {
    const items = [];
    for (let i = 0; i < state.transferOfFund.items.length; i++) {
      items.push({
        fund_code : state.transferOfFund.items[i].from,
        target_fund_code : state.transferOfFund.items[i].to,
        amount : +state.transferOfFund.items[i].amount,
        unit : state.transferOfFund.items[i].totalUnit,
        percentage : +state.transferOfFund.items[i].percentage,
      })
    }

    const form = {
      items,
      ktp_selfie_attachment: state.transferOfFund.ktpSelfieAttachment.name,
    };
    
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/switch-fund", form)
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
