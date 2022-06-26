// Import Vue
import Vue from 'vue'

// Import General State
import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

// Import Vuex
import Vuex from 'vuex'

// Import Auth Modules
import AuthModules from './auth'

// Import Submission Transaction Modules
import SubmissionTransactionModules from './submission_transaction'

Vue.use(Vuex)
export default () => new Vuex.Store({
  modules: {
      auth: AuthModules,
      submission_transaction: SubmissionTransactionModules
  },
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
})

