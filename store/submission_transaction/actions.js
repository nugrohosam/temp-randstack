export default {
  searchMenu({dispatch, commit}, data){
    commit('setMenuKeyword', data)
  }
}
