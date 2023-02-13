const state = () => ({
  changeBeneficiary: {
    changes: "",
    changeItems: [],
    addItem: {},
    ktpSelfieAttachment: {},
    ktpAttachment: {},
    birthCeriticateAttachment: {},
    documentAttachment: {},
  },
});

const getters = {
  getChangeBeneficiary: (state) => state.changeBeneficiary,
};

const mutations = {
  setChangeBeneficiary(state, data) {
    state.changeBeneficiary = data;
  },
};

const actions = {
  async changeBeneficiary({ state, rootGetters, dispatch }) {
    const form = {
      ktp_selfie_attachment: state.changeBeneficiary.ktpSelfieAttachment.name,
      ktp_attachment: state.changeBeneficiary.ktpAttachment.name,
      document_attachment: state.changeBeneficiary.documentAttachment?.name || '',
      beneficiary_ktp_attachment: '',
      change_items: state.changeBeneficiary.changeItems.map(x => ({
        party_id: +x.partyId,
        percentage: +x.percentage,
      })),
      changes: state.changeBeneficiary.changes
    };
    
    if (state.changeBeneficiary.changes == "Penambahan / Revisi") {
      form.beneficiary_ktp_attachment = state.changeBeneficiary.beneficiaryKtpAttachment.name;
      form.add_item = {
        ...state.changeBeneficiary.addItem,
        party_id: 0,
        designation: +state.changeBeneficiary.addItem.designation,
        other_designation: state.changeBeneficiary.addItem.designation == '52' ? state.changeBeneficiary.addItem.otherDesignation : '',
        person: {
          first_name: state.changeBeneficiary.addItem.person.firstName,
          mid_name: state.changeBeneficiary.addItem.person.midName,
          last_name: state.changeBeneficiary.addItem.person.lastName,
          certi_type: state.changeBeneficiary.addItem.person.certiType,
          certi_code: state.changeBeneficiary.addItem.person.certiCode,
          gender: state.changeBeneficiary.addItem.person.gender,
          birthday: state.changeBeneficiary.addItem.person.birthday,
          birth_place: state.changeBeneficiary.addItem.person.birthPlace,
          marital_status: state.changeBeneficiary.addItem.person.maritalStatus
        },
      }
    }

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-beneficiary", form)
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
