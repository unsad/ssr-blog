/**
 * Created by unsad on 2017/9/20.
 */
import Vue from 'vue';
import { createApp } from './main';
import './assets/js/base';
import clientGoogleAnalyse from './utils/clientGoogleAnalyse';
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next);
    } else {
      next();
    }
  }
});
const {app, router, store} = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c));
    });
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
    let loadingPromise = store.dispatch('START_LOADING');
    let endLoadingCallback = (path) => {
      return loadingPromise.then(interval => {
        clearInterval(interval);
        store.dispatch('SET_PROGRESS', 100);
        next(path);
      });
    };

    if (!asyncDataHooks.length) return endLoadingCallback('');


    Promise.all(asyncDataHooks.map(hook => hook({store, route: to}))).then(() => {
      endLoadingCallback();
    }).catch(err => {
      console.error(Date.now().toLocaleString(), err);
    });
  });

  if (window.__INITIAL_STATE__.siteInfo) {
    let analyzeCode = window.__INITIAL_STATE__.siteInfo.analyzeCode;
    if (analyzeCode && analyzeCode.value !== '') {
      router.afterEach(route => {
        clientGoogleAnalyse(route.path);
      });
    }
  }
  app.$mount('#app');
});


