<template>
  <div id="main">
    <section id="page-index">
      <blog-summary class="summary" v-for="item of items" :support-webp="supportWebp" :key="item._id" :article="item">

      </blog-summary>
      <pagination :page='page' :total-page="totalPage"></pagination>
      <div class="deco deco-1"></div>
      <div class="deco deco-2"></div>
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
  outline: 0.2rem solid #000
  .summary
    border-bottom: 2px solid #fff
    margin: 1rem

.deco
  width: 10rem
  height: 3rem 
  background: #000
  position: absolute 
  right: 1rem
  clip-path: polygon(0 45%, 100% 19%, 100% 85%, 0 73%);
  &::before 
    content: ''
    position: absolute
    top: 0 
    left: 0 
    right: 0
    bottom: 0
    background: #fff
    clip-path: polygon(2% 50%, 98% 24%, 98% 80%, 2% 68%);
.deco-2 
  transform: rotate(-20deg) translate(10%, -70%)
.deco-1 
  transform: rotate(30deg) translate(0, 80%) scaleX(0.7)
</style>
