<template>
  <blog-post :post="post" :prev="prev" :next="next" :site-info="siteInfo"></blog-post>
</template>

<script>
  import mock404 from '../utils/404';
  import blogPost from './Post';
  import { mapGetters } from 'vuex';

  function fetchBlog ({store, route: {path: pathName, params, query}}, callback) {
    pathName = pathName.replace(/^\/post\//g, '');
    return store.dispatch('FETCH_BLOG', {
      conditions: {
        pathName,
        isPublic: true,
        type: 'post'
      },
      select: {
        title: 1,
        createdAt: 1,
        content: 1,
        toc: 1,
        updatedAt: 1,
        pathName: 1,
        category: 1,
        allowComment: 1,
        tags: 1
      },
      callback
    })
  }
  export default {
    computed: {
      post () {
        return this.$store.state.blog.pathName
          ? this.$store.state.blog
          : mock404
      },
      ...mapGetters([
        'prev',
        'next',
        'siteInfo'
      ])
    },
    asyncData(context) {
      return fetchBlog(context);
    },
    components: {
      blogPost
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
