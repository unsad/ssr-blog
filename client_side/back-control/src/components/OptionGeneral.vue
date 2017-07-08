<template>
  <div class="wrap">
    <top :current-route="currentRoute"></top>
    <div class="manage-container">
      <form action="#">
        <div class="form-group">
          <label for="">站点名称</label>
          <div class="form-group">
            <input type="text" name="title" value="unsad">
          </div>
        </div>
        <div class="form-group">
          <label for="">LOGO地址</label>
          <div class="form-group">
            <input type="text" name="logo_url">
          </div>
          <p>
            <span>尺寸：140X140</span>
            <span>上传</span>
          </p>
        </div>
        <div class="form-group"><label for="">站点描述</label>
          <div class="form-group">
            <input type="text" name="description">
          </div>
        </div>
        <div class="form-group">
          <label for="">网站地址</label>
          <div class="form-group">
            <input type="text" name="site_url">
          </div>
        </div>
        <div class="form-group">
          <label for="">favicon地址</label>
          <div class="form-group">
            <input type="text" name="favicon_url">
          </div>
          <p><span>尺寸：128X128</span>
            <span>上传</span>
          </p>
        </div>
        <div class="form-group"><label for="">关键词</label>
          <div class="form-group">
            <input type="text" name="keywords">
            <p>请以半角逗号,分隔关键字</p>
          </div>
        </div>
          <div class="form-group">
            <label for="">GitHub地址</label>
            <div class="form-group">
              <input type="text" name="github_url">
            </div>
          </div>
          <div class="form-group">
            <label for="">网站备案号</label>
            <div class="form-group">
              <input type="text" name="miitbeian">
            </div>
          </div>
        <button type="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Top from './Top'

  export default {
    name: 'optionGeneral'
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
