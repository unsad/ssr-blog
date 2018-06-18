<template>
  <div id="app" :class="app.container">
    <loading-bar :progress="progress"></loading-bar>
    <my-header v-if="false"></my-header>
      <music-player 
        theme="rgb(0, 0, 0)"
        mode="circulation"
        :music="music[0]"
        :list="music"
      />
    <router-view :class="app.appContent"></router-view>
    <div :class="{[app.pageAccess]: progress !== 100 && tran, [app.pageTrans]: true}"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import {
    Getter
  } from 'vuex-class';

  import LoadingBar from '@/components/Loading';
  import musicPlayer from '@/components/musicplayer/MusicPlayer';
  import myHeader from '@/components/Header';
  import { mapGetters } from 'vuex';
  import './assets/css/index.styl';

  import myMixin from './mixin/image';

  @Component({
    asyncData({store, route: {path, params, query}}) {
      return Promise.all([store.dispatch('FETCH_OPTIONS'), store.dispatch('FETCH_FIREKYLIN'), store.dispatch('FETCH_MUSIC', {
        model: 'music'
      })]);
    },
    components: {
      LoadingBar,
      myHeader,
      musicPlayer
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
        title: title,
        titleTemplate: `%s - ${title}`,
        meta: [
          { name: 'charset', content: 'UTF-8' },
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
          { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
        ],
        link: [
          { rel: 'icon', href: favicon },
          { rel: 'apple-touch-icon', href: logoUrl },
          { rel: 'alternate', type: 'application/rss+xml', title: 'RSS 2.0', href: '/rss.xml' }
        ]
      };
    }
  })
  export default class App extends mixins(myMixin) {
    @Getter progress
    @Getter tran
    @Getter music
  };
</script>
<style lang="stylus" module="app" rel="stylesheet/stylus">
  .container
    background: $main-color
    .appContent 
      min-height: 100vh

  .pageTrans
    position: fixed 
    left: 0 
    top: 0 
    bottom: 0 
    right: 0
    z-index: -1
    transition: z-index ease .5s
    &.pageAccess
      z-index: 2
    &.pageAccess::before
      width: 0
      height: 0
      border-width: 0
    &.pageAccess::after
      border-width: 1500px
    &::before 
      content: ''
      box-sizing: border-box
      display: block
      position: absolute 
      border: 50px solid #000
      border-radius: 50%
      width: 3200px 
      height: 3200px
      left: 50% 
      top: 50%
      transform: translate(-50%, -50%)
      transition: width .37s ease, height .37s ease, border-width .1s ease .3s
    &::after 
      content: ''
      box-sizing: border-box
      display: block
      position: absolute 
      border: 0 solid #000
      border-radius: 50%
      width: 3000px 
      height: 3000px
      left: 50% 
      top: 50%
      transform: translate(-50%, -50%)
      transition: border-width .43s ease .05s
</style>
