<template>
  <div id="post">
    <div id="page-post">
      <div class="post-main">
        <article class="post-detail">
          <div class="meta">
            <div class="date">
              {{post.createdAt}}
            </div>
          </div>
          <h1 class="title">{{post.title}}</h1>
          <div class="entry-content" v-html="content">
          </div>

          <template v-if="shouldShow">
            <p>--
              <dfn title="End of File">EOF</dfn>
              --
            </p>
            <div class="post-info">
              <p>发表于
                <time>{{post.createAt}}</time>
                ,添加在分类「
                <a :data-cate="post.category">
                  <code class="notebook">{{post.category}}</code>
                </a>」下,并被添加「
                <router-link v-for="tag of post.tags" :key="tag" :to="{name: 'tagPager', params: {tagName: tag}}"
                            :data-tag="tag"><code class="notebook">{{tag}}</code>
                </router-link>
                  」标签，
                最后修改于
                <time>{{post.updatedAt}}</time>
              </p>
            </div>
          </template>
        </article>
        <div class="post-index">

        </div>
      </div>
      <nav class="pagination" v-if="shouldShow">
        <router-link :to="{name: 'post', params: {pathName: prev.pathName}}" v-if="typeof prev.pathName !== 'undefined'"
                     class="prev">&laquo;{{prev.title}}
        </router-link>
        <router-link :to="{name: 'post', params: {pathName: next.pathName}}" v-if="typeof next.pathName !== 'undefined'"
                     class="next">&raquo;{{next.title}}
        </router-link>
      </nav>
      <div class="comments" v-if="post.allowComment === true && commentName!== ''">
        <disqus :shortname="commentName"></disqus>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myFooter from './Footer.vue';
  import disqus from './Disqus.vue';
  import mixin from '../mixin/disqus';

  export default {
    name: 'Post',
    props: ['post', 'prev', 'next', 'siteInfo', 'type', 'supportWebp'],
    mixins: [mixin],
    serverCacheKey: props => {
      return `${props.post.pathName}::${props.post.updateAt}::webp::${props.supportWebp}`
    },
    computed: {
      shouldShow() {
        return this.post.pathName !== 404 && this.type === 'post';
      },
      commentName() {
        return this.siteInfo.commentName.value || '';
      },
      siteURL() {
        return this.siteInfo.siteUrl.value || 'localhost';
      },
      content() {
        const post = this.post;
        const result = post.toc ? `<div id="toc" class="toc">${post.toc}</div>${post.content}` : post.content;
        return this.filterWebp(result);
      }
    },
    methods: {
      filterWebp(content) {
        if (!this.supportWebp) return content.replace(/\/webp/gm, '');
        return content
      }
    },
    components: {
      myFooter,
      disqus
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

#post
  .post-main 
    display: flex 
    .post-index 
      min-width: 30%
      background: url(../../static/post-bg.svg) no-repeat bottom left,
                  linear-gradient(to left, #000 30%, #1e1e1e)
  .post-detail
    padding: 1rem
    background: #1e1e1e
    color: #c6c6c6
    h1 
      color: #d9d9d9
      margin: 0
    .meta 
      float: right
    .entry-content 
      margin-top: 1rem
      font-size: 1.1rem
      line-height: 1.6
      a
        color: #d9d9d9
</style>
