// import axios from 'axios';
export default function ({ app, store, $axios }, inject) {
  const isNull = (text) => {
    return text === null ? "" : text;
  };

  const isNullWithSpace = (text) => {
    if (text === null) {
      return "";
    } else {
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

  const labelRelationType = (code) => {
    let types = new Array();
    types[1] = "Suami"
    types[2] = "Istri"
    types[3] = "Ayah"
    types[4] = "Ibu"
    types[5] = "Anak"
    types[6] = "Adik"
    types[7] = "Kakak"
    types[8] = "Paman"
    types[9] = "Bibi"
    types[10] = "Keponakan"
    types[11] = "Kakek"
    types[12] = "Nenek"
    types[13] = "Cucu"
    types[14] = "Anak angkat"
    types[15] = "Other"
    types[16] = "Anak tiri"
    types[17] = "Yayasan"
    types[18] = "Perusahaan"
    types[20] = "Anak angkat"
    types[21] = "Anak tiri"
    types[50] = "Calon Pemegang Polis"
    types[51] = "Calon Tertanggung"
    types[52] = "Lainnya (Wajib Mengisi Form Beneficiary Owner)"
    types[19] = "Instansi"
    types[22] = "Ayah angkat"
    types[23] = "Ayah tiri"
    types[24] = "Ibu angkat"
    types[25] = "Ibu tiri"
    types[26] = "Yayasan"
    types[27] = "Perusahaan"


    return types[code];
  }

  const labelIdentityType = (code) => {
    let types = new Array();
    types[1] = "E-KTP"
    types[2] = "ID WNA"
    types[3] = "Akta Lahir"
    types[4] = "SKL"
    types[5] = "KIM/KITAS"
    types[6] = "SIM"
    types[7] = "Passport"
    types[8] = "KIA"
    types[9] = "Lainnya"


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
      return "Terjadi kesalahan."
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

  const findProvince = async (id) => {
    const response = await $axios
      .$get(`/api/v1/address/provinces/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }

  const findCity = async (id) => {
    const response = await $axios
      .$get(`/api/v1/address/cities/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }

  const findDistrict = async (id) => {
    const response = await $axios
      .$get(`/api/v1/address/districts/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }

  const findVillage = async (id) => {
    const response = await $axios
      .$get(`/api/v1/address/villages/${id}`)
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
  inject("labelIdentityType", labelIdentityType);
  inject("labelCardType", labelCardType);
  inject("labelRelationType", labelRelationType);
  inject("convertCurrency", convertCurrency);
  inject("getBank", getBank);
  inject("getBankName", getBankName);
  inject("getProvinces", getProvinces);
  inject("getCities", getCities);
  inject("getDistricts", getDistricts);
  inject("getVillages", getVillages);
  inject("findProvince", findProvince);
  inject("findCity", findCity);
  inject("findDistrict", findDistrict);
  inject("findVillage", findVillage);
}
