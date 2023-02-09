const state = () => ({
  changePayer: {
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
    beneficiaryKtpAttachment: {},
  },
});

const getters = {
  getChangePayer: (state) => state.changePayer,
};

const mutations = {
  setChangePayer(state, data) {
    state.changePayer = data;
  },
};

const actions = {
  async changePayer({ state, rootGetters, dispatch }) {
    const form = {
      addresses: state.getChangePayer.addresses,
      first_name: state.getChangePayer.firstName,
      last_name: state.getChangePayer.lastName,
      certi_type: state.getChangePayer.certiType,
      certi_code: state.getChangePayer.certiCode,
      birth_date: state.getChangePayer.birthDate,
      birth_place: state.getChangePayer.birthPlace,
      phone_number: state.getChangePayer.phoneNumber,
      email: state.getChangePayer.email,
      marrige_status: state.getChangePayer.marrigeStatus,
      gender: state.getChangePayer.gender,
      ktp_selfie_attachment: state.getChangePayer.ktpSelfieAttachment.name,
      ktp_attachment: state.getChangePayer.ktpAttachment.name,
      beneficiary_ktp_attachment: state.getChangePayer.beneficiaryKtpAttachment.name,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-payer", form)
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
