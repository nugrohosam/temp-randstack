export default {
  getShowResponseAlert: (state) => {
    return state.response_alert.show
  },
  getMessageResponseAlert: (state) => {
    return state.response_alert.message
  }
};
