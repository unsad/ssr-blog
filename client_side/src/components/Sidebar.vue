<template>
  <nav id="sidebar">
    <div class="profile">
      <a href="/">这里是logo</a><span>这里是站点标题</span>
    </div>
    <ul class="buttons">
      <li>首页</li>
      <li>归档</li>
      <li>标签</li>
      <li><router-link to="/about">关于</router-link></li>
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
