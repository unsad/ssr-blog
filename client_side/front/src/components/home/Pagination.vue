<template>
  <nav class="pagination">
    <a class="prev" href="javascript: void(0)" v-if="page > 1" @click="prev()">&laquo;上一页</a>
    <a class="next" href="javascript: void(0)"  v-if="page < totalPage" @click="next()">&raquo;下一页</a>
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
    },
    methods: {
      prev() {
        this.page--;
      },
      next() {
        this.page++;
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
