<template>
  <div id="post">
    <div id="page-post">
      <div class="post-main">
        <article class="post-detail">
          <div class="meta no-phone">
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
                </a> 」下，并被添加
                <router-link v-for="tag of post.tags" :key="tag" :to="{name: 'tagPager', params: {tagName: tag}}"
                            :data-tag="tag"><code class="notebook">「{{tag}}」</code>
                </router-link>
                  标签，
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

@media only screen and (max-width : 768px)
  #page-post 
    .post-main 
      flex-direction: column
      .post-index
        order: -1
        background: #1e1e1e
        border-bottom: 1px solid #c6c6c6


@media only screen and (min-width : 769px)  
  #page-post 
    .post-main 
      .post-index
         background: url(../../static/post-bg.svg) no-repeat bottom left/80%,
                     linear-gradient(to left, #000 30%, #1e1e1e)  
      .post-detail
        flex-grow: 1
        padding: 1rem 1rem 0
        max-height: 100vh
        overflow: auto
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
      #toc 
        padding: 1rem
        strong 
          font-size: 2rem
          color: #d9d9d9
    .post-detail
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

      img 
        max-width: 100%
        border:1px solid #c6c6c6
        padding: 3px
      blockquote 
        border-left: 5px solid #c6c6c6
        margin: 0.5rem 0
        padding: 0.5rem 0
      h2,h3,h4,h5,h6 
        margin: 1rem 0
      ol,ul 
        padding-left: 40px
      ol 
        list-style-type: upper-roman
      ul  
        list-style-type: circle
      p,ul,ol
        margin: 1em 0
      hr  
        margin: 20px 0 
        border: none
        height: 2px
        background: repeating-linear-gradient(-45deg, #a6a6a6, #a6a6a6 6px, transparent 6px, transparent 12px)
      article table th,
      article table td 
        border: 0


      article table th 
        border-bottom: 2px solid #848484
        padding: 6px 20px
        text-align: left
      

      article table td 
        border-bottom: 1px solid #d0d0d0
        padding: 6px 20px
      

.hljs 
  display: block
  overflow-x: auto
  margin: 0.5rem 0
  padding: 0.5em
  color: #abb2bf
  background: #282c34


.hljs-comment 
  color: #61aeee


.hljs-quote 
  color: #5c6370
  font-style: italic


.hljs-doctag,
.hljs-keyword,
.hljs-formula 
  color: #c678dd


.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst 
  color: #e06c75


.hljs-literal 
  color: #56b6c2


.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta-string 
  color: #98c379


.hljs-built_in,
.hljs-class .hljs-title 
  color: #e6c07b

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number 
  color: #d19a66


.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title 
  color: #61aeee


.hljs-emphasis 
  font-style: italic


.hljs-strong 
  font-weight: bold


.hljs-link 
  text-decoration: underline

</style>
