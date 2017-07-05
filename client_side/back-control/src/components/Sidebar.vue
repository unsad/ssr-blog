<template>
  <div id="fk-side">
    <div class="mod">
      <div class="mod-logo">
        <h1><a href="/">{{title}}</a></h1>
      </div>
    </div>
    <ul class="mod-bar">
      <input type="hidden" id="hide_values" val="0"/>
      <li v-for="route of routes">
        <router-link v-if="route.children" :to="{path: route.children[0].url}"
                     @click="open(route.children && route.children[0].url || route.url)"
                     :class="getClassName(route.icon, route.url)"
        ><span>{{route.title}}</span></router-link>
        <router-link v-else :to="{path: route.url}"
                     @click="open(route.children && route.children[0].url || route.url)"
                     :class="getClassName(route.icon, route.url)"
        ><span>{{route.title}}</span></router-link>
      </li>
      <ul v-if="route.children" :style="{'height': getHeight(route)}">
        <li v-for="child of route.children">
          <router-link :to="{path: child.url}"
                       @click="open(child.url)"
                       :class="getSubLinkClassName(child.url)"
          ><span>{{child.title}}</span></router-link>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
  import classNames from 'classnames';

  export default {
    name: 'sidebar',
    props: {
      shouldTipShow: Boolean,
      type: String,
      text: String,
      currentRoute: String
    },
    data() {
      return {
        title: '造梦之地',
        routes: [
          {url: '/dashboard', icon: 'home', title:'概述'},
          {url: '/post', icon: 'topic', title: '文章管理', children: [
            {url: '/post/list', title: '文章列表'},
            {url: '/post/create', title: '添加文章'}
          ]},
          {
            url: '/page', icon: 'reply', title: '页面管理', type: 1, children: [
            {url: '/page/list', title: '页面列表'},
            {url: '/page/create', title: '添加页面'}
          ]},
          {
            url: '/cate', icon: 'report', title: '分类管理', type: 1, children: [
            {url: '/cate/list', title: '分类列表'},
            {url: '/cate/create', title: '添加分类'}
          ]},
          {
            url: '/tag', icon: 'report', title: '标签管理', type: 1, children: [
            {url: '/tag/list', title: '标签列表'},
            {url: '/tag/create', title: '添加标签'}
          ]},
          {
            url: '/user', icon: 'user', title: '用户管理', type: 1, children: [
            {url: '/user/list', title: '用户设置'},
            {url: '/user/edit_pwd', title: '修改密码'}
          ]},
          {
            url: '/options', icon: 'setting', title: '系统设置', type: 1, children: [
            {url: '/options/general', title: '基本设置'},
            {url: '/options/comment', title: '评论设置'},
            {url: '/options/analytic', title: '统计代码'}
          ]}
        ]
      }
    },
    methods: {
      isActive(routeUrl) {
        return this.currentRoute.indexOf(routerUrl) > -1;
      },
      getHeight(route, routeUrl) {
        let height = 49 * (this.isActive(route.url) ? route.children.length : 0);
        return height + 'px';
      },
      getClassName(icon, routeUrl) {
        let active = this.isActive(routeUrl);
        return classNames({
          icon: true,
          [`icon-${icon}`]: true,
          active: active
        })
      },
      getSubLinkClassName(routeUrl) {
        return classNames({
          active: this.isActive(routeUrl)
        })
      },
      open(routeUrl) {
        this.currentRoute = routeUrl;
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
