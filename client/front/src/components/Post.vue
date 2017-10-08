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
      <div class="comments" v-if="commentName!== ''">
        <disqus :shortname="commentName"></disqus>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import store from '../store/index';
  import myFooter from './Footer.vue';
  import disqus from './Disqus.vue';

  export default {
    name: 'Post',
    data() {
      return {
        cates: [],
        tags: []
      }
    },
    asyncData({store, route: {path: pathName, params, query}}) {
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
        return JSON.parse(this.$store.state.siteInfo.comment.value).type || 'disqus';
      },
      commentName() {
        return JSON.parse(this.$store.state.siteInfo.comment.value).name || '';
      },
      siteURL() {
        return this.$store.state.siteInfo.site_url.value || 'localhost';
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
