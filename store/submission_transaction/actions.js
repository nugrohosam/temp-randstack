export default {
  searchMenu({ dispatch, commit }, data) {
    commit('setMenuKeyword', data)
  },
  async getMyPolicy({ rootGetters, commit }) {
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    const response = await this.$axios
      .$get("/api/v1/policy/get-my-policy")
      .then((response) => {
        if (response.success) {
          commit('setMyPolicy', response.data);
          // return response.data;
        }
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  async getSurrenderReasons({ rootGetters }, data) {
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

  async uploadKtpFile({ rootGetters, commit, dispatch }, data) {
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type", "KTP")
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, { root: true });
    const response = await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        if (response.success) {
          commit(
            "setUploadKtpFile",
            {
              stream: data.file,
              upload: response.data.name
            }
          );
          dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, { root: true });
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  async uploadSelieKtpFile({ rootGetters, commit, dispatch }, data) {
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type", "KTPSELFIE")
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, { root: true });
    const response = await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        if (response.success) {
          commit(
            "setUploadSelfieKtpFile",
            {
              stream: data.file,
              upload: response.data.name
            }
          );
          dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, { root: true });
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  async submitTransactionProposalSurrender({ rootGetters, getters, dispatch, commit }, data) {
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    const items = []
    getters.getCoveragesSelected.forEach((v, i) => items.push({
      itemId: v.itemId
    }));

    const form = {
      items: items,
      cancel_reason: getters.getReasonSelected[0].name,
      ktp_attachment: getters.getKtpUploadFileName,
      ktp_selfie_attachment: getters.getSelfieKtpUploadFileName,
    }
    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, { root: true });
    const response = await this.$axios
      .$post("/api/v1/transaction-proposal/surrender", form)
      .then((response) => {
        dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, { root: true });
        commit('clearUploadSelfieKtpFile');
        commit('clearUploadKtpFile');
        commit('clearCoveragesSelected');
        // commit('clearReasonSelected');
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;


  },

  async getProducts({ rootGetters, dispatch, commit }, data) {
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    const response = await this.$axios
      .$get(`/api/v1/products?ids=${data}`)
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

  async saveCustomerinfo({ rootGetters, dispatch, commit }, data) {
    commit('setCustomerInfoChanged', data);
  },

  async updateCustomerInformation({ rootGetters, dispatch, commit, getters }) {
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    const customerInformation = getters.getCustomerInfoChanged;
    const form = {
      party_d: this.$isNull(customerInformation.partyId),
      party_contract: {
        email: this.$isNull(customerInformation.person.email),
        mobile: this.$isNull(customerInformation.person.mobile),
        mobile_2: this.$isNull(customerInformation.person.mobile2),
        office_tel: this.$isNull(customerInformation.person.officeTel),
        office_tel_2: this.$isNull(customerInformation.person.officeTel2),
        home_tel: this.$isNull(customerInformation.person.homeTel),
        contact_tel: "",
        fax: this.$isNull(customerInformation.person.fax),
        office_tel_ext: this.$isNull(customerInformation.person.officeTelExt)
      },
      address: {
        postCode: this.$isNull(customerInformation.address.postCode),
        address_1: this.$isNull(customerInformation.address.address1),
        street: this.$isNull(customerInformation.address.street),
        rt_rw: this.$isNull(customerInformation.address.address3),
        province_id: this.$isNull(customerInformation.address.province),
        city_id: this.$isNull(customerInformation.address.city),
        district_id: this.$isNull(customerInformation.address.address4),
        village_id: this.$isNull(customerInformation.address.village)
      },
      ktp_selfie_attachment: getters.getSelfieKtpUploadFileName,
    }

    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, { root: true });
    const response = await this.$axios
      .$post("/api/v1/policy/change-customer-info", form)
      .then((response) => {
        dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, { root: true });
        return response;
      })
      .catch((error) => {
        return error;
      });

    return response;
  }

}
