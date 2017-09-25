// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Axios from 'axios';
import { sync } from 'vuex-router-sync';
import store from './store/store';

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

sync(store, router);

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
});

export {app, router, store};
