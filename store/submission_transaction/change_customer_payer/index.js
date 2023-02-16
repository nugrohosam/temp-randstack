const state = () => ({
    changeCustomerPayer: {
        addresses: [],
        firstName: "",
        lastName: "",
        certiType: "",
        certiCode: "",
        birthDate: "",
        birthPlace: "",
        phoneNumber: "",
        email: "",
        marrigeStatus: "",
        gender: "",
        ktpSelfieAttachment: {},
        ktpAttachment: {},
        documentAttachment: {},
    },
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
        const form = {
            addresses: state.getChangeCustomerPayer.addresses,
            first_name: state.getChangeCustomerPayer.firstName,
            last_name: state.getChangeCustomerPayer.lastName,
            certi_type: state.getChangeCustomerPayer.certiType,
            certi_code: state.getChangeCustomerPayer.certiCode,
            birth_date: state.getChangeCustomerPayer.birthDate,
            birth_place: state.getChangeCustomerPayer.birthPlace,
            phone_number: state.getChangeCustomerPayer.phoneNumber,
            email: state.getChangeCustomerPayer.email,
            marrige_status: state.getChangeCustomerPayer.marrigeStatus,
            gender: state.getChangeCustomerPayer.gender,
            ktp_selfie_attachment: state.getChangeCustomerPayer.ktpSelfieAttachment.name,
            ktp_attachment: state.getChangeCustomerPayer.ktpAttachment.name,
            document_attachment: state.getChangeCustomerPayer.documentAttachment.name,
        };

        dispatch(
            "toggleOverlayLoading",
            { show: true, message: "Mohon Tunggu..." },
            { root: true }
        );
        this.$axios.setToken(rootGetters["auth/getAuthAccessToken"], "Bearer");
        return await this.$axios
            .$post("/api/v1/transaction-proposal/change-policy-holder", form)
            .then((response) => {
                dispatch(
                    "toggleOverlayLoading",
                    { show: false, message: "Mohon Tunggu..." },
                    { root: true }
                );
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
