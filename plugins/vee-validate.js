import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, max } from 'vee-validate/dist/rules';

// 必要なルールのみインポート
extend('contentRequired', {
  ...required,
  message: 'CONTENT is Required'
});
extend('contentMax', {
  ...max,
  message: 'Max 300 characters'
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
