<template>
  <div id="main">
    <div id="page-post">
      <article class="post detail">
        <div class="meta">
          <div class="date">
            {{article.createdAt}}
          </div>
          <div class="comment">
            <a href="#comments">
              {{article.commentNum}} comments
            </a>
          </div>
        </div>
        <h1 class="title">{{article.title}}</h1>
        <div class="entry-content" v-html="article.content">

        </div>
        <p>--
          <attr title="End of File">EOF</attr>
          --
        </p>
        <div class="post-info">
          <p>发表于
            <time>{{article.createAt}}</time>
            <template v-if="cates.length && tags.length">
              <div>
              ，添加在分类
              <a v-for="cate of cates" :data-cate="cate.name">
                <code class="notebook">{{cate.name}}</code>
              </a>
              </div>
            </template>
            下,
            <template v-if="tags.length !== 0">
              <div>
              ,并被添加[
              <router-link v-for="tag of tags" :key="tag" :to="{name: 'tagPager', params: {tagName: tag.name}}"
                           :data-tag="tag.name"><code class="notebook">{{tag.name}}</code></router-link>
              ]标签下，
              </div>
            </template>
            最后修改于
            <time>{{article.updatedAt}}</time>
          </p>
        </div>
      </article>
      <nav class="pagination">
        <router-link :to="{name: 'post', params: {pathName: prev.pathName}}" v-if="typeof prev.pathName !== 'undefined'"
                     class="prev">&laquo;{{prev.title}}
        </router-link>
        <router-link :to="{name: 'post', params: {pathName: next.pathName}}" v-if="typeof prev.pathName !== 'undefined'"
                     class="next">&raquo;{{next.title}}
        </router-link>
      </nav>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import store from '../store/index';
  import myFooter from './Footer.vue';

  function fetchBlog(store, {path: pathName, params, query}) {
    pathName = pathName.replace(/^\/post\//g, '');
    return store.dispatch('FETCH_BLOG', {
      conditions: {pathName},
      select: {
        title: 1,
        createdAt: 1,
        content: 1,
        updatedAt: 1,
        commentNum: 1
      }
    });
  }

  export default {
    name: 'Post',
    data() {
      return {
        cates: [],
        tags: []
      }
    },
    computed: {
      article() {
        return this.$store.state.blog;
      },
      prev() {
        return this.$store.state.prev;
      },
      next() {
        return this.$store.state.next;
      },
      commentType() {
        return this.$store.state.siteInfo.comment.value.type || 'disqus';
      },
      commentName() {
        return this.$store.state.siteInfo.comment.value.name || '';
      },
      siteURL() {
        return this.$store.state.siteInfo.site_url.value || 'localhost';
      }
    },
    preFetch: fetchBlog,
    beforeMount() {
      if (this.$root._isMounted) {
        fetchBlog(this.$store, this.$store.state.route);
      }
    },
    watch: {
      '$route': 'getPost'
    },
    created() {

    },
    methods: {
      getPost(val, oldVal) {
        if (val.name !== 'post') return;
        fetchBlog(this.$store, this.$store.state.route);
      }
    },
    components: {
      myFooter
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
