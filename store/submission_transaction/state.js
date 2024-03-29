export default {
  menus_search: "",
  myPolicy: null,
  riders: null,
  myPolicyLoanInfo: null,
  menus: [
    {
      active: true,
      hidden: false,
      name: "Perubahan Data",
      link: "/transaction/submission/data-change",
      icon: "menu/perubahan-data.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Penutupan / Pembatalan Produk",
      link: "/transaction/submission/cancellation-main-product",
      icon: "menu/pembatalan-produk.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Cuti Premi",
      link: "/transaction/submission/cuti-premi",
      icon: "menu/cuti-premi.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Pemulihan Polis",
      link: "/transaction/submission/policy-recovery",
      icon: "menu/pemulihan-polis.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Pinjaman Polis",
      link: "/transaction/submission/policy-loan",
      icon: "menu/pinjaman-polis.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Penarikan Sebagian Dana Investasi",
      link: "/transaction/submission/withdraw-partial-investment-fund",
      icon: "menu/penarikan-sebagian-investasi.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Pengajuan gagal transfer / SB / MB / NCB",
      link: "/transaction/submission/benefit-allocation",
      icon: "menu/pengajuan-gagal-transfer.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Penambahan Produk Rider",
      link: "/transaction/submission/add-rider-product",
      icon: "menu/penambahan-produk.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Penambahan Dana Investasi (Top Up Sekaligus)",
      link: "/transaction/submission/add-investment-fund",
      icon: "menu/penambahan-dana.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Perubahan Nomor Rekening",
      link: "/transaction/submission/change-payee-refund-account",
      icon: "menu/perubahan-nomor-rek-manfaat.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Penambahan Uang Pertanggungan",
      link: "/transaction/submission/increase-sa",
      icon: "menu/penambahan-uang-petanggungan.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Perubahan Premi Dasar dan Topup Berkala",
      link: "/transaction/submission/periodicaly-top-up",
      icon: "menu/perubahan-premi-dasar.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Pengalihan Dana (Switching)",
      link: "/transaction/submission/transfer-of-funds",
      icon: "menu/perubahan-alokasi-investasi.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Penurunan Uang Pertanggungan",
      link: "/transaction/submission/decrease-sa",
      icon: "menu/penurunan-uang-pertanggungan.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Perubahan Alokasi Dana Investasi",
      link: "/transaction/submission/apportionment",
      icon: "menu/perubahan-alokasi-investasi.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Perubahan Pembayaran Premi",
      link: "/transaction/submission/premi-payment-change",
      icon: "menu/perubahan-pembayaran-premi.svg",
    },
  ],

  cancellation_main_product: {
    coverages_selected: [],
    reason_selected: null,
  },

  industries: [],
  occupations: [],
  banks: [],
  creditCardBanks: [],

  attachments: {
    upload: {
      ktp: {
        file: null,
        name: "",
        preview: "",
        upload_filename: "",
      },
      selfie_ktp: {
        file: null,
        name: "",
        preview: "",
        upload_filename: "",
      },
      saving_book: {
        file: null,
        name: "",
        preview: "",
        upload_filename: "",
      },
      kk: {
        file: null,
        name: "",
        preview: "",
        upload_filename: "",
      },
      ilustration: {
        file: null,
        name: "",
        preview: "",
        upload_filename: "",
      },
      transfer: {
        file: null,
        name: "",
        preview: "",
        upload_filename: "",
      },
      beneficiary_owner: {
        file: null,
        name: "",
        preview: "",
        upload_filename: "",
      },
      bank_authorization: {
        file: null,
        name: "",
        preview: "",
        upload_filename: "",
      },
      document: {
        file: null,
        name: "",
        preview: "",
        upload_filename: "",
      },
      birth_certificate: {
        file: null,
        name: "",
        preview: "",
        upload_filename: "",
      },
    },
  },

  customerInfo: {
    resume: null,
  },
  currentHeaderTitle: {
    title: "",
    sub: "",
  },
};
