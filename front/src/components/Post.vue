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
                <time>{{post.createdAt}}</time>
                ，添加在分类「
                <a :data-cate="post.category">
                  <code class="notebook">{{post.category}}</code>
                </a> 」下，并被添加「
                <router-link v-for="tag of post.tags" :key="tag" :to="{name: 'tagPager', params: {tagName: tag}}"
                            :data-tag="tag"><code class="notebook">{{tag}}</code>
                </router-link>
                  」标签，
                最后修改于
                <time>{{post.updatedAt}}</time>
              </p>
            </div>
          </template>

            <nav class="pagination" v-if="shouldShow">
              <router-link :to="{name: 'post', params: {pathName: prev.pathName}}" v-if="typeof prev.pathName !== 'undefined'"
                          class="prev">&laquo; {{prev.title}}
              </router-link>
              <router-link :to="{name: 'post', params: {pathName: next.pathName}}" v-if="typeof next.pathName !== 'undefined'"
                          class="next">{{next.title}} &raquo;
              </router-link>
            </nav>
        </article>
        <div class="post-index">
          <div class="toc" id="toc" v-if="post.toc" v-html="post.toc"></div>
        </div>
      </div>
      <div class="comments" v-if="post.allowComment === true && commentName!== ''">
        <disqus :shortname="commentName"></disqus>
      </div>
    </div>
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
      return `${props.post.pathName}::${props.post.updateAt}::webp::${props.supportWebp}`;
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
        return this.filterWebp(this.post.content);
      }
    },
    methods: {
      filterWebp(content) {
        if (!this.supportWebp) return content.replace(/\/webp/gm, '');
        return content;
      }
    },
    components: {
      myFooter,
      disqus
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

#page-post
  .post-main
    min-height: 100vh
    font-size: 1.1rem
    line-height: 1.6
    a
      color: #d9d9d9
    display: flex 
    .post-index 
      min-width: 35%
      background: url(../../static/post-bg.svg) no-repeat bottom left/80%,
                  linear-gradient(to left, #000 30%, #1e1e1e)
      #toc 
        padding: 1rem
        strong 
          font-size: 2rem
          color: #d9d9d9
    .post-detail
      padding: 1rem 1rem 0
      max-height: 100vh
      overflow: auto
      background: #1e1e1e
      color: #c6c6c6
      h1 
        color: #d9d9d9
        margin: 0
      .meta 
        float: right
      .entry-content 
        margin-top: 1rem
      .pagination
        display: flex 
        padding: 1rem 0
        align-items: center 
        justify-content: space-between
        .prev,.next 
          background: #d9d9d9
          color: #000
          display: inline-block 
          padding: 0.5rem
</style>
