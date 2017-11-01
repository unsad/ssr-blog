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
  import LoadingBar from './components/Loading';
  export default {
    name: 'app',
    components: {
      LoadingBar
    },
    methods: {
      onProgressDone() {

      }
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
