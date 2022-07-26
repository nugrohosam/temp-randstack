export default {
  searchMenu({dispatch, commit}, data){
    commit('setMenuKeyword', data)
  },
  async getMyPolicy({rootGetters}){
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    const response = await this.$axios
      .$get("/api/v1/policy/get-my-policy")
      .then((response) => {
        if (response.success) {
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  async getSurrenderReasons({rootGetters}, data){
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    const response = await this.$axios
      .$get("/api/v1/reasons")
      .then((response) => {
        if (response.success) {
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  async uploadKtpFile({rootGetters, commit, dispatch}, data){
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type","KTP")
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, {root:true});
    const response = await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        console.log(response);
        if (response.success) {
          commit(
            "setUploadKtpFile",
            data.file
          );
          dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, {root:true});
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  async uploadSelieKtpFile({rootGetters, commit, dispatch}, data){
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type","KTPSELFIE")
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, {root:true});
    const response = await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        console.log(response);
        if (response.success) {
          commit(
            "setUploadSelfieKtpFile",
            data.file
          );
          dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, {root:true});
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  async submitTransactionProposalSurrender({rootGetters, dispatch}, data){
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, {root:true});
    const response = await this.$axios
      .$post("/api/v1/transaction-proposal/surrender", {
        items: [
          {
            'itemdId' : "",
          }
        ],
        cancel_reason: "",
        ktp_attachment: "",
        ktp_selfie_attachment: "",
      })
      .then((response) => {
        console.log(response);
        if (response.success) {
          dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, {root:true});
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
}
