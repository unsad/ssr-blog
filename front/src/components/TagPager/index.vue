<template>
  <div :class="tagPagerCss.container">
    <section :class="tagPagerCss.index">
      <h1 class="intro">标签<a href="javascript: void(0)">{{$route.params.tagName}}</a>下的文章</h1>
      <blog-summary :class="tagPagerCss.summary" v-for="item of tagPager" :key="item.pathname" :article="item" :support-webp="supportWebp"></blog-summary>
      <pagination :page="1" :total-page="1"></pagination>
    </section>
    <back></back>
    <my-footer></my-footer>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';
  import store from '../store/index';
  import myFooter from '@/components/Footer';
  import blogSummary from '@/components/BlogSummary';
  import pagination from '@/components/Pagination';
  import back from '@/compnents/Back';

  function getItems({ store, route: { path, query, params }}, callback?) {
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

  @Component({
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
    asyncData(context) {
      return getItems(context);
    }
  })
  export default class TagPager extends Vue {
    @Getter tagPager
    @Getter page
    @Getter supportWebp
  }
</script>
<style lang="stylus" module="tagPagerCss" rel="stylesheet/stylus">
.container
  background: linear-gradient(60deg, transparent 62%, $main-color 0),
              linear-gradient(40deg, transparent 18%, $main-second-color 0)
  min-height: 100vh
  display: flex 
  flex-direction: column
  .index
    h1 
      color: $main-third-color
    flex-grow: 1
    padding: 0 $space-middle
    overflow: hidden
    .summary
      color: $main-third-color
</style>
