export default {
  getAuthIsAuth: (state) => {
    return state.is_auth;
  },
  getAuthPhoneNumber: (state) => {
    return state.user.phone_number;
  },
  getAuthAccessToken: (state) => {
    return state.user.access_token;
  },
  getAuthUser: (state) => {
    return state.user;
  }
}
