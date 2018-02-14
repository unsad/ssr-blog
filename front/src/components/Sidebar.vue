<template>
  <div class="wrapper">
    <nav id="sidebar"
        :class="{'sidebar-image': sidebarUrl !== ''}">
      <div class="profile" v-if="false">
        <a href="/">
          <img :src="logoUrl" :alt="siteInfo.title.value">
        </a>
        <span :style="{'color': sidebarUrl ? option.sidebarFontColor : ''}">{{siteInfo.title.value}}</span>
      </div>
      <ul class="sidebar-link" v-if="option && option.menu">
        <li v-for="menu of option.menu" :key="menu.label">
          <router-link :to="{path: menu.url}" :title="menu.label">
            <span class="rotate-1">{{menu.label[0]}}</span><span class="rotate-2">{{menu.label[1]}}</span>
          </router-link>
        </li>
      </ul>
      <div class="pic">
        <img src="../../static/sidebar.png" alt="" width="180%">
      </div>
      <ul class="sidebar-buttons" v-if="siteInfo && siteInfo.weiboUrl">
        <li>
          <a :href="'https://github.com' + siteInfo.githubUrl.value"
            target="_blank"
            class="inline"
            v-if="siteInfo.githubUrl.value"
            ref="nofollow">
            <i title="GitHub"></i>
          </a>
        </li>
        <li>
          <a :href="siteInfo.weiboUrl.value"
            target="_blank"
            class="inline"
            v-if="siteInfo.weiboUrl.value"
            ref="nofollow">
            <i title="GitHub"></i>
          </a>
        </li>
        <li>
          <a href="/rss.xml" target="_blank" class="inline">
            <i title="RSS"></i>
          </a>
        </li>
        <li>
          <a :href="'https://www.google.com/webhp#newwindow=1&safe=strict&q=site:' + siteInfo.siteUrl.value"
            target="_blank"
            class="inline"
            v-if="siteInfo.siteUrl.value">
            <i title="Search"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import mixin from '../mixin/image'

  function fetchInfo({store, route: {path, params, query}}) {
    return Promise.all([store.dispatch('FETCH_OPTIONS'), store.dispatch('FETCH_FIREKYLIN')]);
  }

  export default {
    name: 'sideBar',
    asyncData: fetchInfo,
    metaInfo () {
      const {
        title: { value: title },
        description: { value: description },
        keywords: { value: keywords },
        logoUrl: {value: logoUrl},
        faviconUrl: { value: favicon }
      } = this.siteInfo;
      return {
        title,
        titleTemplate: `%s - ${title}`,
        meta: [
          { name: 'charset', content: 'UTF-8' },
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
          { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
        ],
        link: [
          { rel: 'icon', href: favicon },
          { rel: 'apple-touch-icon', href: logoUrl},
          { rel: 'alternate', type: 'application/rss+xml', title: 'RSS 2.0', href: '/rss.xml' }
        ]
      }
    },
    mixins: [mixin]
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.wrapper 
  position: relative
  .pic 
    position: absolute
    bottom: -1rem
    left: calc(22% - 30vh)
    width: 100%
    z-index: -1
  #sidebar 
    height: 100%
    background: black
    clip-path: polygon(0 0, 100% 0, calc(100% - 30vh) 100%, 0% 100%)
    &::before 
      position: absolute
      content: ''
      left: 0 
      right: 0
      top: 0
      bottom: 0
      background: white
      clip-path: polygon(97% 0, 100% 0, calc(100% - 30vh) 100%, calc(97% - 30vh) 100%)
    .sidebar-link
      padding: 0
      text-align: center
      font-size: 4rem
      transform: rotate(20deg) translate(26%)
      line-height: 2

.rotate-1 
  display: inline-block
  transform: rotate(-45deg)
  -webkit-text-stroke: 2px black;
.rotate-2 
  display: inline-block
  color: black
  -webkit-text-stroke: 2px white;
  transform: rotate(15deg) translate(5%)
</style>
