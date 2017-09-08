<template>
  <div>
    <div class="manage-container">
    <div>
      <input type="text" placeholder="请输入关键字">
      <i class="search-button"></i>
    </div>
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
          <td colSpan="8" class="center">加载中</td>
        </tr>
        <tr v-if="!pages.length">
          <td colSpan="8" class="center">暂无文章</td>
        </tr>
      <tr v-else v-for="page of pages">
        <td>
          <router-link :to="{name: 'editPage', params: {id: page._id}}" :title="page.title">
            {{page.title}}
          </router-link>
          <a v-if="page.status === 3" :href="`/page/${page.pathname}.html`" target="_blank">
            <span></span>
          </a>
        </td>
        <td>{{page.status}}</td>
        <td>{{page.createdAt}}</td>
        <td>{{page.updateAt}}</td>
        <td>
          <router-link :to="{name: 'editPage', params: {id: page._id}}">
          <button v-if="showEditAndDel" type="button">
            <span v-if="showEditAndDel"></span>
            <span>编辑</span>
          </button>
          </router-link>
          <span v-if="showEditAndDel"></span>
          <button
            v-if="showEditAndDel"
            type="button" @click="deletePageByID(page._id)">
            <span v-if="showEditAndDel"></span>
            <span>删除</span>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
  import Top from './Top';
  import store from '../store/index'

  export default {
    name: 'pageList',
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
        pages: []
      }
    },
    methods: {
      getPage() {
        store.fetchBlogByPage({type: '1'}).then(result => {
          this.pages = result;
        });
      },
      deletePageByID(id) {
        this.tipInfo = '删除成功';
        this.tipType = 'success';
        this.shouldTipShow = true;
        setTimeout(() => {
          this.shouldTipShow = false;
        }, 2000);
        store.deleteBlogByID(id).then(result => {
          this.pages = this.pages.filter(val => val._id !== id);
        });
      }
    },
    mounted() {
      this.getPage();
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
