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
      icon: "ic_user.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Penutupan/Pembatalan Produk",
      link: "/transaction/submission/cancellation-main-product",
      icon: "ic_minus_circle.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Cuti Premi",
      link: "/transaction/submission/cuti-premi",
      icon: "ic_cuti_premi.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Pemulihan Polis",
      link: "/transaction/submission/policy-recovery",
      icon: "ic_life_buoy.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Pinjaman Polis",
      link: "/transaction/submission/policy-loan",
      icon: "ic_package.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Penarikan Sebagian Dana Investasi",
      link: "/transaction/submission/withdraw-partial-investment-fund",
      icon: "ic_percent.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Penurunan Uang Pertanggungan",
      link: "/transaction/submission/decrease-sa",
      icon: "ic_pocket.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Pengajuan gagal transfer / SB / MB / NCB",
      link: "/transaction/submission/benefit-allocation",
      icon: "ic_loader.svg",
    },
    {
      active: true,
      hidden: false,
      name: "Perubahan Nomor Rekening",
      link: "/transaction/submission/change-payee-refund-account",
      icon: "ic_edit.svg",
    },
    {
      active: false,
      hidden: false,
      name: "Penambahan Produk Rider",
      link: "/transaction/submission/add-rider-product",
      icon: "ic_cuti_premi.svg",
    },
    {
      active: false,
      hidden: false,
      name: "Penambahan Dana Investasi",
      link: "/transaction/submission/add-investment-fund",
      icon: "ic_plus_square.svg",
    },
    {
      active: false,
      hidden: false,
      name: "Penambahan Uang Pertanggungan",
      link: "/transaction/submission/add-defered-money",
      icon: "ic_plus_square.svg",
    },
    {
      active: false,
      hidden: false,
      name: "Perubahan Alokasi Dana Investasi",
      link: "/transaction/submission/investment-fund-allocation-change",
      icon: "ic_bar_chart_2.svg",
    },
    {
      active: false,
      hidden: false,
      name: "Perubahan Pembayaran Premi",
      link: "/transaction/submission/premi-payment-change",
      icon: "ic_hexagon.svg",
    },
    {
      active: false,
      hidden: false,
      name: "Perubahan Premi Dasar dan Topup Berkala",
      link: "/transaction/submission/basic-premi-change-and-topup",
      icon: "ic_edit_3.svg",
    },
  ],

  cancellation_main_product: {
    coverages_selected: [],
    reason_selected: null,
  },

  banks: [],

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
