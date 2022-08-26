export default {
  menus_search: '',
  myPolicy: null,
  myPolicyLoanInfo: null,
  menus: [
    {
      active: true,
      name: "Perubahan Data",
      link: "/transaction/submission/data-change",
      icon: "ic_user.svg",
    },
    {
      active: true,
      name: "Penutupan/Pembatalan Produk",
      link: "/transaction/submission/cancellation-main-product",
      icon: "ic_minus_circle.svg",
    },
    {
      active: false,
      name: "Cuti Premi",
      link: "/transaction/submission/cuti-premi",
      icon: "ic_cuti_premi.svg",
    },
    {
      active: false,
      name: "Pemulihan Polis",
      link: "/transaction/submission/policy-recovery",
      icon: "ic_life_buoy.svg",
    },
    {
      active: false,
      name: "Penambahan Dana Investasi",
      link: "/transaction/submission/add-investment-fund",
      icon: "ic_plus_square.svg",
    },
    {
      active: false,
      name: "Penambahan Produk Rider",
      link: "/transaction/submission/add-rider-product",
      icon: "ic_cuti_premi.svg",
    },
    {
      active: false,
      name: "Penambahan Uang Pertanggungan",
      link: "/transaction/submission/add-defered-money",
      icon: "ic_plus_square.svg",
    },
    {
      active: false,
      name: "Penarikan Sebagian Dana Investasi",
      link: "/transaction/submission/widthdrawal-partial-investment-fund",
      icon: "ic_percent.svg",
    },
    {
      active: false,
      name: "Pengajuan gagal transfer /SB/MB NCB",
      link: "/transaction/submission/request-fails-transfer",
      icon: "ic_loader.svg",
    },
    {
      active: false,
      name: "Penurunan Uang Pertanggungan",
      link: "/transaction/submission/deferred-money-reduction",
      icon: "ic_pocket.svg",
    },
    {
      active: false,
      name: "Perubahan Alokasi Dana Investasi",
      link: "/transaction/submission/investment-fund-allocation-change",
      icon: "ic_bar_chart_2.svg",
    },
    {
      active: false,
      name: "Perubahan Nomor Rekening",
      link: "/transaction/submission/change-account-number",
      icon: "ic_edit.svg",
    },
    {
      active: false,
      name: "Perubahan Pembayaran Premi",
      link: "/transaction/submission/premi-payment-change",
      icon: "ic_hexagon.svg",
    },
    {
      active: false,
      name: "Perubahan Premi Dasar dan Topup Berkala",
      link: "/transaction/submission/basic-premi-change-and-topup",
      icon: "ic_edit_3.svg",
    },
    {
      active: false,
      name: "Pinjaman Polis",
      link: "/transaction/submission/policy-loan",
      icon: "ic_package.svg",
    },
  ],
  cancellation_main_product: {
    upload: {
      ktp: {
        file: null,
        name: '',
        preview: '',
        upload_filename: ''
      },
      selfie_ktp: {
        file: null,
        name: '',
        preview: '',
        upload_filename: ''
      }
    },
    coverages_selected: [],
    reason_selected: null,
  },
  customerInfo: {
    // resume: {
    //   holderName: null,
    //   policyNumber: null,
    //   selectedPolicy: null,
    //   emailAddress: null,
    //   address: null,
    //   phonerNumber: null,
    // },
    resume: null
  }
}
