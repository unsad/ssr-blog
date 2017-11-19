<template>
  <nav id="sidebar" class="behavior_1"
       :class="{'sidebar-image': sidebarUrl !== ''}"
       :style="{'background-image': sidebarUrl ? 'url(' + sidebarUrl + ')' : '',
       'transition': sidebarUrl ? option.sidebarMoveCss : ''}">
    <div class="profile">
      <a href="/">
        <img :src="logoUrl" :alt="siteInfo.title.value">
      </a>
      <span :style="{'color': option.sidebarFontColor || ''}">{{siteInfo.title.value}}</span>
    </div>
    <ul class="buttons">
      <li v-for="menu of option.menu">
        <router-link :style="{'color': option.sidebarFontColor || ''}" :to="{path: menu.url}" :title="menu.label">
          <i class="iconfont" :class="'icon-' + menu.option"></i>
          <span>{{menu.label}}</span>
        </router-link>
      </li>
    </ul>
    <ul class="buttons">
      <li>
        <a :style="{'color': option.sidebarFontColor || ''}"
           :href="'https://github.com' + siteInfo.githubUrl.value"
           target="_blank"
           class="inline"
           v-if="siteInfo.githubUrl.value"
           ref="nofollow">
          <i title="GitHub"></i>
        </a>
      </li>
      <li>
        <a :style="{'color': option.sidebarFontColor || ''}"
           :href="siteInfo.weiboUrl.value"
           target="_blank"
           class="inline"
           v-if="siteInfo.weiboUrl.value"
           ref="nofollow">
          <i title="GitHub"></i>
        </a>
      </li>
      <li>
        <a :style="{'color': option.sidebarFontColor || ''}" href="/rss.xml" target="_blank" class="inline">
          <i title="RSS"></i>
        </a>
      </li>
      <li>
        <a :style="{'color': option.sidebarFontColor || ''}"
           :href="'https://www.google.com/webhp#newwindow=1&safe=strict&q=site:' + siteInfo.siteUrl.value"
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

  export default {
    name: 'sideBar',
    asyncData({store, route: {path, params, query}}) {
      return Promise.all([store.dispatch('FETCH_OPTIONS'), store.dispatch('FETCH_FIREKYLIN')]);
    },
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

</style>
