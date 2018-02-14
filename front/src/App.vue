<template>
  <div id="app">
    <loading-bar :progress="progress"></loading-bar>
    <sidebar class="sidebar"></sidebar>
    <my-header v-if="false"></my-header>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
  import LoadingBar from './components/Loading';
  import Sidebar from './components/Sidebar';
  import myHeader from './components/Header';
  import { mapGetters } from 'vuex';

  export default {
    name: 'app',
    components: {
      LoadingBar,
      Sidebar,
      myHeader
    },
    computed: {
      ...mapGetters([
        'progress'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/css/index.styl';

  #app
    font-family: 'special-for-me' 
    background: red
    display: flex
    height: 100vh
    .sidebar
      width: 25%
    .content
      flex: 1
</style>
