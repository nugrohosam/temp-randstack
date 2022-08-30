export default {
  searchMenu({ dispatch, commit }, data) {
    commit('setMenuKeyword', data)
  },
  async getMyPolicy({ rootGetters, commit, dispatch }) {
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

    dispatch("getMyPolicyLoanInfo")

    const responseData = response.data;
    const productIds = responseData.policyWithCode.coverages.map(product => product.productId)
    let products = [];
    products = await this.$axios
      .$get(`/api/v1/products?ids=${productIds.join()}`)
      .then((response) => {
        if (response.success) {
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });

    responseData.policyWithCode.coverages = responseData.policyWithCode.coverages.map((v, i) => {

      const foundProduct = products.filter(
        (product) => product.id == v.productId
      )[0];
      v.productName = foundProduct.name;

      const level = v.currentPremium.benefitLevel ?? null;
      if (level) {
        const benefitLevels = foundProduct.benefitLevelInfoVOList.filter((v, i) => v.benefitLevel == level);
        const foundBenefitLevel = benefitLevels.length > 0 ? benefitLevels[0].levelDescrp : "-";
        v.benefitLevel = foundBenefitLevel;
      } else {
        v.benefitLevel = "-";
      }


      return v;
    });

    response.data = responseData
    return response;
  },

  async getMyPolicyLoanInfo({ rootGetters, commit }) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$get("/api/v1/policy/get-my-policy-loan-info")
      .then((response) => {
        if (response.success) {
          commit("setMyPolicyLoanInfo", response.data);
          // return response.data;
        }
        return response;
      })
      .catch((error) => {
        return error;
      });
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
    let items = [];
    if (getters.getCoveragesSelected.find((v) => v.productType == "Utama")) {
      items.push({
        itemId: getters.getCoveragesSelected.find((v) => v.productType == "Utama").itemId
      });
    } else {
      getters.getCoveragesSelected.forEach((v, i) =>
        items.push({
          itemId: v.itemId
        }));
    }


    const form = {
      items: items,
      cancel_reason: getters.getReasonSelected[0].name,
      ktp_selfie_attachment: getters.getSelfieKtpUploadFileName,
    }
    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, { root: true });
    const response = await this.$axios
      // .$post("/api/v1/transaction-proposal/surrender", form)
      .$post("/api/v1/transaction-proposal/surrender", form)
      .then((response) => {
        dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, { root: true });
        const result = dispatch('getMyPolicy');
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
      party_d: this.$isNull(customerInformation.selectedPolicy.partyId),
      party_contract: {
        email: this.$isNull(customerInformation.selectedPolicy.person.email),
        mobile: this.$isNull(customerInformation.selectedPolicy.person.mobile),
        mobile_2: this.$isNull(customerInformation.selectedPolicy.person.mobile2),
        office_tel: this.$isNull(customerInformation.selectedPolicy.person.officeTel),
        office_tel_2: this.$isNull(customerInformation.selectedPolicy.person.officeTel2),
        home_tel: this.$isNull(customerInformation.selectedPolicy.person.homeTel),
        contact_tel: "",
        fax: this.$isNull(customerInformation.selectedPolicy.person.fax),
        office_tel_ext: this.$isNull(customerInformation.selectedPolicy.person.officeTelExt)
      },
      address: {
        postCode: this.$isNull(customerInformation.selectedPolicy.address.postCode),
        address_1: this.$isNull(customerInformation.selectedPolicy.address.address1),
        street: this.$isNull(customerInformation.selectedPolicy.address.street),
        rt_rw: this.$isNull(customerInformation.selectedPolicy.address.address3),
        province_id: customerInformation.selectedProvince?.id != null ? this.$isNull(customerInformation.selectedProvince.id) : null,
        city_id: customerInformation.selectedCity?.id != null ? this.$isNull(customerInformation.selectedCity.id) : null,
        district_id: customerInformation.selectedDistrict?.id != null ? this.$isNull(customerInformation.selectedDistrict.id) : null,
        village_id: customerInformation.selectedVillage?.id != null ? this.$isNull(customerInformation.selectedVillage.id) : null,
        address_type: this.$isNull(customerInformation.selectedPolicy.addressType.type.toString())
      },
      ktp_selfie_attachment: getters.getSelfieKtpUploadFileName,
    }


    dispatch('toggleOverlayLoading', { show: true, message: 'Mohon Tunggu...' }, { root: true });
    const response = await this.$axios
      .$post("/api/v1/policy/change-customer-info", form)
      .then((response) => {
        dispatch('toggleOverlayLoading', { show: false, message: 'Mohon Tunggu...' }, { root: true });
        const result = dispatch('getMyPolicy');
        return response;
      })
      .catch((error) => {
        return error;
      });

    return response;
  }

}
