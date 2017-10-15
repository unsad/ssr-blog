<template>
  <div class="md-panel">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">加粗</el-menu-item>
      <el-menu-item index="2">斜体</el-menu-item>
      <el-menu-item index="3">链接</el-menu-item>
      <el-menu-item index="4">引用</el-menu-item>
      <el-menu-item index="5">代码段</el-menu-item>
      <el-menu-item index="6">图片</el-menu-item>
      <el-menu-item index="7">插入摘要</el-menu-item>
      <el-submenu index="11">
        <template slot="title">{{labels[mode]}}</template>
        <el-menu-item index="11-1">labels['edit']</el-menu-item>
        <el-menu-item index="11-2">labels['split']</el-menu-item>
        <el-menu-item index="11-3">labels['preview']</el-menu-item>
        <el-menu-item index="11-4">labels['full']</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="md-editor" :class="{
      'edit': mode === 'edit',
      'preview': mode === 'preview',
      'split': mode === 'split'
    }">
      <textarea ref="markdown" :value="value" @input="handleInput"></textarea>
      <div class="md-preview markdown" v-html="compileMarkdown"></div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import hljs from 'highlight.js'
  import _ from 'lodash'

  marked.setOptions({
    highlight: function(code) {
      return hljs.hightlightAuto(code).value
    }
  });

  export default {
    name: 'markdown',
    props: ['value'],
    data() {
      return {
        labels: {
          'edit': '编辑模式',
          'split': '分屏模式',
          'preview': '预览模式',
          'full': '全屏模式'
        },
        mode: 'split' // ['edit', 'split', 'shrink']
      }
    },
    computed: {
      compiledMarkdown() {
        return marked(this.value.replace(/<!--more--/g, '=====> 文章摘要结束'), {sanitize: true});
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if (keyPath.length === 1) {
          switch (key) {
            case '1': this._boldText(); break;
            case '2': this._italicText(); break;
            case '3': this._linkText(); break;
            case '4': this._blockquoteText(); break;
            case '5': this._codeText(); break;
            case '6': this._insertMore(); break;
            case '7': this._insertMore(); break;
          }
        } else if (keyPath.length === 2) {
          switch (key) {
            case '11-1': this.mode = 'edit'; break;
            case '11-2': this.mode = 'split'; break;
            case '11-3': this.mode = 'preview'; break;
            case '11-4': this.mode = 'edit'; break;
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
        const origin = this.value;
        if (start !== end) {
          const exist = origin.slice(start, end);
          text = text.slice(0, preStart) + exist + text.slice(preEnd);
          preEnd = preStart + exist.length;
        }
        let input = origin.slice(0, start) + text + origin.slice(end);
        this.$emit('input', input);
      },
      _insertMore () {
        this._preInputText('<!--more-->', 12, 12)
      },
      _boldText () {
        this._preInputText('**加粗文字**', 2, 6)
      },
      _italicText () {
        this._preInputText('_斜体文字_', 1, 5)
      },
      _linkText (url = 'github.com/smallpath/blog', text = '链接文本') {
        this._preInputText(`[${text}](${url})`, 1, 1 + text.length)
      },
      _blockquoteText () {
        this._preInputText('\n> 引用', 3, 5)
      },
      _codeText () {
        this._preInputText('\n```\ncode block\n```', 5, 15)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
