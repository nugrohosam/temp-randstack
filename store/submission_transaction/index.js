import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import PolicyLoanModules from "./policy_loan";
import PolicyRecoveryModules from "./policy_recovery";
import WithdrawPartialInvestmentFund from "./withdraw_partial_investment_fund";
import CutiPremiModules from "./cuti_premi";

const SubmissionTransactionModules = {
  namespaced: true,
  modules: {
    policy_loan: PolicyLoanModules,
    policy_recovery: PolicyRecoveryModules,
    cuti_premi: CutiPremiModules,
    withdraw_partial_investment_fund: WithdrawPartialInvestmentFund,
  },
  state,
  getters,
  actions,
  mutations,
};
export default SubmissionTransactionModules;
