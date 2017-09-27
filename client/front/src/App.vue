<template>
  <div id="app">
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
  import sidebar from './components/Sidebar.vue';
  import header from './components/Header.vue';
  export default {
    name: 'app',
    components: {
      sidebar,
      header
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
