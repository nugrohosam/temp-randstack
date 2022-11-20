import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import PolicyLoanModules from "./policy_loan";
import PolicyRecoveryModules from "./policy_recovery";
import CutiPremiModules from "./cuti_premi";
import RiderProduct from "./rider_product";
import DecreaseSA from "./decrease_sa";
import IncreaseSA from "./increase_sa";
import BenefitAllocation from "./benefit_allocation";
import ChangePayeeRefundAccount from "./change_payee_refund_account";
import PeriodicalyTopUp from "./periodicaly_top_up";
import ReuploadDocument from "./reupload_document";
import WithdrawPartialInvestmentFund from "./withdraw_partial_investment_fund";
import AddInvestmentFund from "./add_investment_fund";

const SubmissionTransactionModules = {
  namespaced: true,
  modules: {
    policy_loan: PolicyLoanModules,
    policy_recovery: PolicyRecoveryModules,
    cuti_premi: CutiPremiModules,
    withdraw_partial_investment_fund: WithdrawPartialInvestmentFund,
    add_investment_fund: AddInvestmentFund,
    rider_product: RiderProduct,
    reupload_document: ReuploadDocument,
    periodicaly_top_up: PeriodicalyTopUp,
    decrease_sa: DecreaseSA,
    increase_sa: IncreaseSA,
    benefit_allocation: BenefitAllocation,
    change_payee_refund_account: ChangePayeeRefundAccount,
  },
  state,
  getters,
  actions,
  mutations,
};
export default SubmissionTransactionModules;
