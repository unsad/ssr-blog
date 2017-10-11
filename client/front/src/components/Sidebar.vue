<template>
  <nav id="sidebar">
    <div class="profile">
      <a href="/">
        <img :src="siteInfo.logo_url.value" :alt="siteInfo.title.value" ref="logo">
      </a>
      <span>{{siteInfo.title.value}}</span>
    </div>
    <ul class="buttons">
      <li v-for="menu of siteInfo.menu.value">
        <router-link :to="{path: menu.url}" :title="menu.label">
          <span>{{menu.label}}</span>
        </router-link>
      </li>
    </ul>
    <ul class="buttons">
      <li>
        <a :href="siteInfo.github_url.value" target="_blank" class="inline">
          <i title="GitHub"></i>
        </a>
      </li>
      <li>
        <a href="/rss.xml" target="_blank" class="inline">
          <i title="RSS"></i>
        </a>
      </li>
      <li>
        <a href="/search" target="_blank" class="inline">
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
      return store.dispatch('FETCH_OPTIONS');
    },
    beforeMount() {
      if (typeof this.siteInfo.title === 'undefined') {
        if (this.siteInfo['title'] && typeof document !== 'undefined') {
          document.title = this.siteInfo['title'].value;
        }
      } else {
        document.title = this.siteInfo['title'].value || 'Blog';
      }
    },
    mounted() {
      let img = this.$refs.logo;
      img.onerror = ({target}) => (img.src = target.currentSrc.replace('.webp', '.png'));
    },
    serverCacheKey: props => {
      return 'static-sidebar'
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
