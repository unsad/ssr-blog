<template>
  <article id="post-summary">
    <h1 class="title">
      <router-link class="title-link" :to="{name:'post', params: {pathName: article.pathName}}">{{article.title}}</router-link>
      <div class="meta no-phone">
        <div class="date">{{article.createdAt}}</div>
      </div>
    </h1>
    <div class="entry-content">
      <div v-html="filterWebp(article.summary)"></div>
      <router-link class="more" :to="{name: 'post', params: {pathName: article.pathName}}">阅读全文 »</router-link>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'blogSummary',
    props: {
      article: {
        type: Object, // 字符串
        required: true
      },
      supprotWebp: Boolean
    },
    methods: {
      filterWebp(content) {
        if (!this.supportWebp) {
          return content.replace(/\/webp/gm, '');
        }
        return content;
      }
    },
    serverCacheKey: props => {
      return `${props.article.pathName}::${props.article.updatedAt}::webp::${props.supportWebp}`;
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

#post-summary
  font-size: 1.1rem
  line-height: 1.6
  h1 
    display: flex
    justify-content: space-between
    font-size: 2rem
    margin: 0.5rem 0
    .meta 
      font-size: 1.1rem
    .title-link 
      min-width: 75%
      no-wrap()
  .title a
    color: #fff
  .more 
    margin: 0.5rem 0
    padding: 0 0.5rem
    display: inline-block
    background: #fff
    color: #000
</style>
