<template>
  <div id="app">
    <loading-bar :progress="progress"></loading-bar>
    <my-header v-if="false"></my-header>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
  import LoadingBar from './components/Loading';
  import myHeader from './components/Header';
  import { mapGetters } from 'vuex';

  export default {
    name: 'app',
    components: {
      LoadingBar,
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
    background: red
</style>
