// Import Vue
import Vue from 'vue'

// Import Vuex
import Vuex from 'vuex'

// Import Auth Modules
import AuthModules from './auth'

Vue.use(Vuex)
export default () => new Vuex.Store({
  modules: {
      // auth: AuthModules
  }
})

