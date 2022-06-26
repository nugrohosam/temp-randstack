export default {
  setUser(state, data){
    // state.is_auth = true
    state.user.phone_number = data.phone_number
    state.user.identity_number = data.identity_number
    state.user.policy_number = data.policy_number
    state.user.role = data.role
    state.user.original_user_name = data.original_user_name
    state.user.access_token = data.access_token
    state.user.refresh_token = data.refresh_token
  },
  setAuth(state){
    state.is_auth = true;
  },

  clearAuth(state){
    state.user.phone_number = ""
    state.user.identity_number = ""
    state.user.policy_number = ""
    state.user.role = ""
    state.user.original_user_name = ""
    state.user.access_token = ""
    state.user.refresh_token = ""
    state.is_auth = false
  }
}
