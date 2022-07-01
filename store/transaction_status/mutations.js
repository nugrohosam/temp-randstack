export default {
  setMenuKeyword(state, data){
    state.menus_search = data.keywords
    // console.log(state.menus_search);
  },

  setTransactionStatusList(state, data){
    state.transaction_status_list = data;
  }
}
