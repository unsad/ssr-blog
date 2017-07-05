<template>
  <div class="wrap">
    <top :current-route="currentRoute"></top>
    <div class="manage-container">
      <form>
        <div class="form-group">
          <label for="">类型名称</label>
          <div>
            <input type="text">
          </div>
        </div>
        <div class="form-group">
          <label for="">缩略名</label>
          <div>
            <input type="text">
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
    name: 'cateCreate',
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
