export default {
  setMenuKeyword(state, data){
    state.menus_search = data.keywords
    // console.log(state.menus_search);
  },
  setUploadKtpFile(state, data){
    state.cancellation_main_product.upload.ktp.file = data;
    state.cancellation_main_product.upload.ktp.name = data.name
  },
  setUploadSelfieKtpFile(state, data){
    state.cancellation_main_product.upload.selfie_ktp.file = data;
    state.cancellation_main_product.upload.selfie_ktp.name = data.name
  },
  setCoveragesSelected(state, data){
    state.cancellation_main_product.coverages_selected = data;
  },
  setReasonSelected(state, data){
    state.cancellation_main_product.reason_selected = data;
  }
}
