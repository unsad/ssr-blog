<template>
  <div class="wrap">
      <div class="manage-container">
        <form action="" onsubmit="return false">
          <div class="left">
            <div class="form-group">
              <label for="">用户名</label>
              <input type="text" placeholder="4到20个字符" v-model="user.name" validate="required">
              <p>登录时所用名称，不能重复</p>
            </div>
            <div class="form-group">
              <label for="">邮箱</label>
              <input type="text" v-model="user.email" name="email" placeholder="4到20个字符" validate="required">
              <p>用户主要联系方式，不能重复</p>
            </div>
            <div class="form-group">
              <label for="">密码</label>
              <input type="password" name="password" v-model="user.password" validate="required">
              <p>建议</p>
            </div>
            <div class="form-group">
              <label for="">确认密码</label>
              <input type="password" name="repassword" validate="required" v-model="repassword">
              <button type="submit" @click="submit">{{submitting ? '提交中...' : '提交'}}</button>
            </div>
          </div>
          <div class="left">
            <div class="form-group">
              <label for="">别名</label>
              <input v-model="user.displayName" type="text" placeholder="显示名称" validate="required">
              <p>登录时所用名称，不能重复</p>
            </div>
          </div>
        </form>
      </div>
    </top>
  </div>
</template>

<script>
  import Top from './Top';
  import store from '../store/index';

  export default {
    name: 'userList',
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
        user: {},
        repassword: '',
        submitting: false
      }
    },
    methods: {
      getUser() {
        store.fetchUser().then(result => {
          console.log(result);
          this.user = result[0];
        });
      },
      submit() {
        if (this.user.password !== this.repassword) {
          return;
        }
        store.patchUser(this.user._id, this.user).then(result => {
          console.log(result);
        });
      }
    },
    created() {
      this.getUser();
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
