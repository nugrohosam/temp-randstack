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

  const currencyName = () => {
    let currencySymbol = new Array();

    currencySymbol["4"] =
      "US$"
    currencySymbol["30"] =
      "Rp"
    currencySymbol["27"] =
      "B$"
    currencySymbol["29"] =
      "¤"
    currencySymbol["1"] =
      "￥"
    currencySymbol["2"] =
      "￡"
    currencySymbol["3"] =
      "HK$"
    currencySymbol["5"] =
      "¤"
    currencySymbol["8"] =
      "S$"
    currencySymbol["12"] =
      "￥"
    currencySymbol["13"] =
      "C$"
    currencySymbol["14"] =
      "A$"
    currencySymbol["16"] =
      "€"
    currencySymbol["18"] =
      "N$"
    currencySymbol["20"] =
      "A$"
    currencySymbol["21"] =
      "?"
    currencySymbol["22"] =
      "¤"
    currencySymbol["23"] =
      "¤"
    currencySymbol["24"] =
      "¤"
    currencySymbol["25"] =
      "¤"
    currencySymbol["26"] =
      "￥"
    currencySymbol["28"] =
      "RM"
    currencySymbol["31"] =
      "Rs."
    currencySymbol["32"] =
      "?"

    return currencySymbol;
  }

  const fundName = (code) => {
    let fundCodeName = new Array();
    fundCodeName["BNLS"] =
      "BLife Link Dana Selaras"
    funCodeName["BNLST"] =
      "BLife Link Dana Stabil";
    fundCodeName["BNLSUS"] =
      "BLife Link Dana Secure USD";
    fundCodeName["HYEND"] =
      "Hy End Pro";
    fundCodeName["BNLDM"] =
      "Dana Mantap";
    fundCodeName["BNLDM2"] =
      "Dana Mantap 2";
    fundCodeName["BNLDM3"] =
      "Dana Mantap 3";
    fundCodeName["BNLDM4"] =
      "Dana Mantap 4";
    fundCodeName["BNLDM5"] =
      "Dana Mantap 5";
    fundCodeName["BNLDM6"] =
      "Dana Mantap 6";
    fundCodeName["BNLDM7"] =
      "Dana Mantap 7";
    fundCodeName["BNLDM8"] =
      "Dana Mantap 8";
    fundCodeName["BNLDM9"] =
      "Dana Mantap 9";
    fundCodeName["BNLDM10"] =
      "Dana Mantap 10";
    fundCodeName["BNLDM11"] =
      "Dana Mantap 11";
    fundCodeName["BNLDM12"] =
      "Dana Mantap 12";
    fundCodeName["BNLDM13"] =
      "Dana Mantap 13";
    fundCodeName["BNLDM14"] =
      "Dana Mantap 14";
    fundCodeName["BNLDM20"] =
      "Dana Mantap 20";
    fundCodeName["BNLDM21"] =
      "Dana Mantap 21";
    fundCodeName["BNLDM22"] =
      "Dana Mantap 22";
    fundCodeName["01"] =
      "Cash Fund";
    fundCodeName["BNLSRT1"] =
      "Dana SRT Fund1";
    fundCodeName["BNLSF"] =
      "Bni Life Syariah  Fixed Income Fund";
    fundCodeName["BNLSM"] =
      "Bni Life Syariah  Balance Fund";
    fundCodeName["BNLSEF"] =
      "Bni Life Syariah Equity  Fund";
    fundCodeName["BNLMP"] =
      "BLife Link Dana Maksima Plus";
    fundCodeName["BNLA"] =
      "BLife Link Dana Aktif";
    fundCodeName["BNLAG"] =
      "Dana Agresif";
    fundCodeName["BNLSP"] =
      "BLife Link Dana Selaras Plus";
    fundCodeName["BNLK"] =
      "BLife Link Dana Kombinasi";
    fundCodeName["BNLSTP"] =
      "BLife Link Dana Stabil Plus";
    fundCodeName["BNLMA"] =
      "Dana Mapan";
    fundCodeName["BNLC"] =
      "BLife Link Dana Cemerlang";
    fundCodeName["BNLDL"] =
      "Dana Likuid";
    fundCodeName["BNLM"] =
      "BLife Link Dana Maksima";
    fundCodeName["BNLSRT2"] =
      "Dana SRT Fund2";
    fundCodeName["BLSEF"] =
      "BLife Syariah Equity  Fund (BLS0000006)";
    fundCodeName["BLSF"] =
      "BLife Syariah  Fixed Income (BLS0000004)";
    fundCodeName["BLSST"] =
      "BLIFE STABIL SYARIAH (BLS0000007)";
    fundCodeName["BNLSK"] =
      "BLife Link Dana Kombinasi Syariah";
    fundCodeName["BNLSST"] =
      "BLIFE SYARIAH STABIL (BLS0000001)";
    fundCodeName["BNLSAG"] =
      "Dana Agresif Syariah";
    fundCodeName["BNLSMF"] =
      "Bni Life Syariah  Managed Fund";
    fundCodeName["BNLSUL01"] =
      "Rekening Variabel";
    fundCodeName["BNLSUL02"] =
      "Rekening Investasi Peserta";
    fundCodeName["BNLSBF"] =
      "Bni Life Syariah  Berimbang (BLS0000002)";
    fundCodeName["BNLSOF"] =
      "Bni Life Syariah  Optimal  (BLS0000003)";
    fundCodeName["BNLSRTUS1"] =
      "BLife Dana SRT USD1";
    fundCodeName["BNLUL01"] =
      "BLife Saving Account Fund 01 IDR";
    fundCodeName["BNLUL02"] =
      "BLife Saving Wadiah Gold Cendekia";
    fundCodeName["BNLSRTUS2"] =
      "BLife Dana SRT USD2";
    fundCodeName["BNLFC"] =
      "BLife Fund Conformable";
    fundCodeName["BNLFS"] =
      "BLife Fund Stable";
    fundCodeName["BNLF"] =
      "BLIFE DANA FLEKSIBLE";
    fundCodeName["BNLL"] =
      "BLIFE DANA LANCAR";
    fundCodeName["BNLB"] =
      "BLIFE DANA BERKEMBANG";
    fundCodeName["BNLBD"] =
      "BLIFE DANA BERBUNGA DUA";
    fundCodeName["BNLUL03"] =
      "BLife Saving Wadiah Cendekia";

    return fundCodeName[code];
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
