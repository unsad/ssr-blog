<template>
  <div id="header">
    <div><i></i></div>
    <h1><a href="/">{{siteInfo.title.value}}</a></h1>
    <a href="/about/"><img :src="siteInfo.logo_url.value" :alt="siteInfo.title.value"></a>
  </div>
  <div id="sidebar-mask"></div>
</template>

<script>
  import store from '../store/index';

  export default {
    name: 'header',
    data() {
      const isInitialRender = !this.$root._isMounted;

      return {
        siteInfo: this.$store.getters.siteInfo
      }
    },
    mounted() {

    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
