<template>
  <div class="container">
    <div class="row">
      <div class="login">
        <h1 class="text-center">
          <a href="/">{{title}}</a>
        </h1>
        <form onsubmit="return false">
          <input type="text" name="username" v-model="username" ref="username" class="form-control" placeholder="用户名">
          <input type="password" name="password" v-model="password" class="form-control" placeholder="密码">
          <button type="submit" @click="login">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store/index';

  export default {
    name: 'login',
    data() {
      return {
        title: '造梦之地',
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        let json = {
          name: this.username,
          password: this.password
        };
        store.login(this, json).then(response => {
          console.log(response);
          if (response.body.status === 'fall') {

          } else if (response.body.status === 'success') {
            localStorage.setItem('token', response.body.token);
            localStorage.setItem('username', response.body.username);
            this.$router.go({path: '/dashboard'});
          }
        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
