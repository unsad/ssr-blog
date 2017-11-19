<template>
  <div class="login">
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <el-form label-position="right" ref="form" :model="form" label-width="40px">
            <p class="align-center" label-width="0">{{title}}</p>
            <el-form-item label="账号">
              <el-input v-model="form.name" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Api from '../../store/api'

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
              duration: 2000,
              type: 'error'
            });
          } else if (response.data.status === 'success') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', this.form.name);
            this.$message({
              title: '成功',
              message: '登录成功',
              type: 'success',
              duration: 2000
            });
            this.$store.dispatch('FETCH_USER', {
              model: 'user',
              query: {},
              username: this.form.name
            }).then(() => {
              this.$router.push({path: '/dashboard'});
            });
          }
        }).catch(err => console.error(err));
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
