<template>
  <div>
    <div id="header" :style="{'background-image': sidebarUrl ? 'url(' + sidebarUrl + ')' : ''}">
      <div><i></i></div>
      <h1><a href="/" :style="{'color': option ? option.sidebarFontColor || '' : ''}">{{siteInfo.title.value}}</a></h1>
      <a href="/about"><img :src="logoUrl" :alt="siteInfo.title.value"></a>
    </div>
    <div id="sidebar-mask"></div>
  </div>
</template>

<script>
  import mixin from '../mixin/image';

  export default {
    name: 'myHeader',
    mixins: [mixin]
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
