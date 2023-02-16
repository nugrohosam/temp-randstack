const state = () => ({
    changeCustomerPayer: {
        firstName: '',
        lastName: '',
        identityType: '',
        identityNumber: '',
        birthdate: '',
        birthplace: '',
        phone: '',
        email: '',
        gender: '',
        martialStatus: '',
        addressChanges: [],
        ktpAttachment: {},
        payerKtpAttachment: {},
        payerSelfieKtpAttachment: {},
    }
});

const getters = {
    getChangeCustomerPayer: (state) => state.changeCustomerPayer,
};

const mutations = {
    setChangeCustomerPayer(state, data) {
        state.changeCustomerPayer = data;
    },
};

const actions = {
    async changeCustomerPayer({ state, rootGetters, dispatch }) {
        console.log('ascasc')
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
