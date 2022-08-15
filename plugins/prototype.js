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

  const labelPaymentMethod = (code) => {
    let methods = new Array();
    methods[3] = "Saving Account/Internet Banking"
    methods[22] = "Lock Box"
    methods[30] = "Credit Card"
    methods[93] = "Virtual Account"
    methods[94] = "Bank Transfer"

    return methods[code];
  }

  const labelCardType = (code) => {
    let types = new Array();
    types[0] = "Both"
    types[1] = "Debit"
    types[2] = "Credit"

    return types[code];
  }

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
  inject("labelPaymentMethod", labelPaymentMethod);
  inject("labelCardType", labelCardType);
  inject("convertCurrency", convertCurrency);
  inject("getBank", getBank);
  inject("getBankName", getBankName);
  inject("getProvinces", getProvinces);
  inject("getCities", getCities);
  inject("getDistricts", getDistricts);
  inject("getVillages", getVillages);
}
