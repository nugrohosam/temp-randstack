import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import PaymentPolicyLoanModules from './payment_policy_loan'

const SubmissionTransactionModules = {
    namespaced: true,
    modules: {
        payment_policy_loan: PaymentPolicyLoanModules
    },
    state,
    getters,
    actions,
    mutations
}
export default SubmissionTransactionModules
