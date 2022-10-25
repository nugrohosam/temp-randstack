const state = () => ({
  addInvestimentFund: {
    items: [],
    ktpSelfieAttachment: "",
    transferAttachment: "",
    virtualAccountNumber: "",
  },
});

const getters = {
  getAddInvestmentFund: (state) => state.addInvestimentFund,
};

const mutations = {
  setAddInvestmentFund(state, data) {
    state.addInvestimentFund = data;
  },
};

const actions = {
  async addInvestmentFund({ state, rootGetters, dispatch }) {
    const form = {
      items: state.addInvestimentFund.items.map(x => (
        {
          amount: +x.amount,
          fund_code: x.fund_code,
        }
      )),
      virtual_account_number: state.addInvestimentFund.virtualAccountNumber,
      ktp_selfie_attachment: state.addInvestimentFund.ktpSelfieAttachment.name,
      transfer_attachment: state.addInvestimentFund.transferAttachment?.name || null,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/topup-single", form)
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
