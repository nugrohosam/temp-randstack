export default function ({ app}, inject) {
  const isNull = (text) => {
    return text === null ? "" : text
  }
  const convertCurrency = (amount, currency = "rupiah") => {
    if(currency == "rupiah"){
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
    }
  }
  inject('isNull', isNull)
  inject('convertCurrency', convertCurrency)
}
