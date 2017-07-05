import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/post',
      name: 'post',
      component: post,
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
      components: page,
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
      components: user,
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
      name: cate,
      components: cate,
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
      components: tag,
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
      path: '/options',
      name: 'post',
      components: post,
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

