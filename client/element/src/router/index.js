import Vue from 'vue';
import Router from 'vue-router';

import createListView from '@/components/views/CreateListView';
import createEditView from '@/components/views/CreateEditView';
import createMarkdownView from '@/components/views/CreateMarkdownView';

import Login from '@/components/pages/Login';
import Logout from '@/components/pages/Logout';
import Dashboard from '@/components/pages/Dashboard';
import Main from '@/components/Main';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  },
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      components: {
        default: Login
      }
    },
    {
      path: '/admin/logout',
      name: 'logout',
      components: {
        default: Logout
      }
    },
    {
      path: '/dashboard',
      component: Main,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/post',
      name: 'post',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'postList',
          component: createListView({
            name: 'post',
            model: 'post',
            isButtonFixed: true,
            items: [
              {
                prop: 'title',
                label: '标题',
                width: 300
              },
              {
                prop: 'pathName',
                label: '路径',
                width: 300
              }
            ],
            query: {
              conditions: {
                type: 'post'
              },
              select: {
                title: 1,
                pathName: 1,
                tags: 1,
                category: 1
              },
              sort: 1
            }
          })
        },
        {
          path: 'create/:id?',
          name: 'postCreate',
          component: createMarkdownView({
            name: 'post',
            model: 'post',
            items: [
              {
                prop: 'title',
                label: '标题',
                type: 'input',
                default: '',
                width: 250
              },
              {
                prop: 'pathName',
                label: '路径',
                type: 'input',
                default: '',
                width: 250,
                description: '唯一标志在前端路径显示'
              },
              {
                prop: 'markdownContent',
                label: '内容',
                type: 'markdown',
                default: '',
                width: 170,
                subProp: 'markdownToc'
              },
              {
                type: 'split'
              },
              {
                prop: 'createdAt',
                label: '创建日期',
                type: 'date-picker',
                default: '',
                width: 170
              },
              {
                prop: 'updatedAt',
                label: '修改日期',
                type: 'date-picker',
                default: '',
                width: 170
              },
              {
                prop: 'tags',
                label: '标签',
                type: 'select',
                default: [],
                width: 170
              },
              {
                prop: 'category',
                label: '分类',
                type: 'radio',
                default: '',
                width: 170
              },
              {
                prop: 'isPublic',
                label: '是否公开',
                type: 'switch',
                default: true,
                width: 170
              },
              {
                prop: 'allowComment',
                label: '允许评论',
                type: 'switch',
                default: true,
                width: 170
              }
            ],
            query: {
              conditions: {
                type: 'post'
              },
              select: {
                title: 1,
                pathName: 1,
                tags: 1,
                category: 1,
                isPublic: 1,
                allowComment: 1,
                updatedAt: 1,
                createdAt: 1,
                markdownContent: 1,
                type: 1,
                markdownToc: 1
              }
            }
          })
        }
      ]
    },
    {
      path: '/page',
      name: 'page',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'pageList',
          component: createListView({
            name: 'page',
            model: 'post',
            items: [
              {
                prop: 'pathName',
                label: '路径',
                width: 170
              },
              {
                prop: 'createdAt',
                label: '创建日期',
                width: 170
              },
              {
                prop: 'updatedAt',
                label: '修改日期',
                width: 170
              }
            ],
            query: {
              conditions: {
                type: 'page'
              },
              select: {
                title: 1,
                pathName: 1,
                createdAt: 1,
                updatedAt: 1
              }
            }
          })
        },
        {
          path: 'create/:id?',
          name: 'pageCreate',
          component: createMarkdownView({
            name: 'page',
            model: 'post',
            items: [
              {
                prop: 'title',
                label: '标题',
                type: 'input',
                default: '',
                width: 250
              },
              {
                prop: 'pathName',
                label: '路径',
                type: 'input',
                default: '',
                width: 250,
                description: '前端路径标志'
              },
              {
                prop: 'markdownContent',
                label: '内容',
                type: 'markdown',
                default: '',
                width: 170,
                subProp: 'markdownToc'
              },
              {
                type: 'split'
              },
              {
                prop: 'createdAt',
                label: '创建日期',
                type: 'date-picker',
                default: '',
                width: 170
              },
              {
                prop: 'updatedAt',
                label: '修改日期',
                type: 'date-picker',
                default: '',
                width: 170
              },
              {
                prop: 'isPublic',
                label: '是否公开',
                type: 'switch',
                default: true,
                width: 170
              },
              {
                prop: 'allowComment',
                label: '允许评论',
                type: 'switch',
                default: true,
                width: 170
              }
            ],
            query: {
              conditions: {
                type: 'page'
              },
              select: {
                title: 1,
                pathName: 1,
                isPublic: 1,
                allowComment: 1,
                updatedAt: 1,
                createdAt: 1,
                markdownContent: 1,
                type: 1,
                markdownToc: 1
              }
            }
          })
        }
      ]
    },
    {
      path: '/theme',
      name: 'theme',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'themeList',
          component: createListView({
            name: 'theme',
            model: 'theme',
            items: [
              {
                prop: 'name',
                label: '主题',
                width: 250
              },
              {
                prop: 'author',
                label: '作者'
              }
            ],
            query: {}
          })
        },
        {
          path: 'create/:id',
          name: 'themeEdit',
          component: createEditView({
            name: 'theme',
            model: 'theme',
            items: [
              {
                prop: 'name',
                label: '主题名称',
                width: 250
              },
              {
                prop: 'author',
                label: '作者',
                width: 170
              },
              {
                prop: 'option',
                label: '配置',
                width: 170,
                type: 'textarea',
                sourceType: 'Object',
                description: '配置内容应为一个JSON对象，不符合JSON格式时提交将被忽略'
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/cate',
      name: 'cate',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'cateList',
          component: createListView({
            name: 'cate',
            model: 'category',
            items: [
              {
                prop: 'name',
                label: '分类',
                width: 250
              }
            ],
            query: {}
          })
        },
        {
          path: 'create/:id?',
          name: 'cateCreate',
          component: createEditView({
            name: 'cate',
            model: 'category',
            items: [
              {
                prop: 'name',
                label: '分类名称',
                width: 250
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/tag',
      name: 'tag',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'tagList',
          component: createListView({
            name: 'tag',
            model: 'tag',
            items: [
              {
                prop: 'name',
                label: '标签',
                width: 250
              }
            ],
            query: {}
          })
        },
        {
          path: 'create/:id?',
          name: 'tagCreate',
          component: createEditView({
            name: 'tag',
            model: 'tag',
            items: [
              {
                prop: 'name',
                label: '标签名称',
                width: 250
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: Main,
      children: [
        {
          path: 'edit',
          name: 'userEdit',
          component: createEditView({
            name: 'user',
            model: 'user',
            isPlain: true,
            items: [
              {
                prop: 'name',
                label: '账号',
                default: '',
                width: 250
              },
              {
                prop: 'password',
                label: '密码',
                default: '',
                width: 170
              },
              {
                prop: 'displayName',
                label: '昵称',
                default: '',
                width: 170,
                description: '后台管理顶部导航栏显示'
              },
              {
                prop: 'email',
                label: '邮箱',
                default: '',
                width: 170,
                description: '文章被回复时需要通知的邮箱，可为空'
              },
              {
                prop: 'imageToken',
                label: '七牛Token',
                default: '',
                width: 170
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/option',
      name: 'option',
      component: Main,
      children: [
        {
          path: 'general',
          name: 'optionGeneral',
          component: createEditView({
            name: 'general',
            model: 'option',
            isPlain: true,
            items: [
              {
                prop: 'title',
                label: '网站名称',
                default: '',
                width: 250,
                description: '前后台标题'
              },
              {
                prop: 'logoUrl',
                label: 'logo地址',
                default: '',
                width: 170,
                description: '前后台图标，80 X 80'
              },
              {
                prop: 'description',
                label: '站点描述',
                default: '',
                width: 170,
                description: '前后台侧边栏描述'
              },
              {
                prop: 'siteUrl',
                label: '网站地址',
                default: '',
                width: 170,
                description: '前台域名'
              },
              {
                prop: 'faviconUrl',
                label: 'favicon地址',
                default: '',
                width: 170,
                description: '前台favicon地址，相对前台的根路径'
              },
              {
                prop: 'keywords',
                label: '关键词',
                default: '',
                width: 170,
                description: 'meta的keywords便于seo'
              },
              {
                prop: 'githubUrl',
                label: 'github地址',
                default: '',
                width: 170,
                description: 'github用户名'
              },
              {
                prop: 'weiboUrl',
                label: '微博地址',
                default: '',
                width: 170,
                description: '微博地址全部链接'
              },
              {
                prop: 'miitbeian',
                label: '网站备案号',
                default: '',
                width: 170,
                description: '前台底部显示'
              }
            ],
            query: {}
          })
        },
        {
          path: 'comment',
          name: 'optionComment',
          component: createEditView({
            name: 'comment',
            model: 'option',
            isPlain: true,
            items: [
              {
                prop: 'commentType',
                label: '评论类型',
                default: '',
                width: 250,
                description: '仅支持disqus'
              },
              {
                prop: 'commentName',
                label: '评论名称',
                default: '',
                width: 250,
                description: 'disqus的id'
              }
            ],
            query: {}
          })

        },
        {
          path: 'analytic',
          name: 'optionAnalytic',
          component: createEditView({
            name: 'analytic',
            model: 'option',
            isPlain: true,
            items: [
              {
                prop: 'analyzeCode',
                label: '统计代码',
                default: '',
                width: 250,
                description: '谷歌统计的id'
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/',
      redirect: '/admin/login'
    }
  ]
})
