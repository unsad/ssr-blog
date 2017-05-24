import Vue from 'vue'
import Router from 'vue-router'
import BlogPager from '@/components/BlogPager'
import About from '@/components/About'

Vue.use(Router);

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: BlogPager,
      params: {
        page: 1
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About
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
