<template>
  <div id="app">
    <loading-bar :progress="progress"></loading-bar>
    <sidebar></sidebar>
    <my-header></my-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import LoadingBar from './components/Loading';
  import sidebar from './components/Sidebar';
  import myHeader from './components/Header';
  export default {
    name: 'app',
    components: {
      LoadingBar
    },
    computed: {
      progress() {
        return this.$store.state.progress;
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
