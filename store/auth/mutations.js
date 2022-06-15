export default {
  setUser(state, data){
    state.is_auth = true
    state.user.polis = data.polis
    state.user.email = data.email
    state.user.token = data.token
  }
}
