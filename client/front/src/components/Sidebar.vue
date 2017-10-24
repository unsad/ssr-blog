<template>
  <nav id="sidebar">
    <div class="profile">
      <a href="/">
        <img :src="siteInfo.logoUrl.value" :alt="siteInfo.title.value" ref="logo">
      </a>
      <span>{{siteInfo.title.value}}</span>
    </div>
    <ul class="buttons">
      <li v-for="menu of menus">
        <router-link :to="{path: menu.url}" :title="menu.label">
          <span>{{menu.label}}</span>
        </router-link>
      </li>
    </ul>
    <ul class="buttons">
      <li>
        <a :href="'https://github.com' + siteInfo.githubUrl.value" target="_blank" class="inline">
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
        siteInfo: this.$store.getters.siteInfo,
        menus: this.$store.getters.menu
      }
    },
    asyncData({store, route: {path, params, query}}) {
      return Promise.all([store.dispatch('FETCH_OPTIONS'), store.dispatch('FETCH_MENU')]);
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
