const state = () => ({
  reuploadDocument: {
    documents: [],
    transaction_id: null,
    service_id: null,
  },
});

const getters = {
  getReuploadDocument: (state) => state.reuploadDocument,
};

const mutations = {
  setReuploadDocument(state, data) {
    state.reuploadDocument = data;
  },
};

const actions = {
  async reuploadDocument({ state, rootGetters, dispatch }) {
    const form = {
      documents: [],
      transaction_id: state.reuploadDocument.transaction_id,
      service_id: state.reuploadDocument.service_id,
    };

    

    for(let i = 0; i < state.reuploadDocument.documents.length; i++){
      form.documents.push({
        name : state.reuploadDocument.documents[i].name,
        attachment : state.reuploadDocument.documents[i].attachment.name,
      })
    }

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$post("/api/v1/transaction-proposal/reupload-pending-document", form)
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
