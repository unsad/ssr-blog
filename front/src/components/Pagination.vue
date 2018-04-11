<template>
  <nav class="pagination">
    <router-link :to="{ query: {page: parseInt(page) - 1} }" class="prev" v-if="page > 1">&laquo; 上一页</router-link>
    <router-link :to="{ query: {page: parseInt(page) + 1} }" class="next" v-if="page < totalPage">下一页 &raquo;</router-link>
  </nav>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      totalPage: Number,
      page: Number
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
.pagination 
  margin: 1rem
  display: flex 
  justify-content: space-around
  a
    color: #fff
</style>
