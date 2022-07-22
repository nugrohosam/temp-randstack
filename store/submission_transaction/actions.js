export default {
  searchMenu({dispatch, commit}, data){
    commit('setMenuKeyword', data)
  },
  async getMyPolicy({rootGetters}){
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    const response = await this.$axios
      .$get("/api/v1/policy/get-my-policy")
      .then((response) => {
        if (response.success) {
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });

    return response;
  },
}
