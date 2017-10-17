<template>
  <div class="dashboard">
    <top></top>
    <sidebar></sidebar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Api from '../store/api'
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
