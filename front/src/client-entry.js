/**
 * Created by unsad on 2017/9/20.
 */
import Vue from 'vue';
import {createApp} from './main';
import clientGoogleAnalyse from './utils/clientGoogleAnalyse';
import makeResponsive from './assets/js/base';

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const {asyncData} = this.$options;
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
const {app, router, store, isProd, preFetchComponent} = createApp();

router.onReady(() => {
  if (window.__INITIAL_STATE__) {
    makeResponsive();
    window.__INITIAL_STATE__.route.hash = window.location.hash;
    store.replaceState(window.__INITIAL_STATE__);
  }

// service worker
  if (isProd && 'serviceWorker' in navigator && window.location.protocol === 'https:') {
    navigator.serviceWorker.register('/service-worker.js');
  } else {
    clientGoogleAnalyse(store.state.route.path || '/');
  }

  const beforeResolveHook = (to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c));
    });
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);

    if (to.path === from.path && to.hash !== from.hash) {
      return next();
    }

    let loadingPromise = store.dispatch('START_LOADING');
    let endLoadingCallback = (path) => {
      return loadingPromise.then(interval => {
        clearInterval(interval);
        setTimeout(() => {
          store.dispatch('SET_PROGRESS', 100);
          next(path);
        }, 500);
      });
    };

    if (!asyncDataHooks.length) return endLoadingCallback();

    Promise.all(asyncDataHooks.map(hook => hook({store, route: to}))).then(endLoadingCallback).catch(err => {
      console.error(Date.now().toLocaleString(), err);
      endLoadingCallback(false);
    });
  };

  router.beforeResolve(beforeResolveHook);

  if (window.__INITIAL_STATE__ && window.__INITIAL_STATE__.siteInfo) {
    let analyzeCode = window.__INITIAL_STATE__.siteInfo.analyzeCode;
    if (analyzeCode && analyzeCode.value !== '') {
      router.afterEach((to, from) => {
        from.name && setTimeout(() => {
          if (to.path !== from.path) {
            clientGoogleAnalyse(to.path || '/');
          }
        });
      });
    }
  }

  if (typeof window.__INITIAL_STATE__ === 'undefined') {
    beforeResolveHook(router.currentRoute, {}, () => {});
    Promise.all(
      preFetchComponent.map(component => component.asyncData(store, store.state.route))
    ).then(() => makeResponsive());
  }
  app.$mount('#app');
});

