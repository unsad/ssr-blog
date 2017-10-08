/**
 * Created by unsad on 2017/9/20.
 */
import Vue from 'vue';
import { createApp } from './main';
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
    if (!asyncDataHooks.length) return next();

    Promise.all(asyncDataHooks.map(hook => hook({store, route: to}))).then(next).catch(next);
  });

  if (window.__INITIAL_STATE__.siteInfo) {
    let analyze_code = window.__INITIAL_STATE__.siteInfo.analyze_code;
    if (analyze_code && analyze_code.value !== '') {
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
      +ga('create', 'UA-86299315-1', 'auto');
      +ga('send', 'pageview');
    }
  }

  router.afterEach(route => {
    console.log(route);
    ga('send', {
      hitType: 'pageview',
      page: route.path,
      location: window.location.origin + route.path,
      title: route.name
    })
  });

  app.$mount('#app');
});


