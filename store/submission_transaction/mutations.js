export default {
  setMenuKeyword(state, data){
    state.menus_search = data.keywords
    // console.log(state.menus_search);
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
  }
}
