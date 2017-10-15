// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './store/api'

import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'

const { axios } = api;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (config.method === 'get' && config.url.indexOf('/proxyPrefix/api/user') === -1) return config;
  if (token !== null && token !== 'undefined') {
    config.headers['authorization'] = token;
  }
  return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => {
  if (response.data && response.data.status && response.data.status === 'fail') {
    console.log(response.data.description);
  }
  return response;
}, error => Promise.reject(error));


Vue.use(Element);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
