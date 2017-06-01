<template>
  <div class="header">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li><router-link :to="{path: '/dashboard'}">首页</router-link></li>
        <template v-if="routes === '/dashboard'" v-for="item of routes">
          <li v-if="item.url === this.props.location.pathname" class="active">一级title</li>
          <li v-else>
            <router-link :to="{path: item.children ? item.children[0].url : item.url}">二级title</router-link>
          </li>
        </template>
      </ol>
      <ul class="nav userinfo" ref="userinfo">
        <li :class="this.getUserClass()">
          <a href="" class="dropdown-toggle" data-toggle="dropdown">
            {{SysConfig.userInfo.name}}<b class="caret"></b>
          </a>
          <ul class="dropdown-menu">
            <li><a href="/user/edit_pwd">修改密码</a></li>
            <li><a href="/admin/user/logout">退出</a></li>
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

      }
    },
    methods: {
      getUserClass() {
        return classNames({
          dropdown: true,
          open: true
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
