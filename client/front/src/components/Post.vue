<template>
  <div id="main">
    <div id="page-post">
      <article class="post detail">
        <div class="meta">
          <div class="date">
            {{post.createdAt}}
          </div>
        </div>
        <h1 class="title">{{post.title}}</h1>
        <div class="entry-content" v-html="content">
        </div>

        <template v-if="shouldShow">
          <p>本文链接：<a :href="siteURL+ '/post/'+ post.pathName">{{siteURL}}/post/{{post.pathName}}</a></p>
          <p>--
            <attr title="End of File">EOF</attr>
            --
          </p>
          <div class="post-info">
            <p>发表于
              <time>{{post.createAt}}</time>
              ,添加在分类
              <a :data-cate="post.category">
                <code class="notebook">{{post.category}}</code>
              </a>下,并被添加
              <router-link v-for="tag of post.tags" :key="tag" :to="{name: 'tagPager', params: {tagName: tag}}"
                           :data-tag="tag"><code class="notebook">{{tag}}</code>
                ]标签，
              </router-link>
              最后修改于
              <time>{{post.updatedAt}}</time>
            </p>
          </div>
        </template>
      </article>

      <nav class="pagination" v-if="shouldShow">
        <router-link :to="{name: 'post', params: {pathName: prev.pathName}}" v-if="typeof prev.pathName !== 'undefined'"
                     class="prev">&laquo;{{prev.title}}
        </router-link>
        <router-link :to="{name: 'post', params: {pathName: next.pathName}}" v-if="typeof prev.pathName !== 'undefined'"
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
    props: ['post', 'prev', 'next', 'siteInfo', 'type'],
    mixins: [mixin],
    serverCacheKey: props => {
      return `${props.post.pathName}::${props.post.updateAt}`
    },
    metaInfo() {
      return {
        title: this.post.title
      }
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
        let post = this.post;
        return post.toc ? `<div id="toc" class="toc">${post.toc}</div>${post.content}` : post.content;
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
