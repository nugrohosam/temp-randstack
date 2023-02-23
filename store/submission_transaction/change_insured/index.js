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
    ktpSelfieAttachment: {},
    ktpAttachment: {},
    beneficiaryKtpAttachment: {},
    documentAttachment: {},
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
      addresses: state.changeInsured.addresses.map(address => {
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
      party_id: state.changeInsured.partyId,
      first_name: state.changeInsured.firstName,
      last_name: state.changeInsured.lastName,
      certi_type: state.changeInsured.certiType,
      certi_code: state.changeInsured.certiCode,
      birth_date: state.changeInsured.birthDate,
      birth_place: state.changeInsured.birthPlace,
      phone_number: state.changeInsured.phoneNumber,
      email: state.changeInsured.email,
      marrige_status: state.changeInsured.marrigeStatus,
      ktp_selfie_attachment: state.changeInsured.ktpSelfieAttachment.name,
      ktp_attachment: state.changeInsured.ktpAttachment.name,
      beneficiary_ktp_attachment: state.changeInsured.beneficiaryKtpAttachment.name,
      document_attachment: state.changeInsured.documentAttachment.name,
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
