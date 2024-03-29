export default {
  async signIn({ dispatch, commit }, data) {
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post("/api/v1/auth/login", {
        policy_number: data.policy_number,
        phone_number: data.phone_number,
        identity_number: data.identity_number,
      })
      .then((response) => {
        dispatch("toggleOverlayLoading", { show: false }, { root: true });
        if (response.success) {
          commit("setUser", response.data);
        }
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  async check({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      if (sessionStorage.auth) {
        const auth = JSON.parse(sessionStorage.auth);
        commit("setUser", auth);
        commit("setAuth");
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },

  async sendMail({ getters }) {
    this.$axios.setToken(getters.getAuthAccessToken, "Bearer");
    return await this.$axios
      .$get("/test/v1/email/login-attempt?email=blabla@rojak.com")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  async signOut({ getters, dispatch }) {
    this.$axios.setToken(getters.getAuthAccessToken, "Bearer");
    return await this.$axios
      .$post("/api/v1/auth/logout")
      .then((response) => {
        if (response.success) {
          dispatch("clearAuth");
          window.location.href = "/auth/login";
        }
        return res;
      })
      .catch((error) => {
        return error;
      });
  },

  async clearAuth({ commit }) {
    if (sessionStorage.getItem("auth") === null) {
      return;
    }
    sessionStorage.removeItem("auth");
    commit("clearAuth");
    window.location.href = "/auth/login";
  },

  async otpSubmit({ dispatch, getters, commit }, data) {
    // dispatch('sendMail')
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    this.$axios.setToken(getters.getAuthAccessToken, "Bearer");
    return await this.$axios
      .$post("/api/v1/auth/otp/check", data)
      .then((response) => {
        dispatch("toggleOverlayLoading", { show: false }, { root: true });
        if (response.success) {
          commit("setAuth");
          sessionStorage.auth = JSON.stringify(getters.getAuthUser);
        }
        return response;
      })
      .catch((error) => {
        return error;
      });

    // force Auth
    // commit("setAuth");
    // localStorage.auth = JSON.stringify(getters.getAuthUser);
  },

  async otpResend({ getters, commit, dispatch }) {
    const user = getters.getAuthUser;
    this.$axios.setToken(getters.getAuthAccessToken, "Bearer");
    let endpoint = "/api/v1/auth/login";
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post(endpoint, {
        policy_number: user.policyNumber,
        phone_number: user.phoneNumber,
        identity_number: user.identityNumber,
      })
      .then((response) => {
        dispatch("toggleOverlayLoading", { show: false }, { root: true });
        return response;
      })
      .catch((error) => {
        return error;
      });

    // force Auth
    // commit("setAuth");
  },

  async otpReset({ getters, commit, dispatch }) {
    const user = getters.getAuthUser;
    this.$axios.setToken(getters.getAuthAccessToken, "Bearer");
    let endpoint = "/api/v1/auth/otp/reset";
    dispatch(
      "toggleOverlayLoading",
      { show: true, message: "Mohon Tunggu..." },
      { root: true }
    );
    return await this.$axios
      .$post(endpoint, {
        identity: user.phoneNumber,
      })
      .then((response) => {
        dispatch("toggleOverlayLoading", { show: false }, { root: true });
        return response;
      })
      .catch((error) => {
        return error;
      });

    // force Auth
    // commit("setAuth");
  },
};
