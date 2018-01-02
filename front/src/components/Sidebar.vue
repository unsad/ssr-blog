<template>
  <nav id="sidebar"
       :class="{'sidebar-image': sidebarUrl !== ''}"
       :style="imageStyle">
    <div class="profile" v-if="false">
      <a href="/">
        <img :src="logoUrl" :alt="siteInfo.title.value">
      </a>
      <span :style="{'color': sidebarUrl ? option.sidebarFontColor : ''}">{{siteInfo.title.value}}</span>
    </div>
    <ul class="sidebar-link" v-if="option && option.menu">
      <li v-for="menu of option.menu">
        <router-link :to="{path: menu.url}" :title="menu.label">
          <span>{{menu.label}}</span>
        </router-link>
      </li>
    </ul>
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
#sidebar 
  background: black
  border-right: 0.25rem solid white
  .sidebar-link
    padding: 0
    font-size: 4rem
</style>
