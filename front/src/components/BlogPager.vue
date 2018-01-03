<template>
  <div id="main">
    <section id="page-index">
      <blog-summary class="summary" v-for="item of items" :support-webp="supportWebp" :key="item._id" :article="item">

      </blog-summary>
      <pagination :page='page' :total-page="totalPage"></pagination>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myFooter from './Footer.vue';
  import blogSummary from './BlogSummary.vue';
  import pagination from './Pagination.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'blogPager',
    asyncData({store, route: {path, query, params}}, callback) {
      if (path !== '/') return resolve();
      let page = query ? (typeof query.page !== 'undefined') ? parseInt(query.page) : 1 : 1;
      if (page < 0) {
        page = 1;
      }
      return store.dispatch('FETCH_ITEMS', {
        model: 'post',
        query: {
          conditions: {
            type: 'post',
            isPublic: true
          },
          select: {
            _id: 0,
            title: 1,
            summary: 1,
            createdAt: 1,
            updatedAt: 1,
            pathName: 1
          },
          limit: 10,
          skip: (page - 1) * 10,
          sort: {
            createdAt: -1
          }
        },
        callback
      });
    },
    metaInfo() {
      return {
        title: '首页'
      }
    },
    computed: {
      ...mapGetters([
        'items',
        'page',
        'totalPage',
        'siteInfo',
        'supportWebp'
      ])
    },
    components: {
      myFooter,
      blogSummary,
      pagination
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
#page-index
  color: #fff
  background: #000 
  margin: 4rem
  border: 1rem solid #fff
  .summary
    border-bottom: 1px solid red
</style>
