export default {
  signIn({dispatch, commit}, data){
    alert("SIGN IN");
    // url endpoint, request
    commit('setUser', {
      'polis' : '123',
      'email' : 'azharogi@gmail.com',
      'toke' : 'Bearer XXX',
    })
  }
}
