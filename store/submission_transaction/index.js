import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import PolicyLoanModules from './policy_loan'

const SubmissionTransactionModules = {
    namespaced: true,
    modules: {
        policy_loan: PolicyLoanModules
    },
    state,
    getters,
    actions,
    mutations
}
export default SubmissionTransactionModules
