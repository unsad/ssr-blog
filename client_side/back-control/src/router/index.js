import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import App from '@/App'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: App
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: App
    },
    {
      path: '/post',
      name: 'post',
      component: App,
      children: [
        {
          path: 'list',
          components: Login
        },
        {
          path: 'create',
          components: Login
        },
        {
          path: 'edit/:id',
          components: Login
        }
      ]
    },
    {
      path: '/page',
      name: 'page',
      components: App,
      children: [
        {
          path: 'list',
          components: Login
        },
        {
          path: 'create',
          components: Login
        },
        {
          path: 'edit/:id',
          components: Login
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      components: App,
      children: [
        {
          path: 'list',
          components: Login
        },
        {
          path: '/edit_pwd',
          components: Login
        }
      ]
    },
    {
      path: '/cate',
      name: 'cate',
      components: App,
      children: [
        {
          path: 'list',
          components: Login
        },
        {
          path: 'create',
          components: Login
        },
        {
          path: 'edit/:id',
          components: Login
        }
      ]
    },
    {
      path: '/tag',
      components: App,
      children: [
        {
          path: 'list',
          components: Login
        },
        {
          path: 'create',
          components: Login
        },
        {
          path: 'edit/:id',
          components: Login
        }
      ]
    },
    {
      path: '/option',
      name: 'option',
      components: App,
      children: [
        {
          path: 'general',
          components: Login
        },
        {
          path: 'comment',
          components: Login
        },
        {
          path: 'analytic',
          components: Login
        }
      ]
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

