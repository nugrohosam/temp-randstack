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
  getBanks: (state) => {
    return state.banks;
  },
  getProductRiders: (state) => {
    return state.riders;
  },
  getMyPolicyLoanInfo: (state) => {
    return state.myPolicyLoanInfo;
  },

  getKtpFile: (state) => {
    return state.attachments.upload.ktp.file;
  },
  getKtpFileName: (state) => {
    return state.attachments.upload.ktp.name;
  },
  getKtpUploadFileName: (state) => {
    return state.attachments.upload.ktp.upload_filename;
  },

  getKkFile: (state) => {
    return state.attachments.upload.kk.file;
  },
  getKkFileName: (state) => {
    return state.attachments.upload.kk.name;
  },
  getKkUploadFileName: (state) => {
    return state.attachments.upload.kk.upload_filename;
  },

  getBirthCeritificateFile: (state) => {
    return state.attachments.upload.birth_certificate.file;
  },
  getBirthCeritificateFileName: (state) => {
    return state.attachments.upload.birth_certificate.name;
  },
  getBirthCeritificateUploadFileName: (state) => {
    return state.attachments.upload.birth_certificate.upload_filename;
  },

  getSavingBookFile: (state) => {
    return state.attachments.upload.saving_book.file;
  },
  getSavingBookFileName: (state) => {
    return state.attachments.upload.saving_book.name;
  },
  getSavingBookUploadFileName: (state) => {
    return state.attachments.upload.saving_book.upload_filename;
  },

  getSelfieKtpFile: (state) => {
    return state.attachments.upload.selfie_ktp.file;
  },
  getSelfieKtpFileName: (state) => {
    return state.attachments.upload.selfie_ktp.name;
  },
  getSelfieKtpUploadFileName: (state) => {
    return state.attachments.upload.selfie_ktp.upload_filename;
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
