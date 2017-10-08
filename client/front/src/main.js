// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store/store';
import { createRouter } from './router';
import { sync } from 'vuex-router-sync';
import './assets/res/js/base'

Vue.config.productionTip = false;

/* eslint-disable no-new */

export function createApp() {
  const store = createStore();
  const router = createRouter();
  sync(store, router);
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return { app, router, store };
}

