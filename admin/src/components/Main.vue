<template>
  <div class="dashboard">
    <top></top>
    <sidebar></sidebar>
    <div class="main">
      <router-view :key="$route.params.id || -1"></router-view>
    </div>
  </div>
</template>

<script>
  import sidebar from './pages/Sidebar'
  import top from './pages/Top'

  export default {
    name: 'dashboard',
    data() {
      return {
        title: ''
      }
    },
    components: {
      sidebar,
      top
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
