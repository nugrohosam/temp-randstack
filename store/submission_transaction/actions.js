export default {
  searchMenu({ dispatch, commit }, data) {
    commit("setMenuKeyword", data);
  },
  async getBanks({ rootGetters, commit, dispatch }) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    await this.$axios
      .$get("/api/v1/banks")
      .then((response) => {
        if (response.success) {
          commit("setBanks", response.data);
        }
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  async getMyPolicy({ rootGetters, commit, dispatch }) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    const response = await this.$axios
      .$get("/api/v1/policy/get-my-policy")
      .then((response) => {
        if (response.success) {
          commit("setMyPolicy", response.data);
          // return response.data;
        }
        return response;
      })
      .catch((error) => {
        return error;
      });

    dispatch("getMyPolicyLoanInfo");
    
    const responseData = response.data;
    const productIds = responseData.policyWithCode.coverages.map(
      (product) => product.productId
      );
    let products = [];

    const productPriio = responseData.policyWithCode.coverages.find((product) => product.masterProduct == null);
    dispatch("getProductRiders", productPriio.productId);

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

    responseData.policyWithCode.coverages =
      responseData.policyWithCode.coverages.map((v, i) => {

        const foundProduct = products.filter(
          (product) => product.id == v.productId
        )[0];

        v.productName = foundProduct?.name || "-";
        v.benefitLevelInfoVOList = foundProduct?.benefitLevelInfoVOList || [];
        v.minSurValue = foundProduct?.minSurValue || 0;
        v.maxSurValue = foundProduct?.maxSurValue || 0;

        const level = v.currentPremium.benefitLevel ?? null;
        if (level) {
          const benefitLevels = foundProduct.benefitLevelInfoVOList.filter(
            (v, i) => v.benefitLevel == level
          );
          
          const foundBenefitLevel =
            benefitLevels.length > 0 ? benefitLevels[0].levelDescrp : "-";
          v.benefitLevelDescrp = foundBenefitLevel;
        } else {
          v.benefitLevelDescrp = "-";
        }

        return v;
      });

    response.data = responseData;
    return response;
  },

  async getMyPolicyLoanInfo({ rootGetters, commit }) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$get("/api/v1/policy/get-my-policy-loan-info")
      .then((response) => {
        if (response.success) {
          commit("setMyPolicyLoanInfo", response.data);
        }
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  async getSurrenderReasons({ rootGetters }, data) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
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
      },

  async uploadKtpFile({ rootGetters, commit, dispatch }, data) {
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type", "KTP");
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        if (response.success) {
          commit("setUploadKtpFile", {
            stream: data.file,
            upload: response.data.name,
          });
          dispatch(
            "toggleOverlayLoading",
            { show: false, message: "Mohon Tunggu..." },
            { root: true }
          );
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
      },

  async uploadKkFile({ rootGetters, commit, dispatch }, data) {
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type", "KK");
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        if (response.success) {
          commit("setUploadKkFile", {
            stream: data.file,
            upload: response.data.name,
          });
          dispatch(
            "toggleOverlayLoading",
            { show: false, message: "Mohon Tunggu..." },
            { root: true }
          );
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
      },
    
  async uploadSavingBookFile({ rootGetters, commit, dispatch }, data) {
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type", "SAVINGBOOK");
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        if (response.success) {
          commit("setUploadSavingBookFile", {
            stream: data.file,
            upload: response.data.name,
          });
          dispatch(
            "toggleOverlayLoading",
            { show: false, message: "Mohon Tunggu..." },
            { root: true }
          );
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
      },
    
    async uploadTransferFile({ rootGetters, commit, dispatch }, data) {
      let formData = new FormData();
      formData.append("File", data.file);
      formData.append("Type", "TRANSFER");
      this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
      dispatch(
        "toggleOverlayLoading",
        { show: true, message: "Mohon Tunggu..." },
        { root: true }
      );
      return await this.$axios
        .$post("/api/v1/attachments", formData)
        .then((response) => {
          if (response.success) {
            commit("setUploadTransferFile", {
              stream: data.file,
              upload: response.data.name,
            });
            dispatch(
              "toggleOverlayLoading",
              { show: false, message: "Mohon Tunggu..." },
              { root: true }
            );
            return response.data;
          }
          // return response;
        })
        .catch((error) => {
          return error;
        });
      },
  
  async uploadIlustrationFile({ rootGetters, commit, dispatch }, data) {
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type", "ILUSTRATION");
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        if (response.success) {
          commit("setUploadIlustrationFile", {
            stream: data.file,
            upload: response.data.name,
          });
          dispatch(
            "toggleOverlayLoading",
            { show: false, message: "Mohon Tunggu..." },
            { root: true }
          );
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
  },
  
  async uploadSelieKtpFile({ rootGetters, commit, dispatch }, data) {
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type", "KTPSELFIE");
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        if (response.success) {
          commit("setUploadSelfieKtpFile", {
            stream: data.file,
            upload: response.data.name,
          });
          dispatch(
            "toggleOverlayLoading",
            { show: false, message: "Mohon Tunggu..." },
            { root: true }
          );
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
  },
         
  async uploadDocumentFile({ rootGetters, commit, dispatch }, data) {
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type", "DOCUMENT");
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        if (response.success) {
          commit("setDocumentKtpFile", {
            stream: data.file,
            upload: response.data.name,
          });
          dispatch(
            "toggleOverlayLoading",
            { show: false, message: "Mohon Tunggu..." },
            { root: true }
          );
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
    },
            
  async submitTransactionProposalSurrender(
    { rootGetters, getters, dispatch, commit },
    data
  ) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    let items = [];
    if (getters.getCoveragesSelected.find((v) => v.productType == "Utama")) {
      items.push({
        itemId: getters.getCoveragesSelected.find(
          (v) => v.productType == "Utama"
        ).itemId,
      });
    } else {
      getters.getCoveragesSelected.forEach((v, i) =>
        items.push({
          itemId: v.itemId,
        })
      );
    }

    let changePayeeAccount = rootGetters[
      "submission_transaction/change_payee_refund_account/getChangePayeeRefundAccount"
    ];
    let form = {
      items: items,
      cancel_reason: getters.getReasonSelected[0].name,
    };

    const isUseChangePayeeAccount = changePayeeAccount.bank != null || changePayeeAccount.bank != ""
    if (isUseChangePayeeAccount) {

      changePayeeAccount = {
        family_attachment: changePayeeAccount.family_attachment,
        status_family_attachment: changePayeeAccount.status_family_attachment,
        new_no_rek: changePayeeAccount.new_no_rek,
        bank: changePayeeAccount.bank,
        branch: changePayeeAccount.branch,
        rek_owner: changePayeeAccount.rek_owner,
        saving_book_attachment: changePayeeAccount.saving_book_attachment?.name || null,
        ktp_attachment: changePayeeAccount.ktp_attachment?.name || null,
        document_attachment: changePayeeAccount.document_attachment?.name || null,
        ktp_selfie_attachment: changePayeeAccount.ktp_selfie_attachment?.name || null,
      }

      if (changePayeeAccount.family_attachment) {
        if (changePayeeAccount.status_family_attachment === "KK") {
          changePayeeAccount.kk_attachment = changePayeeAccount.family_attachment?.name || null;
        } else {
          changePayeeAccount.birth_certificate_attachment =
            changePayeeAccount.family_attachment?.name || null;
        }
      }

      form = { ...form, ...changePayeeAccount }
    }

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );

    const endpoint = !isUseChangePayeeAccount ? "/api/v1/transaction-proposal/surrender" : "/api/v1/transaction-proposal/surrender-with-payee";
    return await this.$axios
      .$post(endpoint, form)
      .then((response) => {
        dispatch(
          "toggleOverlayLoading",
          { show: false, message: "Mohon Tunggu..." },
          { root: true }
        );
        const result = dispatch("getMyPolicy");
        commit("clearUploadKtpFile");
        commit("clearUploadSelfieKtpFile");
        commit("clearUploadKkFile");
        commit("clearCoveragesSelected");
        // commit('clearReasonSelected');
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  async submitCheckFreelookCOPAndNoRekKosong(
    { rootGetters, getters, dispatch, commit },
    data
  ) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    let items = [];
    if (getters.getCoveragesSelected.find((v) => v.productType == "Utama")) {
      items.push({
        itemId: getters.getCoveragesSelected.find(
          (v) => v.productType == "Utama"
        ).itemId,
      });
    } else {
      getters.getCoveragesSelected.forEach((v, i) =>
        items.push({
          itemId: v.itemId,
        })
      );
    }

    const form = {
      items: items
    };
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post("/api/v1/transaction-proposal/check-cop-freelook-payee-account", form)
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
    
  async getProducts({ rootGetters, dispatch, commit }, data) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$get(`/api/v1/products?ids=${data}`)
      .then((response) => {
        if (response.success) {
          return response.data;
        }
        return response;
      })
      .catch((error) => {
        return error;
      });
    },

  async getProduct({ rootGetters, dispatch, commit }, productId) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$get(`/api/v1/products/${productId}`)
      .then((response) => {
        if (response.success) {
          return response.data;
        }
        return response;
      })
      .catch((error) => {
        return error;
      });
    },

  async getProductRiders({ rootGetters, dispatch, commit }, id) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    const response = await this.$axios
      .$get(`/api/v1/product-riders/${id}`)
      .then((response) => {
        if (response.success) {
          commit("setProductRiders", response.data);
        }
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  async saveCustomerinfo({ rootGetters, dispatch, commit }, data) {
    commit("setCustomerInfoChanged", data);
  },

  async updateCustomerInformation({ rootGetters, dispatch, commit, getters }) {
    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    const customerInformation = getters.getCustomerInfoChanged;
    const form = {
      party_d: this.$isNull(customerInformation.selectedPolicy.partyId),
      party_contract: {
        email: this.$isNull(customerInformation.selectedPolicy.person.email),
        mobile: this.$isNull(customerInformation.selectedPolicy.person.mobile),
        mobile_2: this.$isNull(
          customerInformation.selectedPolicy.person.mobile2
        ),
        office_tel: this.$isNull(
          customerInformation.selectedPolicy.person.officeTel
        ),
        office_tel_2: this.$isNull(
          customerInformation.selectedPolicy.person.officeTel2
        ),
        home_tel: this.$isNull(
          customerInformation.selectedPolicy.person.homeTel
        ),
        contact_tel: "",
        fax: this.$isNull(customerInformation.selectedPolicy.person.fax),
        office_tel_ext: this.$isNull(
          customerInformation.selectedPolicy.person.officeTelExt
        ),
      },
      address: {
        postCode: this.$isNull(
          customerInformation.selectedPolicy.address.postCode
        ),
        address_1: this.$isNull(
          customerInformation.selectedPolicy.address.address1
        ),
        street: this.$isNull(customerInformation.selectedPolicy.address.street),
        rt_rw: this.$isNull(
          customerInformation.selectedPolicy.address.address3
        ),
        province_id:
          customerInformation.selectedProvince?.id != null
            ? this.$isNull(customerInformation.selectedProvince.id)
            : null,
        city_id:
          customerInformation.selectedCity?.id != null
            ? this.$isNull(customerInformation.selectedCity.id)
            : null,
        district_id:
          customerInformation.selectedDistrict?.id != null
            ? this.$isNull(customerInformation.selectedDistrict.id)
            : null,
        village_id:
          customerInformation.selectedVillage?.id != null
            ? this.$isNull(customerInformation.selectedVillage.id)
            : null,
        address_type: this.$isNull(
          customerInformation.selectedPolicy.addressType.type.toString()
        ),
      },
      ktp_selfie_attachment: getters.getSelfieKtpUploadFileName,
    };

    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post("/api/v1/policy/change-customer-info", form)
      .then((response) => {
        dispatch(
          "toggleOverlayLoading",
          { show: false, message: "Mohon Tunggu..." },
          { root: true }
        );
        const result = dispatch("getMyPolicy");
        return response;
      })
      .catch((error) => {
        return error;
      });

      },

  async uploadAttachment({ rootGetters, dispatch }, data) {
    let formData = new FormData();
    formData.append("File", data.file);
    formData.append("Type", data.type);

    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post("/api/v1/attachments", formData)
      .then((response) => {
        if (response.success) {
          dispatch(
            "toggleOverlayLoading",
            { show: false, message: "Mohon Tunggu..." },
            { root: true }
          );
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
      },
};
