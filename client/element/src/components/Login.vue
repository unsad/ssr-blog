<template>
  <div class="login">
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <el-form label-position="right" ref="form" :model="form" label-width="40px">
            <el-form-item>{{title}}</el-form-item>
            <el-form-item label="账号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
</template>

<script>
  import Api from '../store/api'

  export default {
    name: 'login',
    data() {
      return {
        title: '',
        form: {
          name: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        Api.login(this.form).then(response => {
          if (response.data.status === 'fail') {
            this.$message({
              message: '登录失败，请检查账号和密码',
              type: 'success',
              duration: 2000,
              type: 'error'
            });
          } else if (response.data.status === 'success') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', this.username);
            this.$message({
              title: '成功',
              message: '登录成功',
              type: 'success',
              duration: 2000
            });
            this.$router.push({path: '/dashboard'});
          }
        });
      }
    },
    mounted() {
      this.$store.dispatch('FETCH_OPTIONS').then(result => {
        this.title = this.$store.state.siteInfo['title'].value || '';
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
