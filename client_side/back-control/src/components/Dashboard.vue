<template>
  <div class="wrap">
    <div class="manage-container">
      <h1>网站概要</h1>
      <!--<p>目前有{{count.posts}}篇文章，并有{{count.comments}}条关于你的评论在{{count.cates}}个分类中</p>-->
      <p>点击下面链接快速开始：</p>
      <div>
        <router-link :to="{path: '/post/create'}">撰写新文章</router-link>
        <a :to="{path: '/option/general'}">系统设置</a>
      </div>
      <hr/>
      <div class="info">
        <h2>最近发布的文章</h2>
        <!--<ul>
          <li v-for="post of posts" :key="post.id">
            <label>{{moment(new Date(post.create_time)).format('MM.DD')
            }}:</label>
            <a :href="`/post/${post.pathname}`" target="_blank">{{post.title}}</a>
          </li>
        </ul>-->
      </div>
    </div>
  </div>
</template>

<script>
  import Top from './Top';

  export default {
    name: 'dashboard',
    props: {
      shouldTipShow: Boolean,
      tipType: String,
      tipInfo: String,
      currentRoute: String
    },
    data() {
      return {
        count: '',
        posts: ''
      }
    },
    components: {
      Top
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
