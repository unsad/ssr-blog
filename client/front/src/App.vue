<template>
  <div id="app">
    <loading-bar :on-progress-done="onProgressDone" :progress="progress"></loading-bar>
    <keep-alive>
      <router-view name="sidebar"></router-view>
    </keep-alive>
    <keep-alive>
      <router-view name="header"></router-view>
    </keep-alive>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import sidebar from './components/Sidebar';
  import myHeader from './components/Header';
  import LoadingBar from './components/Loading';
  export default {
    name: 'app',
    components: {
      sidebar,
      myHeader,
      LoadingBar
    },
    methods: {
      onProgressDone() {

      }
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
