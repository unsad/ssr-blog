import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';

const CreatePostView = type => resolve => {
  import('@/views/CreatePostView').then(component => {
    const target = component.default(type);
    resolve(target);
  });
};

const BlogPager = () => import('@/components/BlogPager');
const PageContainer = () => import('@/components/PageContainer');
const PostContainer = () => import('@/components/PostContainer');
const Archive = () => import('@/components/Archive');
const Tag = () => import('@/components/Tag');
const TagPager = () => import('@/components/TagPager');
const Sidebar = () => import('@/components/Sidebar');
const Header = () => import('@/components/Header');
const About = () => import('@/components/About');
const Link = () => import('@/components/Link');
const Post = CreatePostView('post');
const Page = CreatePostView('page');

Vue.use(Router);
Vue.use(VueMeta);

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: function (to, from, savedPosition) {
      if (to.hash) {
        return {selector: to.hash};
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
        component: Post
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
        path: '/tag',
        name: 'tag',
        component: Tag
      },
      {
        path: '/tag/:tagName',
        name: 'tagPager',
        component: TagPager
      },
      {
        path: '/:page*',
        name: 'page',
        component: Page
      }
    ]
  });
}
