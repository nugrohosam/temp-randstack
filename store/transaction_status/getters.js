export default {
  getMenus: (state) => {
    if (state.menus_search != "") {
      let menu_filtered = state.menus.filter(function (item) {
        let name = item["name"].toLowerCase();
        if (name.includes(state.menus_search.toLowerCase())) {
          return item["name"];
        }
      });
      return menu_filtered;
    }else{
      return state.menus;
    }
  },

  getTransactionStatusList: (state) => {
    // if(state.list_search != ""){
    //   let list_filtered = state.transaction_status_list.filter(function (item) {
    //     let name = item["name"].toLowerCase();
    //     if (name.includes(state.menus_search.toLowerCase())) {
    //       return item["name"];
    //     }
    //   });
    //   
    //   return list_filtered;
    // }else{
      return state.transaction_status_list;
    // }
  }
};
