<template>
  <div :class="$post.container">
    <div :class="$post.main">
      <article :class="$post.detail">
        <div :class="$post.meta" class="no-phone">
          <div :class="$post.date">
            {{post.createdAt}}
          </div>
        </div>
        <h1 :class="$post.title">{{post.title}}</h1>
        <div :class="$post.content" v-html="content">
        </div>
        <template v-if="shouldShow">
          <p>--
            <dfn title="End of File">EOF</dfn>
            --
          </p>
          <div :class="$post.info">
            添加在分类「
              <a :data-cate="post.category">
                <code :class="$post.notebook">{{post.category}}</code>
              </a> 」下，并被添加
              <router-link v-for="tag of post.tags" :key="tag" :to="{name: 'tagPager', params: {tagName: tag}}"
                          :data-tag="tag"><code :class="$post.notebook">「{{tag}}」</code>
              </router-link>
                标签。
          </div>
        </template>

          <nav :class="$post.pagination" v-if="shouldShow">
            <router-link :to="{name: 'post', params: {pathName: prev.pathName}}" v-if="typeof prev.pathName !== 'undefined'"
                        :class="$post.prev">&laquo; {{prev.title}}
            </router-link>
            <router-link :to="{name: 'post', params: {pathName: next.pathName}}" v-if="typeof next.pathName !== 'undefined'"
                        :class="$post.next">{{next.title}} &raquo;
            </router-link>
          </nav>
      </article>
      <div :class="$post.index">
        <div :class="$post.toc" v-if="post.toc" v-html="post.toc"></div>
          <router-link :class="$post.back" :to="{path: '/'}">
            回到首页
          </router-link>
      </div>
    </div>
    <div :class="$post.comments" v-if="post.allowComment === true && commentName!== ''">
      <disqus :shortname="commentName"></disqus>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';

  import myFooter from './Footer.vue';
  import disqus from './Disqus.vue';
  import myMixin from '../mixin/disqus';

  @Component({
    components: {
      myFooter,
      disqus
    }
  })
  export default class Post extends mixins(myMixin) {
    @Prop()
    post

    @Prop()
    prev

    @Prop()
    next

    @Prop()
    siteInfo

    @Prop()
    type

    @Prop()
    supportWebp

    get shouldShow() {
      return this.post.pathName !== 404 && this.type === 'post';
    }
    get commentName() {
      return this.siteInfo.commentName.value || '';
    }
    get siteURL() {
      return this.siteInfo.siteUrl.value || 'localhost';
    }
    get content() {
      return this.filterWebp(this.post.content);
    }

    filterWebp(content) {
      if (!this.supportWebp) return content.replace(/\/webp/gm, '');
      return content;
    }
  };
</script>
<style lang="stylus" module="$post" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl'

@media only screen and (max-width : 768px)
  .container 
    .main 
      flex-direction: column
      .detail 
        padding: $space-middle
      .index
        order: -1
        background: $content-bg-color
        border-bottom: 1px solid #$content-main-color
        ul 
          list-style-type: disc
          color: $content-main-color
          margin-left: $space-middle-u
        .back
          position: absolute
          top: 0
          right: 0

@media only screen and (min-width : 769px)  
  .container 
    .main 
      .index
        ul 
          list-style-type: disc 
          color: $content-main-color
          margin-left: $space-middle-u
        background: url(../../static/post-bg.svg) no-repeat bottom left/80%,
                    linear-gradient(to left, $main-second-color 30%, $content-bg-color)  
      ul 
        margin-left: 1rem
      .detail
        flex-grow: 1
        padding: $space-middle $space-middle 0
        max-height: 100vh
        overflow: auto
.container
  .main
    min-height: 100vh
    font-size: $font-size-small-u
    line-height: 1.6
    a
      color: $content-strong-color
    display: flex 
    .index 
      min-width: 35%
      .toc 
        padding: $space-middle $space-middle 0
        strong 
          font-size: $font-size-middle
          color: $content-strong-color
    .back
      padding: $space-middle
      line-height: 2
    .detail
      background: $content-bg-color
      color: $content-main-color
      h1 
        color: $content-strong-color
        margin: 0
      .meta 
        float: right
      .content 
        margin-top: $space-middle
      .pagination
        padding: $space-middle 0
        display: flex 
        align-items: center 
        justify-content: space-between
        .prev,.next 
          background: $content-strong-color
          color: $main-second-color
          display: inline-block 
          padding: $space-small

      img 
        max-width: 100%
        height: auto
        border:1px solid $content-main-color
        padding: 3px
      blockquote 
        border-left: 5px solid $content-main-color
        margin: $space-small 0
        padding: $space-small 0 $space-small $space-middle
      h2,h3,h4,h5,h6 
        margin: $space-middle 0
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
      

:global(.hljs) 
  display: block
  overflow-x: auto
  margin: $space-small 0
  padding: $space-msall
  color: #abb2bf
  background: #282c34


:global(.hljs-comment) 
  color: #61aeee


:global(.hljs-quote) 
  color: #5c6370
  font-style: italic


:global(.hljs-doctag),
:global(.hljs-keyword),
:global(.hljs-formula) 
  color: #c678dd


:global(.hljs-section),
:global(.hljs-name),
:global(.hljs-selector-tag),
:global(.hljs-deletion),
:global(.hljs-subst) 
  color: #e06c75


:global(.hljs-literal) 
  color: #56b6c2


:global(.hljs-string),
:global(.hljs-regexp),
:global(.hljs-addition),
:global(.hljs-attribute),
:global(.hljs-meta-string) 
  color: #98c379


:global(.hljs-built_in),
:global(.hljs-class .hljs-title) 
  color: #e6c07b

:global(.hljs-attr),
:global(.hljs-variable),
:global(.hljs-template-variable),
:global(.hljs-type),
:global(.hljs-selector-class),
:global(.hljs-selector-attr),
:global(.hljs-selector-pseudo),
:global(.hljs-number) 
  color: #d19a66


:global(.hljs-symbol),
:global(.hljs-bullet),
:global(.hljs-link),
:global(.hljs-meta),
:global(.hljs-selector-id),
:global(.hljs-title) 
  color: #61aeee


:global(.hljs-emphasis) 
  font-style: italic


:global(.hljs-strong) 
  font-weight: bold


:global(.hljs-link) 
  text-decoration: underline

</style>
