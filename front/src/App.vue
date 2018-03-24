<template>
  <div id="app">
    <loading-bar :progress="progress"></loading-bar>
    <my-header v-if="false"></my-header>
    <music-player 
      theme="rgb(0, 0, 0)"
      mode="circulation"
      :music="{
        title: '雪月花',
        author: '小仓唯',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.mp3',
        lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.lrc'
      }"
    />
    <router-view class="switch-content"></router-view>
    <div class="page-move" :class="{'page-access': progress !== 100}"></div>
  </div>
</template>

<script>
  import LoadingBar from './components/Loading';
  import musicPlayer from './components/musicplayer/MusicPlayer';
  import myHeader from './components/Header';
  import { mapGetters } from 'vuex';

  export default {
    name: 'app',
    components: {
      LoadingBar,
      myHeader,
      musicPlayer
    },
    computed: {
      ...mapGetters([
        'progress'
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
