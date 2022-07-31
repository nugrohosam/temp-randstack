export default {
  setUser(state, data){
    // state.is_auth = true
    state.user.phoneNumber = data.phoneNumber
    state.user.identityNumber = data.identityNumber
    state.user.policyNumber = data.policyNumber
    state.user.role = data.role
    state.user.originalUserName = data.originalUserName
    state.user.accessToken = data.accessToken
    state.user.refreshToken = data.refreshToken
  },
  setAuth(state){
    state.is_auth = true;
  },

  clearAuth(state){
    state.user.phoneNumber = ""
    state.user.identityNumber = ""
    state.user.policyNumber = ""
    state.user.role = ""
    state.user.originalUserName = ""
    state.user.accessToken = ""
    state.user.refreshToken = ""
    state.is_auth = false
  }
}
