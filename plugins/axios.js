export default function ({ store, $axios }) {
  $axios.setToken(store.getters['auth/getAuthAccessToken'], 'Bearer');
  $axios.onError((error) => {
    // console.log(error.response);
    let message = "Terjadi kesalahan, coba lagi.";
    if(typeof error.response.data.message != "undefined"){
      message = error.response.data.message;
    }else if(typeof error.response.data.Message != "undefined"){
      message = error.response.data.Message;
    }else{
      message = "Terjadi kesalahan, coba lagi.";
    }

    store.dispatch("showResponseAlert", {
      message: message,
      type: "error",
      status_code: error.response.status
    });
    // window.$nuxt.$store.getters.myVar => can use this for another js without closure
    return Promise.reject(error.response);
  });
}
