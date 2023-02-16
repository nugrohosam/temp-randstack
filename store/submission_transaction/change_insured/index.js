const state = () => ({
  changeInsured: {
    addresses: [],
    partyId: "",
    firstName: "",
    lastName: "",
    certiType: "",
    certiCode: "",
    birthDate: "",
    birthPlace: "",
    phoneNumber: "",
    email: "",
    marrigeStatus: "",
    gender: "",
    ktpSelfieAttachment: {},
    ktpAttachment: {},
    beneficiaryKtpAttachment: {},
  },
});

const getters = {
  getChangeInsured: (state) => state.changeInsured,
};

const mutations = {
  setChangeInsured(state, data) {
    state.changeInsured = data;
  },
};

const actions = {
  async changeInsured({ state, rootGetters, dispatch }) {
    const form = {
      addresses: state.getChangeInsured.addresses,
      party_id: state.getChangeInsured.partyId,
      first_name: state.getChangeInsured.firstName,
      last_name: state.getChangeInsured.lastName,
      certi_type: state.getChangeInsured.certiType,
      certi_code: state.getChangeInsured.certiCode,
      birth_date: state.getChangeInsured.birthDate,
      birth_place: state.getChangeInsured.birthPlace,
      phone_number: state.getChangeInsured.phoneNumber,
      email: state.getChangeInsured.email,
      marrige_status: state.getChangeInsured.marrigeStatus,
      gender: state.getChangeInsured.gender,
      ktp_selfie_attachment: state.getChangeInsured.ktpSelfieAttachment.name,
      ktp_attachment: state.getChangeInsured.ktpAttachment.name,
      beneficiary_ktp_attachment: state.getChangeInsured.beneficiaryKtpAttachment.name,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-insured", form)
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
