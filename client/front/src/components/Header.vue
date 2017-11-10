<template>
  <div>
    <div id="header" :style="{'background-image': option.sidebarImageUrl ? 'url(' + option.sidebarImageUrl + ')' : ''}">
      <div><i></i></div>
      <h1><a href="/" :style="{'color': option.sidebarFontColor || ''}">{{siteInfo.title.value}}</a></h1>
      <a href="/about"><img :src="option.logoUrl" :alt="siteInfo.title.value"></a>
    </div>
    <div id="sidebar-mask"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'header',
    computed: {
      ...mapGetters([
        'siteInfo',
        'option'
      ])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
