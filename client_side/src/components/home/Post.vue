<template>
  <div id="main">
    <div id="page-post">
      <article class="post detail">
        <div class="meta">
          <div class="date">
            {{article.createdAt}}
          </div>
          <div class="comment">
            <a href="#comments">
              {{article.commentNum}} comments
            </a>
          </div>
        </div>
        <h1 class="title">{{article.title}}</h1>
        <div class="entry-content" v-html="article.content">

        </div>
        <p>--
          <attr title="End of File">EOF</attr>
          --
        </p>
        <div class="post-info">
          <p>发表于
            <time>占位</time>
            ，添加在分类
            <a href="/cate/Node.js" data-cate="Node.js">Node.js</a>
            下，并被添加[
            <a href="/tags/JavaScript" data-tag="JavaScript"><code class="notebook">JavaScript</code></a>
            ]标签下，
            最后修改于
            <time>占位</time>
          </p>
        </div>
      </article>
      <nav class="pagination"><a href="/post/exam.html" class="prev">&laquo;翻页占位</a></nav>
    </div>
  </div>
</template>

<script>
  import store from '../../store/index'

  export default {
    name: 'Post',
    data() {
      return {
        article: {}
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
