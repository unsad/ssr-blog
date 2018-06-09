<template>
  <article :class="summary.container">
    <h1 :class="summary.title">
      <router-link :class="summary.link" :to="{name:'post', params: {pathName: article.pathName}}">{{article.title}}</router-link>
      <div class="no-phone" :class="summary.meta">
        <div class="date">{{article.createdAt}}</div>
      </div>
    </h1>
    <div>
      <div v-html="filterWebp(article.summary)"></div>
      <router-link :class="summary.more" :to="{name: 'post', params: {pathName: article.pathName}}">阅读全文 »</router-link>
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
    }
  };
</script>
<style module="summary" lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

.container
  font-size: 1.1rem
  line-height: 1.6
  h1 
    display: flex
    justify-content: space-between
    font-size: 2rem
    margin: 0.5rem 0
    .meta 
      flex-shrink: 0
      font-size: 1.1rem
    .link 
      min-width: 50%
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
