<template>
  <nav id="sidebar">
    <div class="profile">
      <a href="/">这里是logo</a><span>这里是站点标题</span>
    </div>
    <ul class="buttons">
      <li><router-link :to="{name: 'main', params: {page: 1}}" title="首页"></router-link>首页</li>
      <li><a href="/archives/"></a></li>
      <li>标签</li>
      <li><router-link to="/about" title="归档">归档</router-link></li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'sideBar'
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
