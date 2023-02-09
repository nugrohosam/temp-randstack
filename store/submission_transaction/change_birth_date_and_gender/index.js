const state = () => ({
  changeBirthDateAndGender: {
    items: []  
  },
});

const getters = {
  getChangeBirthDateAndGender: (state) => state.changeBirthDateAndGender,
};

const mutations = {
  setChangeBirthDateAndGender(state, data) {
    state.changeBirthDateAndGender = data;
  },
};

const actions = {
  async changeBirthDateAndGender({ state, rootGetters, dispatch }) {
    const items = state.changeBirthDateAndGender.items.map(x => ({
      party_id: x.partyId,
      birth_date: x.birthDate,
      gender: x.gender,
      ktp_selfie_attachment: x.ktpSelfieAttachment.name,
      ktp_attachment: x.ktpAttachment.name,
      document_attachment: x.documentAttachment.name,
    }));

    const form = {
      items
    }
    
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-birth-date-and-gender", form)
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
