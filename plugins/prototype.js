// import axios from 'axios';
export default function ({ app, store, $axios }, inject) {
  const isNull = (text) => {
    return text === null ? "" : text;
  };
  const convertCurrency = (amount, currency = "rupiah") => {
    if (currency == "rupiah") {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
    }
  };

  const getBank = async (bankCode) => {
    // $axios.setToken(store.getters['auth/getAuthAccessToken'], 'Bearer');
    const response = await $axios
      .$get(`/api/v1/banks/${bankCode}`)
      .then((response) => {
        // if (response.success) {
        //   return response.data;
        // }
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  };

  const getBankName = async (bankCode) => {
    try {
      let bank = await getBank(bankCode);
      if (bank.success) {
        return bank.data.name;
      } else {
        return bank.message;
      }
    } catch (error) {
      return  "Terjadi kesalahan."
    }
  };

  inject("isNull", isNull);
  inject("convertCurrency", convertCurrency);
  inject("getBank", getBank);
  inject("getBankName", getBankName);
}
