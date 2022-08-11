export default {
  setMenuKeyword(state, data){
    state.menus_search = data.keywords
  },
  setUploadKtpFile(state, data){
    state.cancellation_main_product.upload.ktp.file = data.stream;
    state.cancellation_main_product.upload.ktp.name = data.stream.name
    state.cancellation_main_product.upload.ktp.upload_filename = data.upload;
  },
  setUploadSelfieKtpFile(state, data){
    state.cancellation_main_product.upload.selfie_ktp.file = data.stream;
    state.cancellation_main_product.upload.selfie_ktp.name = data.stream.name;
    state.cancellation_main_product.upload.selfie_ktp.upload_filename = data.upload;
  },
  setCoveragesSelected(state, data){
    state.cancellation_main_product.coverages_selected = data;
  },
  setReasonSelected(state, data){
    state.cancellation_main_product.reason_selected = data;
  },
  setCustomerInfoChanged(state, data){
    state.customerInfo.resume = data;
  },
  setMyPolicy(state, data){
    state.myPolicy = data;
  },
  clearUploadSelfieKtpFile(state){
    state.cancellation_main_product.upload.selfie_ktp.file = null;
    state.cancellation_main_product.upload.selfie_ktp.name = '';
    state.cancellation_main_product.upload.selfie_ktp.upload_filename = '';
  },
  clearUploadKtpFile(state){
    state.cancellation_main_product.upload.ktp.file = null;
    state.cancellation_main_product.upload.ktp.name = '';
    state.cancellation_main_product.upload.ktp.upload_filename = '';
  },
  clearCoveragesSelected(state){
    state.cancellation_main_product.coverages_selected = [];
  },
  clearReasonSelected(state){
    state.cancellation_main_product.reason_selected = null;
  },
}
