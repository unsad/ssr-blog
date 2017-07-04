<template>
  <div>
    <top :current-route="currentRoute"></top>
    <div class="manage-container"></div>
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
        <th>作者</th>
        <th>状态</th>
        <th>创建日期</th>
        <th>修改日期</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="isLoading">
        <td colSpan="8" class="center">加载中</td>
      </tr>
      <tr v-if="!items.length">
        <td colSpan="8" class="center">暂无文章</td>
      </tr>
      <tr v-else>
        <td>
          <Link to={`/post/edit/${item.id}` title="{item.title}">
          {item.title}
          </Link>
          <a href="{/post/${item.pathname}.html" target="_blank">
            <span></span>
          </a>
        </td>
        <td>{item.user.display_name || item.user.name}</td>
        <td></td>
        <td>{!item.create_time || item.create.time === '0000-00-0000:00:00}</td>
        <td>
          <button v-if="showPassAndDeny"
                  type="button"
                  disabled="{[0, 3].includes(post.status)}"
          >
            <span class="ok"></span>
            通过
          </button>
          <span v-if="showPassAndDeny"></span>
          <button v-if="showPassAndDeny"
                  type="button"
                  disabled="{[0, 2].includes([post.status}">
            <span v-if="showPassAndDeny"></span>
            拒绝
          </button>
          <span v-if="showPassAndDeny"></span>
          <Link v-if="showEditandDel" to="{`/post/edit/${post.id}`}" title="{post.title}">
          <button v-if="showEditAndDel" type="button">
            <span v-if="showEditAndDel"></span>
            编辑
          </button>
          </Link>
          <span v-if="showEditAndDel"></span>
          <button
            v-if="showEditAndDel"
            type="button">
            <span v-if="showEditAndDel"></span>
            删除
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Top from './Top'

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

      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
