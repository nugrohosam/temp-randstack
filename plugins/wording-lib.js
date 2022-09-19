// import axios from 'axios';
export default function ({ app, store, $axios }, inject) {
  let libHEPS = {
    "Premi Dasar" :	"Kontribusi Sekaligus",
    "Biaya Alokasi Investasi" :	"Ujrah Kontribusi Sekaligus",
    "Alokasi Investasi Premi Dasar" :	"Alokasi Investasi Kontribusi Sekaligus",
    "Alokasi investasi Premi Top Up Sekaligus" : "Kontribusi Top Up Awal Sekaligus",
    "Premi Top Up Sekaligus" :	"Kontribusi Top Up Tambahan",
    "Biaya Alokasi investasi top up sekaligus" :	"Ujrah Kontribusi Top Up Tambahan",
    "Alokasi Investasi top up sekaligus" :	"Alokasi Investasi Top Up Tamabahan",
    "Settlement Interest" :	"Bagi Hasil Investasi",

  }

  let libWGCR_BLC = {
    "Premi Dasar" :	"Kontribusi Dasar Berkala",
    "Biaya Alokasi investasi" :	"Ujrah Kontribusi Dasar Berkala",
    "Alokasi Investasi Premi" : "Dasar	Alokasi Investasi Kontribusi Dasar Berkala",
    "Premi Top Up Berkala" :	"Kontribusi Top Up Berkala",
    "Biaya Alokasi investasi Top Up Berkala" :	"Ujrah Kontribusi Top Up Berkala",
    "Alokasi investasi Top Up Berkala" :	"Alokasi Kontribusi Top Up Berkala",
    "Premi Top Up Sekaligus" :	"Kontribusi Top Up Tambahan",
    "Biaya Alokasi investasi top up sekaligus" :	"Ujrah Kontribusi Top Up Tambahan",
    "Alokasi Investasi top up sekaligus" :	"Alokasi Investasi Kontribusi Top Up Tambahan",
    "Settlement Interest" :	"Bagi Hasil Investasi"

  }

  let libWGCS = {
    "Premi Dasar" :	"Kontribusi Sekaligus",
    "Biaya Alokasi Investasi" :	"Ujrah Kontribusi Sekaligus",
    "Alokasi Investasi Premi Dasar" :	"Alokasi Investasi Kontribusi Sekaligus",
   " Premi Top Up Sekaligus" :	"Kontribusi Top Up Tambahan",
    "Biaya Alokasi investasi top up sekaligus" :	"Ujrah Kontribusi Top Up Tambahan",
    "Alokasi Investasi top up sekaligus" :	"Alokasi Investasi Top Up Tamabahan",
    "Settlement Interest" :	"Bagi Hasil Investasi",

  }

  let libULReguler = {
    "Premi Dasar" :	"Kontribusi Dasar Berkala",
    "Biaya Alokasi investasi" :	"Ujrah Kontribusi Dasar Berkala",
    "Alokasi Investasi Premi Dasar" :	"Alokasi Investasi Kontribusi Dasar Berkala",
    "Premi Top Up Berkala" :	"Kontribusi Top Up Berkala",
    "Biaya Alokasi investasi Top Up Berkala" :	"Ujrah Kontribusi Top Up Berkala",
    "Alokasi investasi Top Up Berkala" :	"Alokasi Kontribusi Top Up Berkala",
    "Premi Top Up Sekaligus" :	"Kontribusi Top Up Tambahan",
    "Biaya Alokasi investasi top up sekaligus" :	"Ujrah Kontribusi Top Up Tambahan",
    "Alokasi Investasi top up sekaligus" :	"Alokasi Investasi Top Up Tamabahan",
    "Settlement Interest" :	"Bagi Hasil Investasi"

  }

  let libULSingle = {
    "Premi Dasar" :	"Kontribusi Sekaligus",
    "Biaya Alokasi Investasi" :	"Ujrah Kontribusi Sekaligus",
    "Alokasi Investasi Premi Dasar" :	"Alokasi Investasi Kontribusi Sekaligus",
    "Premi Top Up Sekaligus" :	"Kontribusi Top Up Tambahan",
    "Biaya Alokasi investasi top up sekaligus" :	"Ujrah Kontribusi Top Up Tambahan",
    "Alokasi Investasi top up sekaligus" :	"Alokasi Investasi Top Up Tamabahan",
    "Settlement Interest" :	"Bagi Hasil Investasi"
  }

  let libAllProduct = {
    "Laporan Semester Transaksi Link" :	"Laporan Pengembangan Dana Investasi",
    "Laporan Transaksi Semesteran" :	"Laporan Pengembangan Dana Investasi",
    "Nama Tertanggung" :	"Nama Peserta Yang Diasuransikan",
    "Uang Pertanggungan" :	"Santunan Asuransi"
  }

  const wording = (word) => {
    let mypolicy = store.getters['submission_transaction/getMyPolicy']
    if(mypolicy.policyWithCode.isSyariah){
      let productType = mypolicy.policyWithCode.productPriorityCode
      switch (productType) {
        case "HEPS":
          word = libHEPS[word]
          break;
        case "WGCR":
        case "BLC":
          word = libWGCR_BLC[word]
          break;
        case "WGCS":
          word = libWGCS[word]
          break;
        case "UL Reguler":
          word = libULReguler[word]
          break;
        case "UL Single":
          word = libULSingle[word]
          break;
        default:
          break;
      }
    }
    return word;
  }

  const syariGeneralLabel = (str) => {
    let label = {
      "Premi" : "Kontribusi",
      "Tertanggung" : "Peserta Yang Diasuransikan",
      "Uang Pertanggungan" : "Santunan Asuransi"
    }

    if(typeof label[str]  !== 'undefined'){
      return label[str];
    }else{
      return str;
    }
  }

  const checkSyariLabel = (str) => {
    let mypolicy = store.getters['submission_transaction/getMyPolicy']
    
    if(mypolicy.policyWithCode.isSyariah){
      let productType = mypolicy.policyWithCode.productPriorityCode
      let rules ;
      switch (productType) {
        case "HEPS":
          let newlibHEPS = Object.fromEntries(
            Object.entries(libHEPS).map(([k, v]) => [k.toLowerCase(), v])
          );
          rules = Object.keys(newlibHEPS).join("|");
          str = str.toLowerCase().replace((new RegExp("\\b(?:"+rules+")\\b", "ig")), matched => newlibHEPS[matched]).replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
          });
          break;
        case "WGCR":
        case "BLC":
          let newlibWGCR_BLC = Object.fromEntries(
            Object.entries(libWGCR_BLC).map(([k, v]) => [k.toLowerCase(), v])
          );
          rules = Object.keys(newlibWGCR_BLC).join("|");
          str = str.toLowerCase().replace((new RegExp("\\b(?:"+rules+")\\b", "ig")), matched => newlibWGCR_BLC[matched]).replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
          });
          break;
        case "WGCS":
          let newlibWGCS = Object.fromEntries(
            Object.entries(libWGCS).map(([k, v]) => [k.toLowerCase(), v])
          );
          rules = Object.keys(newlibWGCS).join("|");
          str = str.toLowerCase().replace((new RegExp("\\b(?:"+rules+")\\b", "ig")), matched => newlibWGCS[matched]).replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
          });
          break;
        case "UL Reguler":
          let newlibULReguler = Object.fromEntries(
            Object.entries(libULReguler).map(([k, v]) => [k.toLowerCase(), v])
          );
          rules = Object.keys(newlibULReguler).join("|");
          str = str.toLowerCase().replace((new RegExp("\\b(?:"+rules+")\\b", "ig")), matched => newlibULReguler[matched]).replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
          });
          break;
        case "UL Single":
          let newlibULSingle = Object.fromEntries(
            Object.entries(libULSingle).map(([k, v]) => [k.toLowerCase(), v])
          );
          rules = Object.keys(newlibULSingle).join("|");
          str = str.toLowerCase().replace((new RegExp("\\b(?:"+rules+")\\b", "ig")), matched => newlibULSingle[matched]).replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
          });
          break;
        default:
          let newlibAllProduct = Object.fromEntries(
            Object.entries(libAllProduct).map(([k, v]) => [k.toLowerCase(), v])
          );
          rules = Object.keys(newlibAllProduct).join("|");
          str = str.toLowerCase().replace((new RegExp("\\b(?:"+rules+")\\b", "ig")), matched => newlibAllProduct[matched]).replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
          });
          break;
      }
    }

    return str;
  }

  inject("wording", wording);
  inject("checkSyariLabel", checkSyariLabel);
  inject("syariGeneralLabel", syariGeneralLabel);
}
