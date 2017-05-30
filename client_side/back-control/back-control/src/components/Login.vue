<template>
  <div class="container">
    <div class="row">
      <div class="login">
        <h1 class="text-center">
          <a href="/">{{title}}</a>
        </h1>
        <form>
          <input type="text" name="username" ref="username" class="form-control" required pattern="\w{1, 15}"
                 placeholder="用户名"
          <input type="password" name="password" ref="password" class="form-control" required pattern="\w{1, 15}"
                 placeholder="密码">
          <button type="submit">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        title: '造梦之地'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
