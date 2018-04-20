<template>
  <div id="app">
    <loading-bar :progress="progress"></loading-bar>
    <my-header v-if="false"></my-header>
      <music-player 
        theme="rgb(0, 0, 0)"
        mode="circulation"
        autoplay
        :music="music[0]"
        :list="music"
      />
    <router-view class="switch-content"></router-view>
    <div class="page-move" :class="{'page-access': progress !== 100 && tran}"></div>
  </div>
</template>

<script>
  import LoadingBar from './components/Loading';
  import musicPlayer from './components/musicplayer/MusicPlayer';
  import myHeader from './components/Header';
  import { mapGetters } from 'vuex';

  function fetchInfo({store, route: {path, params, query}}) {
    return Promise.all([store.dispatch('FETCH_OPTIONS'), store.dispatch('FETCH_FIREKYLIN'), store.dispatch('FETCH_MUSIC', {
      model: 'music'
    })]);
  }

  import mixin from './mixin/image';

  export default {
    name: 'app',
    asyncData: fetchInfo,
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
          { rel: 'apple-touch-icon', href: logoUrl },
          { rel: 'alternate', type: 'application/rss+xml', title: 'RSS 2.0', href: '/rss.xml' }
        ]
      };
    },
    mixins: [mixin],
    components: {
      LoadingBar,
      myHeader,
      musicPlayer
    },
    computed: {
      ...mapGetters([
        'progress',
        'tran',
        'music'
      ])
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/css/index.styl';

  #app
    background: red
    .switch-content 
      min-height: 100vh

  .page-move
    position: fixed 
    left: 0 
    top: 0 
    bottom: 0 
    right: 0
    z-index: -1
    transition: z-index ease .5s
    &.page-access 
      z-index: 2
    &.page-access::before
      width: 0
      height: 0
      border-width: 0
    &.page-access::after
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
