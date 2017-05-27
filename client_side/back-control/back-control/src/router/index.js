import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach(function() {
  window.scrollTo(0, 0);
});

export default router;

