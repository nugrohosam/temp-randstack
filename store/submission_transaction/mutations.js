export default {
  setMenuKeyword(state, data) {
    state.menus_search = data.keywords;
  },
  
  setUploadKtpFile(state, data) {
    state.attachments.upload.ktp.file = data.stream;
    state.attachments.upload.ktp.name = data.stream.name;
    state.attachments.upload.ktp.upload_filename = data.upload;
  },
  clearUploadKtpFile(state) {
    state.attachments.upload.ktp.file = null;
    state.attachments.upload.ktp.name = "";
    state.attachments.upload.ktp.upload_filename = "";
  },

  setUploadTransferFile(state, data) {
    state.attachments.upload.transfer.file = data.stream;
    state.attachments.upload.transfer.name = data.stream.name;
    state.attachments.upload.transfer.upload_filename = data.upload;
  },
  clearUploadTransferFile(state) {
    state.attachments.upload.transfer.file = null;
    state.attachments.upload.transfer.name = "";
    state.attachments.upload.transfer.upload_filename = "";
  },

  setUploadSavingBookFile(state, data) {
    state.attachments.upload.saving_book.file = data.stream;
    state.attachments.upload.saving_book.name = data.stream.name;
    state.attachments.upload.saving_book.upload_filename = data.upload;
  },
  clearUploadSavingBookFile(state) {
    state.attachments.upload.saving_book.file = null;
    state.attachments.upload.saving_book.name = "";
    state.attachments.upload.saving_book.upload_filename = "";
  },

  setUploadBankAuthorizationFile(state, data) {
    state.attachments.upload.bank_authorization.file = data.stream;
    state.attachments.upload.bank_authorization.name = data.stream.name;
    state.attachments.upload.bank_authorization.upload_filename = data.upload;
  },
  clearUploadBankAuthorizationFile(state) {
    state.attachments.upload.bank_authorization.file = null;
    state.attachments.upload.bank_authorization.name = "";
    state.attachments.upload.bank_authorization.upload_filename = "";
  },

  setUploadBeneficiaryOwnerFile(state, data) {
    state.attachments.upload.beneficiary_owner.file = data.stream;
    state.attachments.upload.beneficiary_owner.name = data.stream.name;
    state.attachments.upload.beneficiary_owner.upload_filename = data.upload;
  },
  clearUploadBeneficiaryOwnerFile(state) {
    state.attachments.upload.beneficiary_owner.file = null;
    state.attachments.upload.beneficiary_owner.name = "";
    state.attachments.upload.beneficiary_owner.upload_filename = "";
  },

  setUploadBirthCertificateFile(state, data) {
    state.attachments.upload.saving_book.file = data.stream;
    state.attachments.upload.saving_book.name = data.stream.name;
    state.attachments.upload.saving_book.upload_filename = data.upload;
  },
  clearUploadBirthCertificateFile(state) {
    state.attachments.upload.birth_certificate.file = null;
    state.attachments.upload.birth_certificate.name = "";
    state.attachments.upload.birth_certificate.upload_filename = "";
  },

  setUploadSelfieKtpFile(state, data) {
    state.attachments.upload.selfie_ktp.file = data.stream;
    state.attachments.upload.selfie_ktp.name = data.stream.name;
    state.attachments.upload.selfie_ktp.upload_filename =
      data.upload;
  },
  clearUploadSelfieKtpFile(state) {
    state.attachments.upload.selfie_ktp.file = null;
    state.attachments.upload.selfie_ktp.name = "";
    state.attachments.upload.selfie_ktp.upload_filename = "";
  },

  setUploadIlustrationFile(state, data) {
    state.attachments.upload.ilustration.file = data.stream;
    state.attachments.upload.ilustration.name = data.stream.name;
    state.attachments.upload.ilustration.upload_filename =
      data.upload;
  },
  clearUploadIlustrationFile(state) {
    state.attachments.upload.ilustration.file = null;
    state.attachments.upload.ilustration.name = "";
    state.attachments.upload.ilustration.upload_filename = "";
  },

  setDocumentKtpFile(state, data) {
    state.attachments.upload.document.file = data.stream;
    state.attachments.upload.document.name = data.stream.name;
    state.attachments.upload.document.upload_filename =
      data.upload;
  },
  clearDocumentKtpFile(state) {
    state.attachments.upload.document.file = null;
    state.attachments.upload.document.name = "";
    state.attachments.upload.document.upload_filename = "";
  },

  setUploadKkFile(state, data) {
    state.attachments.upload.kk.file = data.stream;
    state.attachments.upload.kk.name = data.stream.name;
    state.attachments.upload.kk.upload_filename =
      data.upload;
  },
  clearUploadKkFile(state) {
    state.attachments.upload.kk.file = null;
    state.attachments.upload.kk.name = "";
    state.attachments.upload.kk.upload_filename = "";
  },
  
  setCoveragesSelected(state, data) {
    state.cancellation_main_product.coverages_selected = data;
  },
  setReasonSelected(state, data) {
    state.cancellation_main_product.reason_selected = data;
  },
  setCustomerInfoChanged(state, data) {
    state.customerInfo.resume = data;
  },
  setMyPolicy(state, data) {
    state.myPolicy = data;
  },
  setBanks(state, data) {
    state.banks = data;
  },
  setOccupations(state, data) {
    state.occupations = data;
  },
  setIndustries(state, data) {
    state.industries = data;
  },
  setCreditCardBanks(state, data) {
    state.creditCardBanks = data;
  },
  setMyPolicyLoanInfo(state, data) {
    state.myPolicyLoanInfo = data;
  },
  setProductRiders(state, data) {
    state.riders = data;
  },
  clearCoveragesSelected(state) {
    state.cancellation_main_product.coverages_selected = [];
  },
  clearReasonSelected(state) {
    state.cancellation_main_product.reason_selected = null;
  },
  setCurrentHeaderTitle(state, data) {
    state.currentHeaderTitle = data;
  },
  removeCurrentHeaderTitle(state) {
    state.currentHeaderTitle = {
      title: "",
      sub: "",
    };
  },
};
