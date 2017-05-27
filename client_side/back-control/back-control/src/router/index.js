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
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/post',
      name: 'post',
      component: post,
      children: [
        {
          path: 'list',
          components: list
        },
        {
          path: 'create',
          components: create
        },
        {
          path: 'edit/:id',
          components: edit
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
          components: list
        },
        {
          path: 'create',
          components: create
        },
        {
          path: 'edit/:id',
          components: edit
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
          components: list
        },
        {
          path: 'create',
          components: create
        },
        {
          path: 'edit/:id',
          components: edit
        },
        {
          path: '/edit_pwd',
          components: edit_pwd
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
          components: list
        },
        {
          path: 'create',
          components: create
        },
        {
          path: 'edit/:id',
          components: edit
        }
      ]
    },
    {
      path: '/tag',
      components: tag,
      children: [
        {
          path: 'list',
          components: list
        },
        {
          path: 'create',
          components: create
        },
        {
          path: 'edit/:id',
          components: edit
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
          components: general
        },
        {
          path: 'two_factor_auth',
          components: two_factor_auth
        },
        {
          path: 'comment',
          components: comment
        },
        {
          path: 'analytic',
          components: analytic
        },
        {
          path: 'import',
          components: impo
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

