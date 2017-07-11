<template>
  <div class="wrap">
    <top :current-route="currentRoute"></top>
    <div class="manage-container">
      <form action="#">
        <div class="row">
          <div class="col-xs-9">
            <div class="form-group">
              <label for="" class="control-label">
                <span>撰写文章</span>
              </label>
              <input type="text" name="title" placeholder="标题">
            </div>
            <div class="pathname">
              <span>https://sweetalkto.me/post/</span>
              <div class="form-group">
                <input type="text" name="pathname"></div><span>.html</span>
            </div>
            <div class="form-group">
              <div class="md-panel">
                <div class="md-menubar">
                  <ul class="md-modebar">
                    <li>
                      <a href="" title="预览模式"><i></i></a>
                    </li>
                    <span></span>
                    <li>
                      <a href="" title="分屏模式"><i></i></a>
                    </li>
                    <span></span>
                    <li>
                      <a href="" title="编辑模式"><i></i></a>
                    </li>
                    <span></span>
                    <li>
                      <a href="" title="全屏模式"><i></i></a>
                    </li>
                    <span></span>
                  </ul>
                  <ul class="md-toolbar">
                    <li class="tb-btn">
                      <a href="" title="加粗(Ctrl + B)"><i></i></a>
                    </li>
                    <li class="tb-btn">
                      <a href="" title="斜体(Ctrl + I)"><i></i></a>
                    </li>
                    <li class="tb-btn spliter"></li>
                    <li class="tb-btn">
                      <a href="" title="链接(Ctrl + L)"><i></i></a>
                    </li>
                    <li class="tb-btn">
                      <a href="" title="引用(Ctrl + Q)"><i></i></a>
                    </li>
                    <li class="tb-btn">
                      <a href="" title="代码段(Ctrl + K)"><i></i></a>
                    </li>
                    <li class="tb-btn">
                      <a href="" title="图片(Ctrl + G)"><i></i></a>
                    </li>
                    <li class="tb-btn spliter"></li>
                    <li class="tb-btn">
                      <a href="" title="有序列表(Ctrl + O)"><i></i></a>
                    </li>
                    <li class="tb-btn">
                      <a href="" title="无序列表(Ctrl + U)"><i></i></a>
                    </li>
                    <li class="tb-btn">
                      <a href="" title="标题(Ctrl + H)"><i></i></a>
                    </li>
                    <li class="tb-btn spliter"></li>
                    <li class="tb-btn">
                      <a href="" title="插入more标签(Ctrl + M)"><i></i></a>
                    </li>
                  </ul>
                </div>
                <div class="md-editor">
                  <textarea name="content" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="md-preview"></div>
                <div class="md-spliter"></div>
              </div>
              <p><span>文章使用markdown格式</span></p>
            </div>
          </div>
          <div class="col-xs-3">
            <div class="button-group">
              <button type="submit">
                保存草稿
              </button>
              <span></span>
              <button type="submit">
                发布文章
              </button>
            </div>
            <div><label for="">发布日期</label>
              <div>
                <div class="rdt">
                  <input type="text">
                  <div class="rdtPicker"></div>
                </div>
              </div></div>
          </div>
          <div class="form-group">
            <label for="">分类</label>
            <ul>
              <li><input type="checkbox"><span>前端</span></li>
              <li><input type="checkbox"><span>后期</span></li>
            </ul>
          </div>
          <div class="form-group">
            <label for="">标签</label>
            <div><span><span><ul><li><span><input type="text"></span></li></ul></span></span></div>
          </div>
          <div class="form-group">
            <label for="">公开度</label>
            <div>
              <div>
                <div class="radio"><label for=""></label><input type="text" type="radio"><span>公开</span></div>
              </div>
              <div>
                <div class="radio"><label for=""></label><input type="text" type="radio"><span>不公开</span></div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="">权限控制</label>
            <div>
              <label for="">
                <input type="text"><span>允许评论</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Top from './Top'

  export default {
    name: 'postCreate',
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
