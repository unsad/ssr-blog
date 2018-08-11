<template>
  <el-row class="sidebar">
      <el-col :span="4" class="full-height">
        <el-menu default-active="2" class="full-height" :unique-opened="true"
                 @select="handleSelect">
          <el-menu-item index="/dashboard"><i class="el-icon-date"></i>概述</el-menu-item>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>文章管理</template>
            <el-menu-item index="/post/list">文章列表</el-menu-item>
            <el-menu-item index="/post/create">添加文章</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-star-on"></i>分类管理</template>
            <el-menu-item index="/cate/list">分类列表</el-menu-item>
            <el-menu-item index="/cate/create">添加分类</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-off"></i>标签管理</template>
            <el-menu-item index="/tag/list">标签列表</el-menu-item>
            <el-menu-item index="/tag/create">添加标签</el-menu-item>
          </el-submenu>

           <el-submenu index="5">
            <template slot="title"><i class="el-icon-star-off"></i>音乐管理</template>
            <el-menu-item index="/music/list">音乐列表</el-menu-item>
            <el-menu-item index="/music/create">添加音乐</el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title"><i class="el-icon-star-off"></i>相册管理</template>
            <el-menu-item index="/album/list">相册列表</el-menu-item>
            <el-menu-item index="/album/create">添加图片</el-menu-item>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
            <el-menu-item index="/option/general">基本设置</el-menu-item>
            <el-menu-item index="/option/comment">评论设置</el-menu-item>
            <el-menu-item index="/option/analytic">统计代码</el-menu-item>
          </el-submenu>

          <el-menu-item index="/user/edit"><i class="el-icon-star-off"></i>用户设置</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
</template>

<script>
  export default {
    name: 'sidebar',
    data() {
      return {
        title: '',
        fullPath: ''
      }
    },
    watch: {
      '$route': function(route) {
        this.fullPath = route.path.split('/').slice(0, 3).join('/');
      }
    },
    methods: {
      push(name) {
        this.$router.push({name});
      },
      handleSelect(indexPath) {
        this.$router.push({path: indexPath});
      }
    },
    beforeMount() {
      this.fullPath = this.$route.path.split('/').slice(0, 3).join('/');
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.full-height 
  height: 100%
  width: 148px

</style>
