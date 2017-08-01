<template>
  <div class="wrap">
    <div class="manage-container">
      <div class="search">
        <input type="text" class="search-input" placeholder="请输入关键字">
        <i class="icon-search"></i>
        <tabs>
          <tab title="全部"></tab>
          <tab title="已发布"></tab>
          <tab title="审核中"></tab>
          <tab title="已拒绝"></tab>
        </tabs>
        <table class="table">
          <thead>
          <tr>
            <th>标题</th>
            <th>作者</th>
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
          <tr v-if="!items.length">
            <td colspan="8" class="center">暂无文章</td>
          </tr>
          <tr v-else>
            <td>
              <a href="" title="item.title">{{item.title}}</a>
              <a href="" v-if="item.status === 3" target="_blank"></a>
            </td>
            <td>{{item.user.display_name || item.user.name}}</td>
            <td>{{this.renderStatus(item.status)}}</td>
            <td>create_time</td>
            <td>update_time</td>
            <td>
              <button v-if="showPassAndDeny" type="button" class="btn">
                <span class="glyphicon-ok"></span>通过
              </button>
              <span v-if="showPassAndDeny"></span>
              <button v-if="showPassAndDeny" type="button" class="btn">
                <span class="glyphicon-remove"></span>拒绝
              </button>
              <span v-if="showPassAndDeny"></span>
              <a href="" v-if="showEditAndDel" title="post.title">
              <button v-if="showEditAndDel" type="button" class="btn">
                <span v-if="showEditAndDel" class="glyphicon-edit"></span>
                编辑
              </button>
              </a>
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

  export default {
    name: 'postList',
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
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
