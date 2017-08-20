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
        <th>缩略名</th>
        <th>文章数</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="isLoading">
        <td colSpan="8" class="center">加载中</td>
      </tr>
      <tr v-if="!cates.length">
        <td colSpan="8" class="center">暂无文章</td>
      </tr>
      <tr v-else v-for="cate of cates">
        <td>
          <router-link :to='{name: "editCate", params: {id: cate._id}}' :title="cate.name">
          {{cate.name}}
          </router-link>
          <a v-if="cate.status === 3" :href="`/post/${cate.pathname}.html`" target="_blank">
            <span></span>
          </a>
        </td>
        <td>{{cate.pathName}}</td>
        <td>0</td>
        <td><router-link :to="{name: 'editCate', params: {id: cate._id}}">
          <button v-if="showEditAndDel" type="button">
            <span v-if="showEditAndDel"></span>
            编辑
          </button>
        </router-link>
        <span v-if="showEditAndDel"></span>
        <button
          v-if="showEditAndDel"
          type="button" @click="deleteCate(cate._id)">
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
  import store from '../store/index';

  export default {
    name: 'cateList',
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
        cates: [],
        showPassAndDeng: true,
        showEditAndDel: true
      }
    },
    methods: {
      getCate() {
        store.fetchCate(this).then(result => {
          this.cates = result;
        });
      },
      deleteCate(id) {
        this.tipInfo = '删除成功';
        this.tipType = 'success';
        this,shouldTipShow = true;
        setTimeout(() => {
          this.shouldTipShow = false;
        }, 2000);
        store.deleteCate(this, id).then(result => {
          console.log(result);
          this.cates = this.cates.filter(val => val._id !== id);
        });
        store.fetchPostCateByID(this, {
          categoryID: id
        }).then(tags => {
          tags.forEach(value => {
            store.deleteCateByPostID(this, value._id);
          })
        });
      }
    },
    mounted() {
      this.getCate();
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
