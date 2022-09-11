export default {
  async applyPolicyLoan ({ rootGetters, state, dispatch }) {
    const form = {
      item: {
        loan_amount: state.requestPolicyLoan.loanAmount
      },
      ktp_selfie_attachment: state.requestPolicyLoan.ktpSelfieAttachment
    }

    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, { root: true });
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    const response = await this.$axios
      .$post("/api/v1/transaction-proposal/apply-policy-loan", form)
      .then((response) => {
        dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, { root: true });
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  async repaymentPolicyLoan ({ rootGetters, state, commit, dispatch }) {
    const form = {
      virtual_account_number: state.paymentPolicyLoan.virtualAccountNumber,
      ktp_selfie_attachment: state.paymentPolicyLoan.ktpSelfieAttachment
    }

    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, { root: true });
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    const response = await this.$axios
      .$post("/api/v1/transaction-proposal/loan-repayment", form)
      .then((response) => {
        dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, { root: true });
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}