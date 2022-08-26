import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';

Object.keys(rules).forEach(rule => {
  let message = messages[rule]
  if (rule === 'email') {
    message = 'Format email tidak sesuai.'
  }

  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: message // assign message
  });
});

extend('phone', {
  message: 'Nomor harus diawali 62.',
  validate: value => (new RegExp(/62[0-9]+$/g)).test(value)
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);