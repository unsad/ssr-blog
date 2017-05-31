<template>
  <div class="manage-container">
    <h1>网站概要</h1>
    <p>目前有{{count.posts}}篇文章，并有{{count.comments}}条关于你的评论在{{count.cates}}个分类中</p>
    <p>点击下面链接快速开始：</p>
    <div>
      <a href="/post/create">撰写新文章</a>
      <a href="/options/general">系统设置</a>
    </div>
    <hr/>
    <div class="info">
      <h2>最近发布的文章</h2>
      <ul>
        <li v-for="post of posts" :key="post.id">
          <label>{{moment(new Date(post.create_time)).format('MM.DD')
          }:</label>
          <a :href="`/post/${post.pathname}`" target="_blank">{{post.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    props: {
      shouldTipShow: Boolean,
      type: String,
      text: String
    },
    data() {
      return {

      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
