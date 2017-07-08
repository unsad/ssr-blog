<template>
  <div class="wrap">
    <top :current-route="currentRoute">
      <div class="manage-container">
        <form action="">
          <div class="left">
            <div class="form-group">
              <label for="">用户名</label>
              <input type="text" placeholder="4到20个字符" validate="required">
              <p>登录时所用名称，不能重复</p>
            </div>
            <div class="form-group">
              <label for="">邮箱</label>
              <input type="text" name="email" placeholder="4到20个字符" validate="required">
              <p>用户主要联系方式，不能重复</p>
            </div>
            <div class="form-group">
              <label for="">密码</label>
              <input type="password" name="password">
              <p>建议</p>
            </div>
            <div class="form-group">
              <label for="">确认密码</label>
              <input type="password" name="repassword" validate="required">
              <button type="submit">{{submitting ? '提交中...' : '提交'}}</button>
            </div>
          </div>
          <div class="left">
            <div class="form-group">
              <label for="">别名</label>
              <input type="text" placeholder="显示名称" validate="required">
              <p>登录时所用名称，不能重复</p>
            </div>
            <div class="form-group">
              <label>用户名</label>
              <input type="password" name="username" placeholder="4到20个字符">
              <p>登录时所用名称，不能重复</p>
            </div>
          </div>
        </form>
      </div>
    </top>
  </div>
</template>

<script>
  import Top from './Top'

  export default {
    name: 'userList'
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
