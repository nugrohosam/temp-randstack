export default {
  getAuthIsAuth: (state) => {
    return state.is_auth;
  },
  getAuthPhoneNumber: (state) => {
    return state.user.phoneNumber;
  },
  getAuthAccessToken: (state) => {
    return state.user.accessToken;
  },
  getAuthUser: (state) => {
    return state.user;
  }
}
