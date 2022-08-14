export default {
  setMenuKeyword(state, data){
    state.menus_search = data.keywords
  },

  setTransactionStatusList(state, data){
    state.transaction_status_list = data;
  }
}
