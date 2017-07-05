<template>
  <div class="wrap">
    <top :current-route="currentRoute"></top>
    <div class="manage-container">
      <form>
        <div class="form-group">
          <label for="">密码</label>
          <div>
            <input type="password">
          </div>
        </div>
        <div class="form-group">
          <label for="">确认密码</label>
          <div>
            <input type="password">
          </div>
        </div>
        <div class="form-group">
          <button type="submit">{{submitting ? '提交中' : '提交'}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Top from './Top'

  export default {
    name: 'userEdit',
    data() {
      return {

      }
    },
    props: {
      shouldTipShow: Boolean,
      type: String,
      text: String,
      currentRoute: String
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
