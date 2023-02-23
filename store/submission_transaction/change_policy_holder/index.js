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
      addresses: state.changePolicyHolder.addresses.map(address => {
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
      first_name: state.changePolicyHolder.firstName,
      last_name: state.changePolicyHolder.lastName,
      certi_type: state.changePolicyHolder.certiType,
      certi_code: state.changePolicyHolder.certiCode,
      birth_date: state.changePolicyHolder.birthDate,
      birth_place: state.changePolicyHolder.birthPlace,
      phone_number: state.changePolicyHolder.phoneNumber,
      email: state.changePolicyHolder.email,
      marrige_status: state.changePolicyHolder.marrigeStatus,
      gender: state.changePolicyHolder.gender,
      ktp_selfie_attachment: state.changePolicyHolder.ktpSelfieAttachment.name,
      ktp_attachment: state.changePolicyHolder.ktpAttachment.name,
      document_attachment: state.changePolicyHolder.documentAttachment.name,
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
