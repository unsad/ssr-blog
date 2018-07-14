import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';

const isServer = process.env.VUE_ENV === 'server';

if (isServer) {
  window.scrollTo = function(x, y) {
      // hack服务端scroll报错
  };
}

const BlogPager = () => import('@/components/BlogPager');
const PostContainer = () => import('@/components/PostContainer');
const Archive = () => import('@/components/Archive');
const Tag = () => import('@/components/Tag');
const TagPager = () => import('@/components/TagPager');
const About = () => import('@/components/About');
const Link = () => import('@/components/Link');
const CatchMe = () => import('@/components/CatchMe');

Vue.use(Router);
Vue.use(VueMeta);

export function createRouter() {
  let router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: function (to, from, savedPosition) {
      if (to.hash) {
        return {selector: decodeURIComponent(to.hash)};
      }
      if (savedPosition) {
        return savedPosition;
      } else {
        return {x: 0, y: 0};
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
};
