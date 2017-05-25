<template>
  <nav id="sidebar">
    <div class="profile">
      <a href="/">这里是logo</a><span>这里是站点标题</span>
    </div>
    <ul class="buttons">
      <li><router-link :to="{name: 'main'}" title="首页"><span>首页</span></router-link></li>
      <li><a href="/archives/" title="归档"><span>归档</span></a></li>
      <li><a href="/tags/" title="标签"></a><span>标签</span></li>
      <li><router-link to="/about" title="关于"><span>关于</span></router-link></li>
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
