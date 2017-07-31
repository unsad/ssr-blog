<template>
  <div>
    <top :current-route="currentRoute"></top>
    <div class="manage-container">
    <div>
      <input type="text" placeholder="请输入关键字">
      <i class="search-button"></i>
    </div>
    <Tabs>
      <Tab title="全部"></Tab>
      <Tab title="已发布"></Tab>
      <Tab title="审核中"></Tab>
      <Tab title="已拒绝"></Tab>
    </Tabs>
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
          <router-link :to="{path: '/tag/edit'}" :title="tag.name">
          {{tag.name}}
          </router-link>
          <a v-if="tag.status === 3" :href="`/post${tag.pathname}.html`" target="_blank">
            <span></span>
          </a>
        </td>
        <td>{{tag.pathName}}</td>
        <td>0</td>
        <td>
          <Link v-if="showEditandDel" to="{`/post/edit/${post.id}`}" title="{post.title}">
          <button v-if="showEditAndDel" type="button">
            <span v-if="showEditAndDel"></span>
            <span>编辑</span>
          </button>
          </Link>
          <span v-if="showEditAndDel"></span>
          <button
            v-if="showEditAndDel"
            type="button" @click="deleteTag(tag.name)">
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
      type: String,
      text: String,
      currentRoute: String
    },
    data() {
      return {
        tags: [],
        showPassAndDeny: true,
        showEditAndDel: true
      }
    },
    methods: {
      getTag() {
        store.fetchTag(this).then(result => {
          this.tags = result;
          console.log(this.tags);
        });
      },
      submit() {
        if (this.user.password !== this.repassword) return;
        store.patchUser(this, this.user._id, this.user).then(result => {

        });
      },
      deleteTag(name) {
        store.deleteTag(this, name).then(result => {
          this.tags = this.tags.filter(value => value.name !== name);
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
