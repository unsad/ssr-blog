<template>
  <blog-post type="page" :post="page" :siteInfo="siteInfo"></blog-post>
</template>
<script>
  import { mapGetters } from 'vuex';
  import blogPost from './Post';
  import mock404 from '../utils/404';

  function fetchPage({store, route: {path: pathName, params, query}}, callback) {
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

  export default {
    name: 'pageContainer',
    asyncData(context) {
      return fetchPage(context);
    },
    metaInfo() {
      return {
        title: this.page.title
      }
    },
    computed: {
      ...mapGetters([
        'siteInfo'
      ])
    },
    components: {
      pager,
      blogPost
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
