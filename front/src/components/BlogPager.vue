<template>
  <div :id="$style.blogpager">
    <sidebar :class="$style.sidebar"></sidebar>
    <div :id="$style.main"> 
      <section :id="$style.pageIndex">
        <blog-summary :class="$style.summary" v-for="item of items" :support-webp="supportWebp" :key="item._id" :article="item">

        </blog-summary>
        <pagination :page='page' :total-page="totalPage" :class="$style.blogpagerPagi"></pagination>
      </section>
      <div :class="[$style.deco, $style.deco1]"></div>
      <div :class="[$style.deco, $style.deco2]"></div>
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
      };
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
    created() {
      console.log(this.$style);
    },
    components: {
      myFooter,
      blogSummary,
      pagination,
      Sidebar
    }
  };
</script>
<style module lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

@media only screen and (max-width : 768px) 
  #blogpager
    background: linear-gradient(-50deg, transparent 82%, red 0),
                linear-gradient(-30deg, transparent 18%, #000 0)
    #main
      position: relative
      display: flex 
      flex-direction: column
      flex-grow: 1
      min-width: 0
      #pageIndex
        color: #fff
        border: none
        .summary
          border-bottom: 2px solid #fff
          margin: 1rem
        .blogpagerPagi
          margin: 1rem
@media only screen and (min-width : 769px) 
  #blogpager
    display: flex
    overflow: hidden
    height: 100vh 
    background: linear-gradient(-40deg, transparent 52%, red 0),
                linear-gradient(-30deg, transparent 28%, #000 0)
    .sidebar
      min-width: 30%
    #main
      padding: 4rem 5% 0 10%
      position: relative
      display: flex 
      height: 100%
      flex-direction: column
      flex-grow: 1
      min-width: 0
      #pageIndex
        two-color-border()
        overflow: auto
        height: 100%
        .summary
          border-bottom: 2px solid #fff
          margin: 1rem
        .blogpagerPagi
          margin: 1rem

  .deco
    width: 10rem
    height: 3rem 
    background: #000
    position: absolute 
    right: 0
    bottom: 10rem
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
  .deco2 
    transform: rotate(-20deg) translate(10%, -70%)
  .deco1 
    transform: rotate(30deg) translate(0, 80%) scaleX(0.7)
</style>
