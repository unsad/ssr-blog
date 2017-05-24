<template>
  <nav class="pagination">
    <router-link class="prev" :to="{name: 'main', params: {page: prev}}" v-if="typeof prev !== 'undefined'">&laquo;上一页</router-link>
    <router-link class="next" :to="{name: 'main', params: {page: next}}" v-if="typeof prev !== 'undefined'">&raquo;下一页</router-link>
    <div class="center">
      <a href="/archives.html">博客归档</a>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      prev: Number,
      next: Number
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
