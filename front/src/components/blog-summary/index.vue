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

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class BlogSummary extends Vue {
    @Prop({ required: true })
    article: Object

    @Prop()
    supportWebp: boolean

    filterWebp(content) {
      if (!this.supportWebp) {
        return content.replace(/\/webp/gm, '');
      }
      return content;
    }
  }
</script>
<style module="summary" lang="stylus" rel="stylesheet/stylus">
@import '../../assets/css/mixin.styl'

.container
  font-size: $font-size-small-u
  line-height: 1.6
  h1 
    display: flex
    justify-content: space-between
    font-size: $font-size-middle
    margin: $space-small 0
    .meta 
      flex-shrink: 0
      font-size: $font-size-small-u
    .link 
      min-width: 50%
      no-wrap()
  .title a
    color: $main-third-color
  .more 
    margin: $space-small 0
    padding: 0 $space-small
    display: inline-block
    background: $main-third-color
    color: $main-second-color
</style>
