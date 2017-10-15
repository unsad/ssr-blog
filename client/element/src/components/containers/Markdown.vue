<template>
  <div class="md-panel">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">加粗</el-menu-item>
      <el-menu-item index="2">斜体</el-menu-item>
      <el-menu-item index="3">链接</el-menu-item>
      <el-menu-item index="4">引用</el-menu-item>
      <el-menu-item index="5"></el-menu-item>
      <el-menu-item index="6"></el-menu-item>
      <el-menu-item index="7"></el-menu-item>
      <el-menu-item index="8"></el-menu-item>
      <el-menu-item index="9"></el-menu-item>
      <el-menu-item index="10"></el-menu-item>
      <el-submenu index="11">
        <template slot="title">切换模式</template>
        <el-menu-item index="11-1">编辑模式</el-menu-item>
        <el-menu-item index="11-2">分屏模式</el-menu-item>
        <el-menu-item index="11-3">预览模式</el-menu-item>
        <el-menu-item index="11-4">全屏模式</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="md-editor" :class="{
      'edit': mode === 'edit',
      'preview': mode === 'preview',
      'split': mode === 'split'
    }">
      <textarea ref="markdown" :value="input" @input="handleInput"></textarea>
      <div class="md-preview markdown" v-html="compileMarkdown"></div>
    </div>
  </div>
</template>

<script>
  import marked from '../../utils/marked'
  import _ from 'lodash'
  export default {
    name: 'markdown',
    data() {
      return {
        input: '# Hello, my markdown editor',
        mode: 'split'
      }
    },
    computed: {
      compiledMarkdown() {
        return marked(this.input, {sanitize: true});
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if (keyPath.length === 1) {
          switch (key) {
            case '1': this._boldText() ; break;
            case '2': this._italicText() ; break;
            case '3': this._linkText() ; break;
            case '4': this._blockquoteText() ; break;
            case '5': this._codeText() ; break;
            case '6': this._insertMore() ; break;
            case '7': this._listOlText() ; break;
            case '8': this._listUlText() ; break;
            case '9': this._headerText() ; break;
            case '10': this._insertMore() ; break;
          }
        } else if (keyPath.length === 2) {
          switch (key) {
            case '11-1': this.mode = 'edit';break;
            case '11-2': this.mode = 'split';break;
            case '11-3': this.mode = 'preview';break;
            case '11-4': this.mode = 'edit';break;
          }
        }
      },
      handleInput: _.debounce(function(e) {
        let value = e.target.value;
        this.input = value;
        this.$emit('input', value);
      }, 300),
      _preInputText(text, preStart, preEnd) {
        let textControl = this.$refs.markdown;
        const start = textControl.selectionStart;
        const end = textControl.selectionEnd;
        const origin = this.input;
        if (start !== end) {
          const exist = origin.slice(start, end);
          text = text.slice(0, preStart) + exist + text.slice(preEnd);
          preEnd = preStart + exist.length;
        }
        let input = origin.slice(0, start) + text + origin.slice(end);
        this.input = input;
      },
      _insertMore() {
        this._preInputText('\n<!--more-->', 12, 12);
      },
      _boldText() {
        this._preInputText('**加粗文字**', 2, 6);
      },
      _italicText() {
        this._preInputText('_斜体文字_', 1, 5);
      },
      _linkText(url = 'github.com/smallpath/blog', text = '链接文本') {
        this._preInputText(`[${text}](${url})`, 1, 1 + text.length);
      },
      _blockquoteText() {
        this._preInputText('\n> 引用', 3, 5);
      },
      _codeText() {
        this._preInputText('\n```\ncode block\n```',5, 15);
      },
      _listUlText() {
        this._preInputText('- 无序列表项0\n- 无序列表项1', 2, 8);
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
