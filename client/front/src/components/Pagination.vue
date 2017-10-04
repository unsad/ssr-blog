<template>
  <nav class="pagination">
    <router-link :to="{ query: page - 1}" class="prev" v-if="page > 1">&laquo;上一页</router-link>
    <router-link :to="{ query: page + 1}" class="next" v-if="page < totalPage">&raquo;下一页</router-link>
    <div class="center">
      <router-link :to="{name: 'archive'}">博客归档</router-link>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      totalPage: Number,
      page: Number
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
