<template>
  <article class="post">
    <div class="meta">
      <div class="date">{{article.createdAt}}</div>
    </div>
    <h1 class="title"><router-link :to="{name:'post', params: {pathName: article.pathName}}">{{article.title}}</router-link></h1>
    <div class="entry-content" v-html="filterWebp(article.summary)">

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
      filterWebp(content)  {
        if (!this.supportWebp) {
          return content.replace(/\/webp/g, '');
        }
        return content;
      }
    },
    serverCacheKey: props => {
      return `${props.article.pathName}::${props.article.updatedAt}`
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
