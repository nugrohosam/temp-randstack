const state = () => ({
  changePaymentFreq: {
    paymentFreq: "",
    ktpSelfieAttachment: "",
  },
});

const getters = {
  getChangePaymentFreq: (state) => state.changePaymentFreq,
};

const mutations = {
  setChangePaymentFreq(state, data) {
    state.changePaymentFreq = data;
  },
};

const actions = {
  async changePaymentFreq({ state, rootGetters, dispatch }) {
    const form = {
      payment_freq: state.changePaymentFreq.paymentFreq,
      ktp_selfie_attachment: state.changePaymentFreq.ktpSelfieAttachment.name,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-payment-freq", form)
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
