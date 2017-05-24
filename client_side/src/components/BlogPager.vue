<template>
  <div id="main">
    <section id="page-index">
        <blog-summary v-for="item of items" :article="item">

        </blog-summary>
        <pagination :next=2 :prev=1></pagination>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import store from '../store/index';
  import myFooter from './Footer.vue';
  import blogSummary from './BlogSummary.vue';
  import pagination from './Pagination.vue'

  export default {
    name: 'blogPager',
    data() {
      return {
        items: store.fetchBlogByPage(this, 0).then(items => this.items = items)
      }
    },
    components: {
      myFooter,
      blogSummary,
      pagination
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
