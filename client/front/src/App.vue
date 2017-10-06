<template>
  <div id="app">
    <sidebar></sidebar>
    <header></header>
    <router-view></router-view>
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
