<template>
  <div :class="blogPager.container">
    <sidebar :class="blogPager.sidebar"></sidebar>
    <div :class="blogPager.main"> 
      <section :class="blogPager.pageIndex">
        <blog-summary :class="blogPager.summary" v-for="item of items" :support-webp="supportWebp" :key="item._id" :article="item">

        </blog-summary>
        <pagination :page='page' :total-page="totalPage" :class="blogPager.blogpagerPagi"></pagination>
      </section>
      <div :class="[blogPager.deco, blogPager.deco1]"></div>
      <div :class="[blogPager.deco, blogPager.deco2]"></div>
      <my-footer></my-footer>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';
  import myFooter from './Footer.vue';
  import blogSummary from './BlogSummary.vue';
  import Sidebar from './Sidebar.vue';
  import pagination from './Pagination.vue';

  @Component({
    asyncData({store, route: {path, query, params}}, callback) {
      if (path !== '/') return Promise.resolve();
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
    components: {
      myFooter,
      blogSummary,
      pagination,
      Sidebar
    }
  })
  export default class BlogPager extends Vue {
    @Getter items
    @Getter page
    @Getter totalPage
    @Getter siteInfo
    @Getter supportWebp
  }
</script>
<style module="blogPager" lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

@media only screen and (max-width : 768px) 
  .container
    background: linear-gradient(-50deg, transparent 82%, $main-color 0),
                linear-gradient(-30deg, transparent 18%, $main-second-color 0)
    .main
      position: relative
      display: flex 
      flex-direction: column
      flex-grow: 1
      min-width: 0
      .pageIndex
        color: $main-third-color
        border: none
        .summary
          border-bottom: 2px solid $main-third-color
          margin: $space-middle
        .blogpagerPagi
          margin: $space-middle
@media only screen and (min-width : 769px) 
  .container
    display: flex
    overflow: hidden
    height: 100vh 
    background: linear-gradient(-40deg, transparent 52%, $main-color 0),
                linear-gradient(-30deg, transparent 28%, $main-second-color 0)
    .sidebar
      min-width: 30%
    .main
      padding: 4rem 5% 0 10%
      position: relative
      display: flex 
      height: 100%
      flex-direction: column
      flex-grow: 1
      min-width: 0
      .pageIndex
        two-color-border()
        overflow: auto
        height: 100%
        .summary
          border-bottom: 2px solid $main-third-color
          margin: $space-middle
        .blogpagerPagi
          margin: $space-middle

  .deco
    width: 10rem
    height: 3rem 
    background: $main-second-color
    position: absolute 
    right: 0
    bottom: 10rem
    clip-path: polygon(0 45%, 100% 19%, 100% 85%, 0 73%)
    &::before 
      content: ''
      position: absolute
      top: 0 
      left: 0 
      right: 0
      bottom: 0
      background: $main-third-color
      clip-path: polygon(2% 50%, 98% 24%, 98% 80%, 2% 68%)
  .deco2 
    transform: rotate(-20deg) translate(10%, -70%)
  .deco1 
    transform: rotate(30deg) translate(0, 80%) scaleX(0.7)
</style>
