<template>
  <blog-post type="page" :post="page" :siteInfo="siteInfo"></blog-post>
</template>
<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';
  import blogPost from '@/components/Post.vue';
  import mock404 from '../utils/404';

  function fetchPage({ store, route: { path: pathName, params, query }}, callback?) {
    pathName = pathName.replace(/^\//g, '');
    return store.dispatch('FETCH_PAGE', {
      conditions: {
        pathName,
        type: 'page',
        isPublic: true
      },
      select: {
        _id: 0,
        title: 1,
        createdAt: 1,
        content: 1,
        toc: 1,
        updatedAt: 1,
        pathName: 1,
        allowComment: 1
      },
      callback
    });
  }

  @Component({
    asyncData(context) {
      return fetchPage(context);
    },
    components: {
      blogPost
    }
  })
  export default class PageContainer extends Vue {
    @Getter siteInfo
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
