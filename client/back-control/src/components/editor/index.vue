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
          <a href="" title="加粗(Ctrl + B)" @click="_boldText"><i></i></a>
        </li>
        <li class="tb-btn">
          <a href="" title="斜体(Ctrl + I)" @click="_italicText"><i></i></a>
        </li>
        <li class="tb-btn spliter" @click="_insertMore"></li>
        <li class="tb-btn">
          <a href="" title="链接(Ctrl + L)" @click="_insertMore"><i></i></a>
        </li>
        <li class="tb-btn">
          <a href="" title="引用(Ctrl + Q)" @click="_blockquoteText"><i></i></a>
        </li>
        <li class="tb-btn">
          <a href="" title="代码段(Ctrl + K)" @click="_codeText"><i></i></a>
        </li>
        <li class="tb-btn">
          <a href="" title="图片(Ctrl + G)" @click="_insertMore"><i></i></a>
        </li>
        <li class="tb-btn spliter"></li>
        <li class="tb-btn">
          <a href="" title="有序列表(Ctrl + O)" @click="_listOlText"><i></i></a>
        </li>
        <li class="tb-btn">
          <a href="" title="无序列表(Ctrl + U)" @click="_listUlText"><i></i></a>
        </li>
        <li class="tb-btn">
          <a href="" title="标题(Ctrl + H)" @click="_headerText"><i></i></a>
        </li>
        <li class="tb-btn spliter"></li>
        <li class="tb-btn">
          <a href="" title="插入more标签(Ctrl + M)" @click="_insertMore"><i></i></a>
        </li>
      </ul>
    </div>
    <div class="md-editor">
      <textarea name="result" id="myTextArea" @change="getHTMLFromMarkdown" v-model="result"></textarea>
    </div>
    <div class="md-preview"></div>
    <div class="md-spliter"></div>
  </div>
</template>
<script>
  import marked from 'marked';

  export default {
    name: 'editor',
    props: {
      shouldTipShow: Boolean,
      tipType: String,
      content: String
    },
    data() {
      return {
        result: ''
      }
    },
    created() {
      this.result = this.content;
    },
    methods: {
      getHTMLFromMarkdown() {
        this.$emit('filter', this.result);
      },
      _preInputText(text, preStart, preEnd) {
        let textControl = document.getElementById('myTextArea');
        const start = textControl.selectionStart;
        const end = textControl.selectionEnd;
        const origin = this.content;

        if (start !== end) {
          const exist = origin.slice(start, end);
          text = text.slice(0, preStart) + exist + text.slice(preEnd);
          preEnd = preStart + exist.length;
        }
        let content = origin.slice(0, start) + text + origin.slice(end);
        this.result = content;
        this.getHTMLFromMarkdown();
      },
      _insertMore() {
        this._preInputText('\n<! -- more -->', 12, 12);
      },
      _boldText() {
        this._preInputText('**加粗文字**', 2, 6);
      },
      _italicText() {
        this._preInputText('_斜体文字_', 1, 5);
      },
      _linkText(url = 'www.yourlink.com', text = '链接文本') {
        this._preInputText(`[${text}](${url})`, 1, 1 + text.length);
      },
      _blockquoteText() {
        this._preInputText('\n>引用', 3, 5);
      },
      _codeText() {
        this._preInputText('\n```\ncode block\n```', 5, 15);
      },
      _listUlText() {
        this._preInputText('- 无序列表项\n- 无序列表项1', 2, 8);
      },
      _listOlText() {
        this._preInputText('1. 有序列表项0\n2. 有序列表项1', 3, 9);
      },
      _headerText() {
        this._preInputText('## 标题', 3, 5);
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
