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

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import myMixin from '../mixin/image';

  export default class MyHeader extends mixins(myMixin) {

  };
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
