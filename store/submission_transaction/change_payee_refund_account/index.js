const state = () => ({
  changePayeeRefundAccount: {
      newNoRek: null,
      bank: null,
      rekOwner: null,
      ktpAttachment: null,
      documentAttachment: null,
      savingBookAttachment: null,
      birthCertificateAttachment: null,
      kkAttachment: null,
      ktpSelfieAttachment: null,
  },
});

const getters = {
  getChangePayeeRefundAccount: (state) => state.changePayeeRefundAccount,
};

const mutations = {
  setChangePayeeRefundAccount(state, data) {
    state.changePayeeRefundAccount = data;
  },
};

const actions = {
  async changePayeeRefundAccount({ state, rootGetters, dispatch }) {
    const form = {
      new_no_rek: state.changePayeeRefundAccount.newNoRek,
      bank: state.changePayeeRefundAccount.bank,
      rek_owner: state.changePayeeRefundAccount.rekOwner,
      ktp_attachment: state.changePayeeRefundAccount.ktpAttachment,
      saving_book_attachment: state.changePayeeRefundAccount.savingBookAttachment,
      document_attachment: state.changePayeeRefundAccount.documentAttachment,
      birth_certificate_attachment: state.changePayeeRefundAccount.birthCertificateAttachment,
      kk_attachment: state.changePayeeRefundAccount.kkAttachment,
      ktp_selfie_attachment: state.changePayeeRefundAccount.ktpSelfieAttachment,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-payee-refund-account", form)
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
