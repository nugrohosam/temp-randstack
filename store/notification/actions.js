export default {
  async get({ dispatch, commit, rootGetters }) {
    // axios

    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    return await this.$axios
      .$get(`/api/v1/notifications?page=1&per_page=10`)
      .then((response) => {
        commit('setItems' , response.data.items);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
};
