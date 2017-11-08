import Vue from 'vue'
import Router from 'vue-router'

const BlogPager = () => import('@/components/BlogPager');
const PageContainer = () => import('@/components/PageContainer');
const PostContainer = () => import('@/components/PostContainer');
const Archive = () => import('@/components/Archive');
const Tag = () => import('@/components/Tag');
const Post = () => import('@/components/Post');
const TagPager = () => import('@/components/TagPager');
const Sidebar = () => import('@/components/Sidebar');
const Header = () => import('@/components/Header');

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({y: 0}),
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
        path: '/:page',
        name: 'page',
        component: PageContainer
      }
    ]
  });
}
