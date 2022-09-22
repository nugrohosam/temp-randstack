export default {
  getMenus: (state) => {
    if (state.menus_search != "") {
      let menu_filtered = state.menus.filter(function (item) {
        let name = item["name"].toLowerCase();
        if (name.includes(state.menus_search.toLowerCase())) {
          return item["name"];
        }
      });

      return menu_filtered;
    } else {
      return state.menus;
    }
  },
  getMyPolicy: (state) => {
    return state.myPolicy;
  },
  getProductRiders: (state) => {
    return state.riders;
  },
  getMyPolicyLoanInfo: (state) => {
    return state.myPolicyLoanInfo;
  },
  getKtpFile: (state) => {
    return state.cancellation_main_product.upload.ktp.file;
  },
  getSelfieKtpFile: (state) => {
    return state.cancellation_main_product.upload.selfie_ktp.file;
  },
  getKtpFileName: (state) => {
    return state.cancellation_main_product.upload.ktp.name;
  },
  getSelfieKtpFileName: (state) => {
    return state.cancellation_main_product.upload.selfie_ktp.name;
  },
  getKtpUploadFileName: (state) => {
    return state.cancellation_main_product.upload.ktp.upload_filename;
  },
  getSelfieKtpUploadFileName: (state) => {
    return state.cancellation_main_product.upload.selfie_ktp.upload_filename;
  },
  getCoveragesSelected: (state) => {
    return state.cancellation_main_product.coverages_selected;
  },
  getReasonSelected: (state) => {
    return state.cancellation_main_product.reason_selected;
  },
  getCustomerInfoChanged: (state) => {
    return state.customerInfo.resume;
  },
  getCurrentHeaderTitle: (state) => state.currentHeaderTitle,
};
