export default {
  // searchData({dispatch, commit}, data){
  //   commit('setMenuKeyword', data)
  // }
  saveTableData({ dispatch, commit }, data) {
    commit("setTableData", data);
  },

  async getTransactionStatusList({ dispatch, commit, rootGetters }) {
    // axios
    this.$axios.setToken(rootGetters['auth/getAuthAccessToken'], 'Bearer');
    const response = await this.$axios
      .$get(`/api/v1/transaction-proposal?order=desc&order_by=transaction_name`)
      .then((response) => {
        if (response.success) {
          return response.data;
        }
        // return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
    // const result = [
    //   {
    //     submission_id: 12,
    //     date: "30/12/1996",
    //     name: "Azhar Ogi",
    //     status: "Pending",
    //     document: "Dokumen.doc"
    //   },
    //   {
    //     submission_id: 11,
    //     date: "30/12/1996",
    //     name: "Azhar GGWP",
    //     status: "Success",
    //     document: "Dokumen.doc"
    //   },
    //   {
    //     submission_id: 10,
    //     date: "30/12/1996",
    //     name: "Azhar GGWP",
    //     status: "Success",
    //     document: "Dokumen.doc"
    //   },
    //   {
    //     submission_id: 9,
    //     date: "30/12/1996",
    //     name: "Azhar GGWP",
    //     status: "Success",
    //     document: "Dokumen.doc"
    //   },
    //   {
    //     submission_id: 8,
    //     date: "30/12/1996",
    //     name: "Azhar GGWP",
    //     status: "Success",
    //     document: "Dokumen.doc"
    //   },
    //   {
    //     submission_id: 7,
    //     date: "30/12/1996",
    //     name: "Azhar GGWP",
    //     status: "Success",
    //     document: "Dokumen.doc"
    //   },
    //   {
    //     submission_id: 6,
    //     date: "30/12/1996",
    //     name: "Azhar GGWP",
    //     status: "Success",
    //     document: "Dokumen.doc"
    //   },
    //   {
    //     submission_id: 5,
    //     date: "30/12/1996",
    //     name: "Azhar GGWP",
    //     status: "Success",
    //     document: "Dokumen.doc"
    //   },
    // ];

    commit('setTransactionStatusList',result);
    return result;
  },

  async getTransactionStatusDetail({dispatch, commit}, data){
    dispatch('toggleOverlayLoading',{show: true},{root: true});
    const id = data.id;
    let messages = new Array();
    messages['failed'] = "Nasabah yang terhormat, Pembayaran manfaat anda gagal. Berikut informasi nomor rekening manfaat anda:"
    messages['succeed'] = "Nasabah yang terhormat, Pembayaran manfaat anda berhasil. Berikut informasi nomor rekening manfaat anda:",
    messages['rejected'] = "Nasabah yang terhormat, Pengajuan transaksi anda belun dapat kami proses, Silahkan anda mengajukan kembali dengan melampirkan dokumen yang dibutuhkan. Berikut informasi nomor rekening manfaat anda:"

    // request axios
    let result = {
      message: "",
      account_number: "123123",
      holder_name: "Azhar Ogi",
      bank: "BNI",
      status: "failed"
    }
    result.message = messages[result.status];

    // Just Visualization
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch('toggleOverlayLoading',{show: false},{root: true});
        resolve(result);
      },2000);
    });
  }
};
