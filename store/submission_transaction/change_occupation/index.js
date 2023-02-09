const state = () => ({
  changeOccupation: {
    partyId: "",
    company: "",
    positionLevel: "",
    industry: "",
    occupation: "",
    otherIndustry: "",
    otherOccupation: "",
    ktpSelfieAttachment: "",
  },
});

const getters = {
  getChangeOccupation: (state) => state.changeOccupation,
};

const mutations = {
  setChangeOccupation(state, data) {
    state.changeOccupation = data;
  },
};

const actions = {
  async changeOccupation({ state, rootGetters, dispatch }) {
    const form = {
      party_id: state.changeOccupation.partyId,
      company: state.changeOccupation.company,
      occupation: +state.changeOccupation.occupation,
      position_level: state.changeOccupation.positionLevel,
      industry: +state.changeOccupation.industry,
      other_industry: state.changeOccupation.otherIndustry,      
      other_occupation: state.changeOccupation.otherOccupation,      
      ktp_selfie_attachment: state.changeOccupation.ktpSelfieAttachment.name,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/change-occupation", form)
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
