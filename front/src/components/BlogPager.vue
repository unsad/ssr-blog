<template>
  <div id="blogpager">
    <sidebar class="sidebar"></sidebar>
    <div id="main">
      
      <section id="page-index">
        <blog-summary class="summary" v-for="item of items" :support-webp="supportWebp" :key="item._id" :article="item">

        </blog-summary>
        <pagination :page='page' :total-page="totalPage"></pagination>
      </section>
      <div class="deco deco-1"></div>
      <div class="deco deco-2"></div>
      <my-footer></my-footer>
    </div>
  </div>
</template>

<script>
  import myFooter from './Footer';
  import blogSummary from './BlogSummary';
  import Sidebar from './Sidebar';
  import pagination from './Pagination';
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
      pagination,
      Sidebar
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

#blogpager
  display: flex
  height: 100vh 
  .sidebar
    width: 30%
  #main
    flex: 1
    margin-left: 10%
    padding: 4rem
    position: relative
    display: flex 
    flex-direction: column
    #page-index
      two-color-border()
      overflow: auto
      height: 100%
      .summary
        border-bottom: 2px solid #fff
        margin: 1rem

.deco
  width: 10rem
  height: 3rem 
  background: #000
  position: absolute 
  right: 1rem
  bottom: 4rem
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
