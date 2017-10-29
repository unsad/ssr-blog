<template>
  <div id="main">
    <div id="page-post">
      <article class="post detail">
        <div class="meta">
          <div class="date">
            {{article.createdAt}}
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
            <template v-if="article.category">
              <div>
              ，添加在分类
              <a :data-cate="article.category">
                <code class="notebook">{{article.category}}</code>
              </a>
              </div>
            </template>
            <template v-if="article.category">
              下,
            </template>
            <template v-if="article.tags && article.tags.length !== 0">
              <div>
              ,并被添加[
              <router-link v-for="tag of article.tags" :key="tag" :to="{name: 'tagPager', params: {tagName: tag}}"
                           :data-tag="tag"><code class="notebook">{{tag}}</code></router-link>
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
      <div class="comments" v-if="article.allowComment === true && commentName!== ''">
        <disqus :shortname="commentName"></disqus>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myFooter from './Footer.vue';
  import disqus from './Disqus.vue';

  export default {
    name: 'Post',
    data() {
      return {

      }
    },
    asyncData({store, route: {path: pathName, params, query}}, callback) {
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
          updatedAt: 1,
          pathName: 1,
          category: 1,
          allowComment: 1,
          tags: 1
        },
        callback
      });
    },
    watch: {
      '$route': 'resetDisqus'
    },
    methods: {
      reset(dsq) {
        const self = this;
        dsq.reset({
          reload: true,
          config: function() {
            this.page.identifier = (self.$route.path || window.location.pathname);
            this.page.url = window.location.href;
          }
        });
      },
      resetDisqus(val, oldVal) {
        if (val.name !== 'post') return;
        if (window.DISQUS) {
          this.reset(window.DISQUS);
        }
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
        return this.$store.state.siteInfo.commentType || 'disqus';
      },
      commentName() {
        return this.$store.state.siteInfo.commentName || '';
      },
      siteURL() {
        return this.$store.state.siteInfo.siteUrl.value || 'localhost';
      }
    },
    components: {
      myFooter,
      disqus
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
