<template>
  <div class="manage-container">
    <div class="search">
      <input type="text" placeholder="请输入关键字"/>
      <i class="icon-search"></i>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>名称</th>
        <th>版本</th>
        <th>地址</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="isLoading">
        <td colSpan="8" class="center">加载中...</td>
      </tr>
      <tr v-if="!item.length">
        <td colSpan="8" class="center">暂无</td>
      </tr>
      <tr v-else v-for="item of items">
        <td>
          <router-link :to="{name: 'editUpdate', params: {id: item._id}}" :title="item.name">{{item.name}}</router-link>
          <a :href="`/post/${item.pathname}.html`" target="_blank"></a>
        </td>
        <td>
          {{item.path}}
        </td>
        <td>
          0
        </td>
        <td>
          <router-link :to="{name: 'editUpdate', params: {id: item._id}}">
            <button v-if="showEditAndDel" type="button">
              <span v-if="showEditAndDel" class="icon"></span>
              <span>编辑</span>
            </button>
          </router-link>
          <button v-if="showEditAndDel" type="button" @click="deleteUpdate(item._id)">
            <span v-if="showEditAndDel" class="icon"></span>
            <span>删除</span>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Top from './Top';
  import store from '../store/index';

  export default {
    name: 'updateList',
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
        items: [],
        showPassAndDeny: true,
        showEditAndDel: true
      }
    },
    methods: {
      getUpdates() {
        store.fetchUpdates(this).then(result => {
          this.items = result.body;
        });
      }
    },
    deleteUpdate(id) {
      this.tipInfo = '删除成功';
      this.tipType = 'success';
      this.shouldTipShow = true;
      setTimeout(() => {
        this.shouldTipShow = false;
      }, 2000);
      store.deleteUpdate(this, id).then(result => {
        this.items = this.items.filter(value => value._id !== id);
      });
    },
    created() {
      this.getUpdates();
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
