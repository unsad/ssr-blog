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

        <template v-if="shouldShow">
          <p>本文链接：<a :href="siteURL+ '/post/'+ article.pathName">{{siteURL}}/post/{{article.pathName}}</a></p>
          <p>--
            <attr title="End of File">EOF</attr>
            --
          </p>
          <div class="post-info">
            <p>发表于
              <time>{{article.createAt}}</time>
                ,添加在分类
                <a :data-cate="article.category">
                  <code class="notebook">{{article.category}}</code>
                </a>下,并被添加
                <router-link v-for="tag of article.tags" :key="tag" :to="{name: 'tagPager', params: {tagName: tag}}"
                             :data-tag="tag"><code class="notebook">{{tag}}</code>
                ]标签，
                </router-link>
              最后修改于
              <time>{{article.updatedAt}}</time>
            </p>
          </div>
        </template>
      </article>
      <template v-if="shouldShow">
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
      </template>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myFooter from './Footer.vue';
  import disqus from './Disqus.vue';

  export default {
    name: 'Post',
    props: ['post', 'prev', 'next', 'siteInfo'],
    serverCacheKey: props => {
      return `${props.post.pathName}::${props.post.updateAt}`
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
      shouldShow() {
        return this.post.pathName !== 404;
      },
      article() {
        return this.post;
      },
      commentName() {
        return this.siteInfo.commentName.value || '';
      },
      siteURL() {
        return this.siteInfo.siteUrl.value || 'localhost';
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
