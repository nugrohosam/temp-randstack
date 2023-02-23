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
    documentAttachment: {},
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
      addresses: state.changePayer.addresses.map(address => {
        return ({
          post_code: "-",
          address_1: address.address1,
          address_2: address.address2,
          address_3: address.address3,
          address_4: address.address4,
          address_5: address.address5,
          address_6: address.address6,
          address_7: address.address7,
          address_type: address.addressType,
          province_id: address.provinceId,
          city_id: address.cityId,
          district_id: address.districtId,
          village_id: address.villageId,
        })
      }),
      first_name: state.changePayer.firstName,
      last_name: state.changePayer.lastName,
      certi_type: state.changePayer.certiType,
      certi_code: state.changePayer.certiCode,
      birth_date: state.changePayer.birthDate,
      birth_place: state.changePayer.birthPlace,
      phone_number: state.changePayer.phoneNumber,
      email: state.changePayer.email,
      marrige_status: state.changePayer.marrigeStatus,
      gender: state.changePayer.gender,
      ktp_selfie_attachment: state.changePayer.ktpSelfieAttachment.name,
      ktp_attachment: state.changePayer.ktpAttachment.name,
      beneficiary_ktp_attachment: state.changePayer.beneficiaryKtpAttachment.name,
      document_attachment: state.changePayer.documentAttachment.name,
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
