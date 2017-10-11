<template>
  <div class="dashboard">
    <top></top>
    <sidebar></sidebar>
  </div>
</template>

<script>
  import Api from '../store/api'
  import Sidebar from './Sidebar'
  import Top from './Top'

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
