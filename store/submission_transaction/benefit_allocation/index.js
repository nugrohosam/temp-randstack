const state = () => ({
  benefitAllocation: {
    newNoRek: null,
    bank: null,
    rekOwner: null,
    ktpAttachment: null,
    documentAttachment: null,
    savingBookAttachment: null,
    birthCertificateAttachment: null,
    kkAttachment: null,
    familyAttachment: null,
    statusFamilyAttachment: "KK",
    ktpSelfieAttachment: null,
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
      ktp_attachment: state.benefitAllocation.ktpAttachment?.name || null,
      saving_book_attachment: state.benefitAllocation.savingBookAttachment?.name || null,
      document_attachment: state.benefitAllocation.documentAttachment?.name || null,
      ktp_selfie_attachment: state.benefitAllocation.ktpSelfieAttachment?.name || null,
    };

    if (state.benefitAllocation.familyAttachment) {
      if (state.benefitAllocation.statusFamilyAttachment === "KK") {
        form.kk_attachment = state.benefitAllocation.familyAttachment?.name || null;
      } else {
        form.birth_certificate_attachment =
          state.benefitAllocation.familyAttachment?.name || null;
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
