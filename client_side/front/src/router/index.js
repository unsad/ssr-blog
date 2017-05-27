import Vue from 'vue'
import Router from 'vue-router'
import BlogPager from '@/components/BlogPager'
import About from '@/components/About'
import Archive from '@/components/Archive'
import Tag from '@/components/Tag'
import Post from '@/components/Post'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: BlogPager
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/post/:pathName',
      name: 'post',
      component: Post
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive
    },
    {
      path: '/tag',
      name: 'tag',
      component: Tag
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
