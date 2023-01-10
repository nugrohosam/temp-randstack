const state = () => ({
  changePaymentMethod: {
    isPayerRegisteredInPolicy: false,
    paymentMethod: 3,
    ownerAccount: "",
    accountCC: "",
    accountDebit: "",
    accountVA: "",
    expireDateCC: "",
    creditCardType: "",
    bank: "",
    branch: "",
    ktpSelfieAttachment: {},
    ktpAttachment: {},
    savingBookAttachment: {},
    beneficaryOwnerAttachment: {},
    bankAuthorizationAttachment: {},
  },
});

const getters = {
  getChangePaymentMethod: (state) => state.changePaymentMethod,
};

const mutations = {
  setChangePaymentMethod(state, data) {
    state.changePaymentMethod = data;
  },
};

const actions = {
  async changePaymentMethod({ state, rootGetters, dispatch }) {
    let form = {
      is_registered_in_policy: state.changePaymentMethod.isPayerRegisteredInPolicy,
      bank: state.changePaymentMethod.bank,
      payment_method: state.changePaymentMethod.paymentMethod,
      ktp_selfie_attachment: state.changePaymentMethod.ktpSelfieAttachment.name,
      ktp_attachment: state.changePaymentMethod.ktpAttachment.name,
    };

    if (!state.changePaymentMethod.isPayerRegisteredInPolicy && state.changePaymentMethod.paymentMethod != 93) {
      form.beneficary_owner_attachment = state.changePaymentMethod.beneficaryOwnerAttachment.name;
    }

    if (state.changePaymentMethod.paymentMethod == 93) {
      form.new_va_rek = state.changePaymentMethod.accountVA;
    } else if (state.changePaymentMethod.paymentMethod == 3) {
      form.new_no_rek = state.changePaymentMethod.accountDebit;
      form.branch = state.changePaymentMethod.branch;
      form.rek_owner = state.changePaymentMethod.ownerAccount;
      form.bank_authorization_attachment = state.changePaymentMethod.bankAuthorizationAttachment.name;
      form.saving_book_attachment = state.changePaymentMethod.savingBookAttachment.name;
    } else if (state.changePaymentMethod.paymentMethod == 30) {
      form.rek_owner = state.changePaymentMethod.ownerAccount;
      form.new_no_cc = state.changePaymentMethod.accountCC;
      form.cc_type = state.changePaymentMethod.creditCardType;
      form.cc_expiry_date = state.changePaymentMethod.expireDateCC;
      form.saving_book_attachment = state.changePaymentMethod.savingBookAttachment.name;
      form.bank_authorization_attachment = state.changePaymentMethod.bankAuthorizationAttachment.name;
    }

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-payment-method", form)
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
