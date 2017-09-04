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
            <time>{{article.createAt}}</time>
            <template v-if="cates.length !== 0">
              ，添加在分类
              <a v-for="cate of cates" :data-cate="cate.name">
                <code class="notebook">{{cate.name}}</code>
              </a>
            </template>
            下,
            <template v-if="tags.length !== 0">
              ,并被添加[
              <router-link v-for="tag of tags" :to="{name: 'tagPager', params: {tagName: tag.name}}"
                           :data-tag="tag.name"><code class="notebook">{{tag.name}}</code></router-link>
              ]标签下，
            </template>
            最后修改于
            <time>{{article.updatedAt}}</time>
          </p>
        </div>
      </article>
      <nav class="pagination">
        <router-link :to="{name: 'post', params: {pathName: prev.pathName}}" v-if="typeof prev.pathName !== 'undefined'"
                     class="prev">&laquo;{{prev.title}}
        </router-link>
        <router-link :to="{name: 'post', params: {pathName: next.pathName}}" v-if="typeof prev.pathName !== 'undefined'"
                     class="next">&raquo;{{next.title}}
        </router-link>
      </nav>
      <div id="comments" :data-type="commentType" :data-thread-key=
        "article.pathName || ''" :data-url=`${siteURL}/post/${article.pathName}`>
        <h1 class="title">Comments</h1>
        <div id="disqus_thread" :data-url="${siteURL}/post/${article.pathName}"
             :data-identifier="article.pathName || ''" :data-name="commentName">
          评论加载中...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store/index'

  export default {
    name: 'Post',
    data() {
      return {
        article: {},
        cates: [],
        tags: [],
        prev: {},
        next: {},
        commentType: '',
        commentName: '',
        siteURL: ''
      }
    },
    watch: {
      '$route': 'getPost'
    },
    created() {

    },
    methods: {
      getPost(val, oldVal) {
        let pathName = obj.to.params.pathName;
        store.fetchPostByPathName(this, pathName).then(article => {
          this.article = article;
          window.scrollTo(0, 0);
          resolve();
        }).then(() => {
          store.fetchPrevPostByPathName(this.article._id).then(post => {
            this.prev = post;
          });
          store.fetchNextPostByPathName(this.article._id).then(post => {
            this.next = post;
          });
          store.fetchTagsByPostID(this, {postID: article._id}).then(postTags => {
            console.log(postTags);
            store.fetchTags(this).then(tags => {
              let obj = {};
              tags.forEach(value => {
                obj[value._id] = value;
              });
              postTags.forEach(value => {
                this.tags.push(obj[value.tagID]);
              });
            });
          });
          store.fetchCatesByPostID(this, {postID: article._id}).then(postCates => {
            store.fetchCates(this).then(cates => {
              let obj = {};
              cates.forEach(value => {
                obj[value._id] = value;
              });
              postCates.forEach(value => {
                this.cates.push(obj[value.categoryID]);
              });
            });
          });
        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
