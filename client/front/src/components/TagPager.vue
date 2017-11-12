<template>
  <div id="main">
    <section id="page-index">
      <h1 class="intro">标签<a href="javascript: void(0)">{{$route.params.tagName}}</a>下的文章</h1>
      <blog-summary v-for="item of tagPager" :key="item" :article="item"></blog-summary>
      <pagination :page="1" :total-page="1"></pagination>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import store from '../store/index';
  import myFooter from './Footer.vue';
  import blogSummary from './BlogSummary.vue';
  import pagination from './Pagination.vue';

  function getItems({store, route: {path, query, params}}, callback) {
    return store.dispatch('FETCH_TAG_PAGER', {
      conditions: {
        tags: params.tagName,
        type: 'post',
        isPublic: true
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

  export default {
    name: 'tagPager',
    components: {
      myFooter,
      blogSummary,
      pagination
    },
    metaInfo() {
      return {
        title: `标签${this.$route.params.tagName}下的文章`
      }
    },
    computed: {
      ...mapGetters([
        'tagPager',
        'page',
        'totalPage'
      ])
    },
    asyncData(context) {
      return getItems(context);
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
