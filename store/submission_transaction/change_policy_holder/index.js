const state = () => ({
  changePolicyHolder: {
    addresses: [],
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
    documentAttachment: {},
  },
});

const getters = {
  getChangePolicyHolder: (state) => state.changePolicyHolder,
};

const mutations = {
  setChangePolicyHolder(state, data) {
    state.changePolicyHolder = data;
  },
};

const actions = {
  async changePolicyHolder({ state, rootGetters, dispatch }) {
    const form = {
      addresses: state.getChangePolicyHolder.addresses,
      first_name: state.getChangePolicyHolder.firstName,
      last_name: state.getChangePolicyHolder.lastName,
      certi_type: state.getChangePolicyHolder.certiType,
      certi_code: state.getChangePolicyHolder.certiCode,
      birth_date: state.getChangePolicyHolder.birthDate,
      birth_place: state.getChangePolicyHolder.birthPlace,
      phone_number: state.getChangePolicyHolder.phoneNumber,
      email: state.getChangePolicyHolder.email,
      marrige_status: state.getChangePolicyHolder.marrigeStatus,
      gender: state.getChangePolicyHolder.gender,
      ktp_selfie_attachment: state.getChangePolicyHolder.ktpSelfieAttachment.name,
      ktp_attachment: state.getChangePolicyHolder.ktpAttachment.name,
      document_attachment: state.getChangePolicyHolder.documentAttachment.name,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-policy-holder", form)
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
