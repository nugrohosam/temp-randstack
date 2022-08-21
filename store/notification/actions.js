export default {
  async get({ dispatch, commit, rootGetters }) {
    // axios

    this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
    const response = await this.$axios
      .$get(`/api/v1/notifications?page=1&per_page=10`)
      .then((response) => {
        console.log(response);
        commit('setItems' , response.data.items);
        return response;
      })
      .catch((error) => {
        return error;
      });

    return response;

    // const notification = [
    //   {
    //     id: 1,
    //     opened: 1,
    //     title: 'Cuti Premi',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 2,
    //     opened: 1,
    //     title: 'Cuti Premi 2',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 1,
    //     opened: 0,
    //     title: 'Cuti Premi 3',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 1,
    //     opened: 0,
    //     title: 'Cuti Premi 4',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 1,
    //     opened: 1,
    //     title: 'Cuti Premi 5',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 1,
    //     opened: 1,
    //     title: 'Cuti Premi 5',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 1,
    //     opened: 1,
    //     title: 'Cuti Premi 5',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 1,
    //     opened: 1,
    //     title: 'Cuti Premi 5',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 1,
    //     opened: 1,
    //     title: 'Cuti Premi 5',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 1,
    //     opened: 1,
    //     title: 'Cuti Premi 5',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 1,
    //     opened: 1,
    //     title: 'Cuti Premi 5',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    //   {
    //     id: 1,
    //     opened: 1,
    //     title: 'Cuti Premi 5',
    //     content: 'Pengajuan Berhasil',
    //     date: '30 Juli 2022'
    //   },
    // ]
    // setTimeout(() => {
    //   commit('setItems' , notification);
    // }, 3000)

  },
};
