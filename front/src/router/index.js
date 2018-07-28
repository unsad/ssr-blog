import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';

const isServer = process.env.VUE_ENV === 'server';

if (isServer) {
  window.scrollTo = function(x, y) {
      // hack服务端scroll报错
  };
}

const BlogPager = () => import('@/components/blog-pager');
const PostContainer = () => import('@/components/post-container');
const Archive = () => import('@/components/archive');
const Tag = () => import('@/components/tag');
const TagPager = () => import('@/components/tag-pager');
const About = () => import('@/components/about');
const Link = () => import('@/components/link');
const CatchMe = () => import('@/components/catchme');

Vue.use(Router);
Vue.use(VueMeta);

export function createRouter() {
  let router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: function (to, from, savedPosition) {
      if (to.hash) {
        return { selector: decodeURIComponent(to.hash) };
      }
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    routes: [
      {
        path: '/',
        name: 'main',
        component: BlogPager
      },
      {
        path: '/post/:pathName',
        name: 'post',
        component: PostContainer
      },
      {
        path: '/archive',
        name: 'archive',
        component: Archive
      },
      {
        path: '/about',
        name: 'about',
        component: About
      },
      {
        path: '/link',
        name: 'link',
        component: Link
      },
      {
        path: '/catchme',
        name: 'catchme',
        component: CatchMe
      },
      {
        path: '/tag',
        name: 'tag',
        component: Tag
      },
      {
        path: '/tag/:tagName',
        name: 'tagPager',
        component: TagPager
      }
    ]
  });
  return router;
}
