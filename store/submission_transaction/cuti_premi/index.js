const state = () => ({
  cutiPremi: {
    status: "",
    startPremiumHolidayDate: "",
    endPremiumHolidayDate: "",
    ktpSelfieAttachment: "",
  },
});

const getters = {
  getCutiPremi: (state) => state.cutiPremi,
};

const mutations = {
  setCutiPremi(state, data) {
    state.cutiPremi = data;
  },
};

const actions = {
  async changePremiumHoliday({ state, rootGetters, dispatch }) {
    const form = {
      status: state.cutiPremi.status,
      start_premium_holiday_date: state.cutiPremi.startPremiumHolidayDate,
      end_premium_holiday_date: state.cutiPremi.endPremiumHolidayDate,
      ktp_selfie_attachment: state.cutiPremi.ktpSelfieAttachment.name,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-premium-holiday", form)
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
