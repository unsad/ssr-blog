<template>
  <div id="app">
    <loading-bar :progress="progress"></loading-bar>
    <sidebar></sidebar>
    <my-header v-if="false"></my-header>
    <router-view></router-view>
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
  html 
    font-size: 12px
  ul
    list-style-type: none 
  a
    text-decoration: none
  #app
    background: red
    display: flex
    height: 100vh
</style>
