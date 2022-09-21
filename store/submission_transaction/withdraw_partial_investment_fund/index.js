const state = () => ({
  withdrawPartialInvestimentFund: {
    items: [],
    ktpSelfieAttachment: "",
  },
});

const getters = {
  getWithdrawPartialInvestmentFund: (state) => state.withdrawPartialInvestimentFund,
};

const mutations = {
  setWithdrawPartialInvestmentFund(state, data) {
    state.withdrawPartialInvestimentFund = data;
  },
};

const actions = {
  async withdrawPartialInvestmentFund({ state, rootGetters, dispatch }) {
    const form = {
      withdraw_type: "2",
      items: state.withdrawPartialInvestimentFund.items.map(x => (
        {
          apply_amount: x.applyAmount,
          apply_units: 0,
          fund_code: x.fundCode,
        }
      )),
      ktp_selfie_attachment: state.withdrawPartialInvestimentFund.ktpSelfieAttachment.name,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/partial-withdraw", form)
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
