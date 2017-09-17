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
      <tr v-if="!tags.length">
        <td colSpan="8" class="center">暂无文章</td>
      </tr>
      <tr v-else v-for="tag of tags">
        <td>
          <router-link :to="{name: 'editTag', params: {id: tag._id}}" :title="tag.name">
          {{tag.name}}
          </router-link>
          <a v-if="tag.status === 3" :href="`/post${tag.pathname}.html`" target="_blank">
            <span></span>
          </a>
        </td>
        <td>{{tag.pathName}}</td>
        <td>0</td>
        <td>
          <router-link v-if="showEditAndDel" :to="{name: 'editTag', params: {id: tag._id}}" :title="tag.title">
          <button v-if="showEditAndDel" type="button">
            <span v-if="showEditAndDel"></span>
            <span>编辑</span>
          </button>
          </router-link>
          <span v-if="showEditAndDel"></span>
          <button
            v-if="showEditAndDel"
            type="button" @click="deleteTag(tag._id)">
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
    name: 'tagList',
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
        tags: [],
        isLoading: false,
        showPassAndDeny: true,
        showEditAndDel: true
      }
    },
    methods: {
      getTag() {
        store.fetchTag().then(result => {
          this.tags = result;
        });
      },
      deleteTag(id) {
        store.deleteTag(id).then(result => {
          console.log(result);
          this.tags = this.tags.filter(value => value._id !== id);
        });
        store.fetchPostTagsByID({
          tagID: id
        }).then(tags => {
          tags.forEach(value => {
            store.deleteTagsByPostID(value._id);
          })
        });
      }
    },
    mounted() {
      this.getTag();
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
