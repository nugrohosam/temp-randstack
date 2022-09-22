import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import PolicyLoanModules from "./policy_loan";
import PolicyRecoveryModules from "./policy_recovery";
import CutiPremiModules from "./cuti_premi";
import RiderProduct from "./rider_product";
import WithdrawPartialInvestmentFund from "./withdraw_partial_investment_fund";

const SubmissionTransactionModules = {
  namespaced: true,
  modules: {
    policy_loan: PolicyLoanModules,
    policy_recovery: PolicyRecoveryModules,
    cuti_premi: CutiPremiModules,
    withdraw_partial_investment_fund: WithdrawPartialInvestmentFund,
    rider_product: RiderProduct,
  },
  state,
  getters,
  actions,
  mutations,
};
export default SubmissionTransactionModules;
