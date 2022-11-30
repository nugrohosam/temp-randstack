const state = () => ({
  transferOfFund: {
    items: [],
    ktpSelfieAttachment: null,
  },
});

const getters = {
  getTransferOfFund: (state) => state.transferOfFund,
};

const mutations = {
  setTransferOfFund(state, data) {
    state.policyRecovery = data;
  },
};

const actions = {
  async transferOfFund({ state, rootGetters, dispatch }) {
    // TODO: post be
    // const form = {
    //   health_questionnaire: state.policyRecovery.healthQuestionnaire,
    //   virtual_account_number: state.policyRecovery.virtualAccountNumber,
    //   transfer_attachment: state.policyRecovery.transferAttachment.name,
    //   ktp_selfie_attachment: state.policyRecovery.ktpSelfieAttachment.name,
    // };
    // dispatch(
    //   "toggleOverlayLoading",
    //   { show: true, message: "Mohon Tunggu..." },
    //   { root: true }
    // );
    // this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    // return await this.$axios
    //   .$post("/api/v1/transaction-proposal/reinstatement", form)
    //   .then((response) => {
    //     dispatch(
    //       "toggleOverlayLoading",
    //       { show: false, message: "Mohon Tunggu..." },
    //       { root: true }
    //     );
    //     return response;
    //   })
    //   .catch((error) => {
    //     return error;
    //   });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
