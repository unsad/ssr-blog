<template>
  <div class="header">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li :class="true ? 'active' : ''" v-if="routes[0] !== ['dashboard']">
          <router-link :to="{name: 'dashboard'}" @click="goToUrl('/dashboard', false)">首页</router-link>
        </li>
        <template v-for="(route, index) of routes">
          <li :class="true ? 'active' : ''">
          <router-link @click=goURL(routes, index) :to="{path: index === 0 ? '/' + route : routes.join('/')}">{{route === '/dashboard' ? '首页' : route}}</router-link>
          </li>
        </template>
      </ol>
      <ul class="nav userinfo">
        <li :class="this.getUserClass()">
          <a href="" @click="toggleUser" class="dropdown-toggle" data-toggle="dropdown">
            'unsad'<b class="caret"></b>
          </a>
          <ul class="dropdown-menu">
            <li><router-link @click="goToUrl('/user/list', true)"  :to="{path: '/user/list'}">修改密码</router-link></li>
            <li><a href="/admin/user/logout" @click="toggleUser">退出</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import classNames from 'classnames';

  export default {
    name: 'top',
    props: {
      shouldTipShow: Boolean,
      type: String,
      text: String,
      currentRoute: String
    },
    computed: {
      routes() {
        let arr = this.currentRoute.split('/');
        arr = arr.filter(value => {
          return value !== ''
        });
        return arr;
      }
    },
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      getUserClass() {
        return classNames({
          dropdown: true,
          open: this.isOpen
        })
      },
      toggleUser() {
        this.isOpen = !this.isOpen;
      },
      goToUrl(url, toggle) {
        if (toggle) {
          this.toggleUser();
        }
//        this.currentRoute = url;
      },
      goURL(routes, index) {

      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
