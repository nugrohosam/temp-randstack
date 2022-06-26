export default {
  setResponseAlert(state, data){
    state.response_alert.show = true;
    state.response_alert.message = data.message;
    state.response_alert.status_code = data.status_code;
  },
  clearResponseAlert(state){
    state.response_alert.show = false;
    state.response_alert.message = "";
    state.response_alert.status_code = "";
  }
};
