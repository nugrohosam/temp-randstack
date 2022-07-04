export default {
  getShowResponseAlert: (state) => {
    return state.response_alert.show
  },
  getMessageResponseAlert: (state) => {
    return state.response_alert.message
  },
  getShowOverlayLoading: (state) => {
    return state.overlay_loading.show
  },
  getMessageOverlayLoading: (state) => {
    return state.overlay_loading.message
  }
};
