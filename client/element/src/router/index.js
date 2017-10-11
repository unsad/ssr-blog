import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Dashboard from '@/components/Dashboard'


Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
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
      name: 'dashboard',
      components: {
        default: Dashboard
      }
    }
  ]
})
