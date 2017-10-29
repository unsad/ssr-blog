<template>
  <nav id="sidebar" class="behavior_1"
       :class="{'sidebar-image': option.sidebarImageUrl !== ''}"
       :style="{'background-image': option.sidebarImageUrl ? 'url(' + option.sidebarImageUrl + ')' : '',
       'transition': option.sidebarImageUrl ? 'background 2s ease-in-out;' : ''}">
    <div class="profile">
      <a href="/">
        <img :src="siteInfo.logoUrl.value" :alt="siteInfo.title.value" ref="logo">
      </a>
      <span :style="{'color': option.sidebarFontColor || ''}">{{siteInfo.title.value}}</span>
    </div>
    <ul class="buttons">
      <li v-for="menu of option.menus">
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
  export default {
    name: 'sideBar',
    data() {
      return {
        siteInfo: this.$store.getters.siteInfo
      }
    },
    asyncData({store, route: {path, params, query}}) {
      return Promise.all([store.dispatch('FETCH_OPTIONS'), store.dispatch('FETCH_FIREKYLIN')]);
    },
    computed: {
      option() {
        return this.$store.state.theme.option;
      }
    },
    mounted() {
      let img = this.$refs.logo;
      if (img) {
        img.onerror = ({target}) => (img.src = target.currentSrc.replace('.webp', '.png'));
      }
    },
    serverCacheKey: props => {
      return 'static-sidebar'
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
