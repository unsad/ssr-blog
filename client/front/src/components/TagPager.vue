<template>
  <div id="main">
    <section id="page-index">
      <h1 class="intro">标签<a href="javascript: void(0)">{{$route.params.tagName}}</a>下的文章</h1>
      <blog-summary v-for="item of items" :key="item" :article="item"></blog-summary>
      <pagination :page="page" :total-page="totalPage"></pagination>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
  function getItems({store, route: {path, query, params}}, callback) {
    return store.dispatch('FETCH_TAG_PAGER', {
      conditions: {
        tags: params.tagName
      },
      select: {
        _id: 0,
        tags: 1,
        title: 1,
        summary: 1,
        createdAt: 1,
        updatedAt: 1,
        pathName: 1
      },
      sort: 1,
      callback
    });
  }

  import store from '../store/index';
  import myFooter from './Footer.vue';
  import blogSummary from './BlogSummary.vue';
  import pagination from './Pagination.vue';

  export default {
    name: 'tagPager',
    components: {
      myFooter,
      blogSummary,
      pagination
    },
    data() {
      return {
        page: 1,
        totalPage: 1
      }
    },
    computed: {
      items() {
        return this.$store.state.tagPager;
      }
    },
    asyncData(context) {
      return getItems(context);
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
