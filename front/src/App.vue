<template>
  <div id="app">
    <loading-bar :progress="progress"></loading-bar>
    <sidebar></sidebar>
    <my-header></my-header>
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

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
