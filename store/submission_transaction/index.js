import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import PolicyLoanModules from "./policy_loan";
import PolicyRecoveryModules from "./policy_recovery";

const SubmissionTransactionModules = {
  namespaced: true,
  modules: {
    policy_loan: PolicyLoanModules,
    policy_recovery: PolicyRecoveryModules,
  },
  state,
  getters,
  actions,
  mutations,
};
export default SubmissionTransactionModules;
