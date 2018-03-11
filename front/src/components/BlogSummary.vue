<template>
  <article class="post">
    <div class="meta">
      <div class="date">{{article.createdAt}}</div>
    </div>
    <h1 class="title"><router-link :to="{name:'post', params: {pathName: article.pathName}}">{{article.title}}</router-link></h1>
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
      return `${props.article.pathName}::${props.article.updatedAt}::webp::${props.supportWebp}`
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.post
  h1 
    font-size: 2rem
    margin: 0.5rem 0
  font-size: 1.1rem
  line-height: 1.6
  .meta 
    float: right
  .title a
    color: #fff
  .more 
    margin: 0.5rem 0
    padding: 0 0.5rem
    display: inline-block
    background: #fff
    color: #000
</style>
