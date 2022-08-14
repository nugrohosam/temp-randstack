// import axios from 'axios';
export default function ({ app, store, $axios }, inject) {
  const isNull = (text) => {
    return text === null ? "" : text;
  };

  const isNullWithSpace = (text) => {
    if(text === null){
      return "";
    }else{
      return text + " ";
    }
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

  const getProvinces = async (page = "", search = "") => {
    const response = await $axios
    .$get(`/api/v1/address/provinces?page=${page}&search=${search}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
  }

  const getCities = async (page = "", province_id = "", search = "") => {
    const response = await $axios
    .$get(`/api/v1/address/cities?page=${page}&search=${search}&province_id=${province_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
    return response;
  }

  const getDistricts = async (page = "", city_id = "", search = "") => {
    const response = await $axios
    .$get(`/api/v1/address/districts?page=${page}&search=${search}&city_id=${city_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
    return response;
  }

  const getVillages = async (page = "", district_id = "", search = "") => {
    const response = await $axios
    .$get(`/api/v1/address/villages?page=${page}&search=${search}&district_id=${district_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
    return response;
  }

  inject("isNull", isNull);
  inject("isNullWithSpace", isNullWithSpace);
  inject("convertCurrency", convertCurrency);
  inject("getBank", getBank);
  inject("getBankName", getBankName);
  inject("getProvinces", getProvinces);
  inject("getCities", getCities);
  inject("getDistricts", getDistricts);
  inject("getVillages", getVillages);
}
