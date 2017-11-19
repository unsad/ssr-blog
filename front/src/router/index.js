import Vue from 'vue'
import Router from 'vue-router'

const CreatePostView = type => resolve => {
  import('@/views/CreatePostView').then(component => {
    const target = component(type);
    resolve(target);
  })
};

const BlogPager = () => import('@/components/BlogPager');
const PageContainer = () => import('@/components/PageContainer');
const PostContainer = () => import('@/components/PostContainer');
const Archive = () => import('@/components/Archive');
const Tag = () => import('@/components/Tag');
const TagPager = () => import('@/components/TagPager');
const Sidebar = () => import('@/components/Sidebar');
const Header = () => import('@/components/Header');
const Post = CreatePostView('post');
const Page = CreatePostView('page');

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: function (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        let position = {x: 0, y: 0};
        if (to.hash) {
          position = {selector: to.hash};
        }
        return position;
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
