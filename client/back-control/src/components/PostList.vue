<template>
  <div class="wrap">
    <div class="manage-container">
      <div class="search">
        <input type="text" class="search-input" placeholder="请输入关键字">
        <i class="icon-search"></i>
        <table class="table">
          <thead>
          <tr>
            <th>标题</th>
            <th>状态</th>
            <th>创建日期</th>
            <th>修改日期</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="isLoading">
            <td colspan="8" class="center">加载中..</td>
          </tr>
          <tr v-if="!posts.length">
            <td colspan="8" class="center">暂无文章</td>
          </tr>
          <tr v-else v-for="post of posts">
            <td>
              <router-link :to="{name: 'editPost', params: {id: post._id}}" :title="{{post.title}}">{{post.title}}</router-link>
              <a :href="`/post/${post.pathname}.html`" v-if="item.status === 3" target="_blank"></a>
            </td>
            <td>{{post.status}}</td>
            <td>{{post.createAt}}</td>
            <td>{{post.updateAt}}</td>
            <td>
              <router-link :to="{name: 'editPost', params: {id: post._id}}">
              <button v-if="showEditAndDel" type="button" class="btn">
                <span v-if="showEditAndDel" class="glyphicon-edit"></span>
                <span>编辑</span>
              </button>
              </router-link>
              <span v-if="showEditAndDel"></span>
              <button v-if="showEditAndDel" type="button" class="btn">
                <span v-if="showEditAndDel" class="glyphicon-trash"></span>
                删除
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Top from './Top';
  import store from '../store/index';

  export default {
    name: 'postList',
    components: {
      Top
    },
    props: {
      shouldTipShow: Boolean,
      tipType: String,
      tipInfo: String,
      currentRoute: String
    },
    data() {
      return {
        showEditAndDel: true,
        post: []
      }
    },
    methods: {
      getBlogByPage() {
        store.fetchBlog({
          type: 0
        }).then(result => {
          this.posts = result;
        });
      },
      deleteBlogByID(id) {
        this.tipInfo = '删除成功';
        this.tipType = 'success';
        this.shouldTipShow = true;
        setTimeout(() => {
          this.shouldTipShow = false;
        }, 2000);
        store.deleteBlogByID(id).then(result => {
          this.posts = this.posts.filter(val => val._id !== id);
        });
        console.log(id);
        store.fetchPostTagsByID({
          postID: id
        }).then(tags => {
          tags.forEach(value => {
            store.deleteTagsByPostID(value._id);
          });
        });
        store.fetchPostCateByID({
          postID: id
        }).then(tags => {
          tags.forEach(value => {
            store.deleteCateByPostID(value._id);
          });
        })
      }
    },
    mounted() {
      this.getBlogByPage();
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
