<template>
  <div id="tagpager">
    <section id="tag-index">
      <h1 class="intro">标签<a href="javascript: void(0)">{{$route.params.tagName}}</a>下的文章</h1>
      <blog-summary class="tag-summary" v-for="item of tagPager" :key="item.pathname" :article="item" :support-webp="supportWebp"></blog-summary>
      <pagination :page="1" :total-page="1"></pagination>
    </section>
    <back></back>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import store from '../store/index';
  import myFooter from './Footer.vue';
  import blogSummary from './BlogSummary.vue';
  import pagination from './Pagination.vue';
  import back from './Back.vue';

  function getItems({store, route: {path, query, params}}, callback) {
    return store.dispatch('FETCH_TAG_PAGER', {
      model: 'post',
      query: {
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
        sort: {
          updatedAt: -1
        }
      },
      callback
    });
  }

  export default {
    name: 'tagPager',
    components: {
      myFooter,
      blogSummary,
      pagination,
      back
    },
    metaInfo() {
      return {
        title: `标签${this.$route.params.tagName}下的文章`
      };
    },
    computed: {
      ...mapGetters([
        'tagPager',
        'page',
        'totalPage',
        'supportWebp'
      ])
    },
    asyncData(context) {
      return getItems(context);
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
#tagpager
  background: linear-gradient(60deg, transparent 62%, red 0),
              linear-gradient(40deg, transparent 18%, #000 0)
  min-height: 100vh
  display: flex 
  flex-direction: column
  #tag-index
    h1 
      color: #fff
    flex-grow: 1
    padding: 0 1rem
    overflow: hidden
    .tag-summary
      color: #fff
</style>
