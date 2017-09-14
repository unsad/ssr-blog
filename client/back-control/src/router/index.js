import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import App from '@/App'
import Dashboard from '@/components/Dashboard'
import Tip from '@/components/Tip'
import Sidebar from '@/components/Sidebar'
import PostList from '@/components/PostList'
import PageList from '@/components/PageList'
import TagList from '@/components/TagList'
import CateList from '@/components/CateList'
import TagCreate from '@/components/TagCreate'
import PostCreate from '@/components/PostCreate'
import CateCreate from '@/components/CateCreate'
import UserList from '@/components/UserList'
import OptionGeneral from '@/components/OptionGeneral'
import OptionComment from '@/components/OptionComment'
import OptionAnalytic from '@/components/OptionAnalytic'
import VersionCreate from '@/components/VersionCreate'
import VersionList from '@/components/VersionList'

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin/login',
      component: Login,
      auth: false
    },
    {
      path: '/admin/logout',
      component: Logout,
      auth: false
    },
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      auth: true
    },
    {
      path: '/post',
      name: 'post',
      component: App,
      auth: true,
      children: [
        {
          path: 'list',
          component: PostList,
          auth: true
        },
        {
          path: 'create',
          component: PostCreate,
          auth: true
        },
        {
          path: 'edit/:id',
          component: PostCreate,
          auth: true
        }
      ]
    },
    {
      path: '/page',
      name: 'page',
      component: App,
      auth: true,
      children: [
        {
          path: 'list',
          component: PageList,
          auth: true
        },
        {
          path: 'create',
          component: PostCreate,
          auth: true
        },
        {
          path: 'edit/:id',
          component: PostCreate,
          auth: true
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: App,
      auth: true,
      children: [
        {
          path: 'list',
          component: UserList,
          auth: true
        }
      ]
    },
    {
      path: '/cate',
      name: 'cate',
      component: App,
      auth: true,
      children: [
        {
          path: 'list',
          component: CateList,
          auth: true
        },
        {
          path: 'create',
          component: CateCreate,
          auth: true
        },
        {
          path: 'edit/:id',
          component: CateCreate,
          auth: true
        }
      ]
    },
    {
      path: '/tag',
      component: App,
      auth: true,
      children: [
        {
          path: 'list',
          component: TagList,
          auth: true
        },
        {
          path: 'create',
          component: TagCreate,
          auth: true
        },
        {
          path: 'edit/:id',
          component: TagCreate,
          auth: true
        }
      ]
    },
    {
      path: '/update',
      name: 'update',
      component: App,
      auth: true,
      children: [
        {
          path: 'list',
          component: VersionList,
          auth: true
        },
        {
          path: 'create',
          component: VersionCreate,
          auth: true
        },
        {
          path: 'edit/:id',
          name: 'editUpdate',
          component: VersionCreate,
          auth: true
        }
      ]

    },
    {
      path: '/option',
      name: 'option',
      component: App,
      auth: true,
      children: [
        {
          path: 'general',
          component: OptionGeneral,
          auth: true
        },
        {
          path: 'comment',
          component: OptionComment,
          auth: true
        },
        {
          path: 'analytic',
          component: OptionAnalytic,
          auth: true
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/post',
      redirect: '/post/list'
    },
    {
      path: '/page',
      redirect: '/page/list'
    },
    {
      path: '/tag',
      redirect: '/tag/list'
    },
    {
      path: '/cate',
      redirect: '/cate/list'
    },
    {
      path: '/user',
      redirect: '/user/list'
    },
    {
      path: '/option',
      redirect: '/option/general'
    }
  ]
});

router.beforeEach((to, from, next) => {
  let authenticated = true;
  let token = localStorage.getItem('token');
  if (!token) {
    authenticated = false;
  }
  if (to.path !== '/admin/login' && to.matched.auth && !authenticated) {
    next({
      path: '/admin/login'
    });
  } else {
    next();
  }
});

export default router;

