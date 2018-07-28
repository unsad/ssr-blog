<template>
  <blog-post type="post" :post="post" :prev="prev" :next="next" :site-info="siteInfo"></blog-post>
</template>

<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';
  import mock404 from '@/utils/404';
  import blogPost from '@/components/post';

  function fetchBlog({ store, route: { path: pathName, params, query }}, callback?) {
    pathName = pathName.replace(/^\/post\//g, '');
    return store.dispatch('FETCH_BLOG', {
      model: 'post',
      query: {
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
      }
    });
  }

  @Component({
    metaInfo() {
      return {
        title: this.post.title
      };
    },
    components: {
      blogPost
    },
    asyncData(context) {
      return fetchBlog(context);
    }
  })
  export default class PostContainer extends Vue {
    @Getter prev
    @Getter next
    @Getter siteInfo

    get post() {
      return this.$store.state.blog.pathName
        ? this.$store.state.blog
        : mock404;
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
