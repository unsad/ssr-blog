<template>
  <nav :class="pagination.container">
    <router-link :to="{ query: {page: parseInt(page) - 1} }" class="prev" v-if="page > 1">&laquo; 上一页</router-link>
    <router-link :to="{ query: {page: parseInt(page) + 1} }" class="next" v-if="page < totalPage">下一页 &raquo;</router-link>
  </nav>
</template>

<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

  @Component
  export default class Pagination extends Vue {
    @Prop()
    totalPage: number

    @Prop()
    page: number
  };
</script>
<style module="pagination" lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl'

 .container
    display: flex 
    align-items: center 
    justify-content: space-between
  a
    color: $main-third-color

@media only screen and (max-width : 768px)
  .container
    a
      max-width: 30%
      no-wrap()
</style>
