<template>
  <nav id="sidebar">
    <div class="profile">
      <a href="/">
        <img :src="siteInfo.logo_url.value" :alt="siteInfo.title.value">
      </a>
      <span>{{siteInfo.title.value}}</span>
    </div>
    <ul class="buttons">
      <li><router-link :to="{name: 'main'}" title="首页"><span>首页</span></router-link></li>
      <li><router-link :to="{name: 'archives'}" title="归档"><span>归档</span></router-link></li>
      <li><router-link :to="{name: 'tag'}" title="标签"><span>标签</span></router-link></li>
      <li><router-link :to="{name: 'about'}" title="关于"><span>关于</span></router-link></li>
    </ul>
    <ul class="buttons">
      <li>
        <a :href="siteInfo.github_url.value" target="_blank" class="inline">
          <i title="GitHub"></i>
        </a>
      </li>
      <li>
        <a href="/rss.html" target="_blank" class="inline">
          <i title="RSS"></i>
        </a>
      </li>
      <li>
        <a href="/search.html" target="_blank" class="inline">
          <i title="Search"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import store from '../store/index';

  export default {
    name: 'sideBar',
    data() {
      const isInitialRender = !this.$root._isMounted;
      return {
        siteInfo: this.$store.getters.siteInfo
      }
    },
    preFetch(store, {path, params, query}) {
      return store.dispatch('FETCH_OPTIONS');
    },
    beforeMount() {
      if (typeof this.siteInfo.title === 'undefined') {
        this.$store.dispatch('FETCH_OPTIONS').then(() => {
          if (this.siteInfo['title'] && typeof document !== 'undefined') {
            document.title = this.siteInfo['title'].value;
          }
        });
      } else {
        document.title = this.siteInfo['title'].value || 'Blog';
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
