export default {
  async signIn({ dispatch, commit }, data) {
    const response = await this.$axios
      .$post("/api/v1/auth/login", {
        policy_number: data.policy_number,
        phone_number: data.phone_number,
        identity_number: data.identity_number,
      })
      .then((response) => {
        if (response.success) {
          commit("setUser", response.data);
        }
        return res;
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  async check({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      if (localStorage.auth) {
        const auth = JSON.parse(localStorage.auth);
        commit("setUser", auth);
        commit("setAuth");
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },

  async sendMail(){
    const response = await this.$axios
      .$get("/test/v1/email/login-attempt?email=blabla@rojak.com")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  },
  async signOut({commit}) {
    const response = await this.$axios
      .$post("/api/v1/auth/logout")
      .then((response) => {
        if(response.success){
          localStorage.removeItem('auth');
          commit('clearAuth');
          window.location.href = "/auth/login";
        }
        return res;
      })
      .catch((error) => {
        return error;
      });
  },

  async otpSubmit({ dispatch, getters, commit }, data) {
    dispatch('sendMail')
    const response = await this.$axios
      .$post("/api/v1/auth/otp/check", data)
      .then((response) => {
        if (response.success) {
          commit("setAuth");
          localStorage.auth = JSON.stringify(getters.getAuthUser);
        }
        return response;
      })
      .catch((error) => {
        return error;
      });

    // force Auth
    // commit("setAuth");
    return response;
  },

  async otpResend({ commit }, data) {
    let endpoint = "/api/v1/auth/otp/reset";

    const response = await this.$axios
      .$post(endpoint, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });

    // force Auth
    // commit("setAuth");
    return response;
  },
};
