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
import TransferOfFund from "./transfer_of_fund";
import Apportionment from "./apportionment";
import ChangePaymentFreq from "./change_payment_freq";
import ChangePaymentMethod from "./change_payment_method";
import ChangeOccupation from "./change_occupation";
import ChangeBirthDateAndGender from "./change_birth_date_and_gender";
import ChangeTerm from "./change_term";
import ChangePayer from "./change_payer";
import ChangeBeneficiary from "./change_beneficiary";
import ChangePolicyHolder from "./change_policy_holder";
import ChangeCustomerPayer from "./change_customer_payer";
import ChangeInsured from './change_insured'

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
    transfer_of_fund: TransferOfFund,
    apportionment: Apportionment,
    change_term: ChangeTerm,
    change_occupation: ChangeOccupation,
    change_payment_freq: ChangePaymentFreq,
    change_payer: ChangePayer,
    change_payment_method: ChangePaymentMethod,
    change_birth_date_and_gender: ChangeBirthDateAndGender,
    change_beneficiary: ChangeBeneficiary,
    change_policy_holder: ChangePolicyHolder,
    change_customer_payer: ChangeCustomerPayer,
    change_insured: ChangeInsured
  },
  state,
  getters,
  actions,
  mutations,
};
export default SubmissionTransactionModules;
