import Vue from 'vue'
import Router from 'vue-router'
import BlogPager from '@/components/BlogPager'
import About from '@/components/About'
import Archive from '@/components/Archive'
import Tag from '@/components/Tag'
import Post from '@/components/Post'
import TagPager from '@/components/TagPager'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

Vue.use(Router);

let router = new Router({
  mode: history,
  routes: [
    {
      path: '/',
      name: 'main',
      component: {
        default: BlogPager,
        sidebar: Sidebar,
        header: Header
      }
    },
    {
      path: '/about',
      name: 'about',
      component: {
        default: About,
        sidebar: Sidebar,
        header: Header
      }
    },
    {
      path: '/post/:pathName',
      name: 'post',
      component: {
        default: Post,
        sidebar: Sidebar,
        header: Header
      }
    },
    {
      path: '/archive',
      name: 'archive',
      component: {
        default: Archive,
        sidebar: Sidebar,
        header: Header
      }
    },
    {
      path: '/tag',
      name: 'tag',
      component: {
        default: Tag,
        sidebar: Sidebar,
        header: Header
      }
    },
    {
      path: '/tag/:tagName',
      name: 'tagPager',
      component: {
        default: TagPager,
        sidebar: Sidebar,
        header: Header
      }
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
