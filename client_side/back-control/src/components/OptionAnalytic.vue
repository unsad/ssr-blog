<template>
  <div class="wrap">
    <top :current-route="currentRoute"></top>
    <div class="manage-container">
      <h3>网站统计代码</h3>
      <form action="#" class="options-general">
      <div class="form-group">
        <div class="form-group">
          <textarea name="analyze_code" cols="30" rows="10"></textarea>
        </div>
        <p>统计代码</p>
      </div>
      <button type="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Top from './Top'

  export default {
    name: 'optionAnalytic',
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
