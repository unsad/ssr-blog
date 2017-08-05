<template>
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
      <textarea name="content" v-model="content"></textarea>
    </div>
    <div class="md-preview"></div>
    <div class="md-spliter"></div>
  </div>
</template>

<script>
  export default {
    name: 'editor',
    props: {
      shouldTipShow: Boolean,
      type: String,
      content: String
    },
    data() {
      return {

      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
