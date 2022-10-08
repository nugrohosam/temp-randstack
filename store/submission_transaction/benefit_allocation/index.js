const state = () => ({
  benefitAllocation: {
    newNoRek: null,
    bank: null,
    rekOwner: null,
    ktpAttachment: null,
    documentAttachment: null,
    savingBookAttachment: null,
    ktpSelfieAttachment: null,
    statusFamilyAttachment: "KK",
    familyAttachment: null,
  },
});

const getters = {
  getBenefitAllocation: (state) => state.benefitAllocation,
};

const mutations = {
  setBenefitAllocation(state, data) {
    state.benefitAllocation = data;
  },
};

const actions = {
  async benefitAllocation({ state, rootGetters, dispatch }) {
    const form = {
      new_no_rek: state.benefitAllocation.newNoRek,
      bank: state.benefitAllocation.bank,
      rek_owner: state.benefitAllocation.rekOwner,
      ktp_attachment: state.benefitAllocation.ktpAttachment,
      saving_book_attachment: state.benefitAllocation.savingBookAttachment,
      document_attachment: state.benefitAllocation.documentAttachment,

      ktp_selfie_attachment: state.benefitAllocation.ktpSelfieAttachment,
    };

    if (state.familyAttachment) {
      if (state.statusFamilyAttachment === "KK") {
        form.kk_attachment = state.benefitAllocation.familyAttachment;
      } else {
        form.birth_certificate_attachment =
          state.benefitAllocation.familyAttachment;
      }
    }

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/perform-benefit-allocation", form)
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
