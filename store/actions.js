export default {
  showResponseAlert: function({commit},data){
    data.show = true;
    commit('setResponseAlert', data);
  },
  closeResponseAlert: function({commit}){
    commit('clearResponseAlert');
  }
};

