// Import Vue
import Vue from 'vue'

// Import Vuex
import Vuex from 'vuex'

// Import Auth Modules
import AuthModules from './auth'

// Import Submission Transaction Modules
import SubmissionTransactionModules from './submission_transaction'

Vue.use(Vuex)
export default () => new Vuex.Store({
  modules: {
      // auth: AuthModules
      submission_transaction: SubmissionTransactionModules
  }
})

