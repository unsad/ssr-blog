import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
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
import PageCreate from '@/components/PageCreate'
import CateCreate from '@/components/CateCreate'
import UserList from '@/components/UserList'
import OptionGeneral from '@/components/OptionGeneral'
import OptionComment from '@/components/OptionComment'
import OptionAnalytic from '@/components/OptionAnalytic'

Vue.use(Router);

let router = new Router({
  mode: history,
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/post',
      name: 'post',
      component: App,
      children: [
        {
          path: 'list',
          components: PostList
        },
        {
          path: 'create',
          components: PostCreate
        },
        {
          path: 'edit/:id',
          components: PostCreate
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
          components: PageList
        },
        {
          path: 'create',
          components: PageCreate
        },
        {
          path: 'edit/:id',
          components: PageCreate
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
          components: UserList
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
          components: CateList
        },
        {
          path: 'create',
          components: CateCreate
        },
        {
          path: 'edit/:id',
          components: CateCreate
        }
      ]
    },
    {
      path: '/tag',
      components: App,
      children: [
        {
          path: 'list',
          components: TagList
        },
        {
          path: 'create',
          components: TagCreate
        },
        {
          path: 'edit/:id',
          components: TagCreate
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
          components: OptionGeneral
        },
        {
          path: 'comment',
          components: OptionComment
        },
        {
          path: 'analytic',
          components: OptionAnalytic
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

router.beforeEach(function () {
  window.scrollTo(0, 0);
});

router.afterEach(transition => {
  if (transition.to.router._children[0] && typeof transition.to.router._children[0].currentRoute !== 'undefined') {
    let arr = transition.to.path.split('/').filter(value => value != '').filter((value, index) => index < 2).map(value => {
      if (value === 'edit') {
        value = 'create';
      }
      return value;
    });
    transition.to.router._children[0].currentRoute = '/' + arr.join('/');
  }
});

export default router;

