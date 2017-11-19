<template>
  <div class="md-panel">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">加粗</el-menu-item>
      <el-menu-item index="2">斜体</el-menu-item>
      <el-menu-item index="3">引用</el-menu-item>
      <el-menu-item index="4">代码段</el-menu-item>
      <el-submenu index="5">
        <template slot="title">插入图片</template>
        <el-menu-item index="5-1"><i class="el-icon-upload2"></i>上传图片</el-menu-item>
        <el-menu-item index="5-2"><i class="el-icon-upload"></i>网络图片</el-menu-item>
      </el-submenu>
      <el-menu-item index="6"><i class="el-icon-more"></i>摘要</el-menu-item>
      <el-submenu index="7">
        <template slot="title">{{labels[mode]}}</template>
        <el-menu-item index="7-1">{{labels['edit']}}</el-menu-item>
        <el-menu-item index="7-2">{{labels['split']}}</el-menu-item>
        <el-menu-item index="7-3">{{labels['preview']}}</el-menu-item>
        <el-menu-item index="7-4">{{labels['full']}}</el-menu-item>
      </el-submenu>
      <el-menu-item index="8"><i class="el-icon-deit"></i>编辑TOC</el-menu-item>
    </el-menu>
    <el-dialog title="图片上传" v-model="isUploadShow" :modal="false">
      <el-upload
        action="//up.qbox.me/"
        drag
        :on-success="handleSuccess"
        :on-error="handleError"
        :show-file-list="true"
        :data="form"
        :before-upload="beforeUpload">
        <i class="el-icon-upload"></i>
        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">请确保后台已将七牛(server/conf/config.js)相关配置确认</div>
      </el-upload>
    </el-dialog>
    <div class="md-editor" :class="{
      'edit': mode === 'edit',
      'preview': mode === 'preview',
      'split': mode === 'split',
      'toc': mode === 'toc'
    }">
      <textarea ref="markdown" :value="value" @input="handleInput" @keydown.tab="handleTab"></textarea>
      <div v-if="mode !== 'toc'" class="md-preview markdown" v-html="compiledMarkdown"></div>
      <textarea v-else ref="toc" :value="toc" class="md-preview markdown" @input="handleTocInput"></textarea>
    </div>
  </div>
</template>

<script>
  import {marked}  from '../utils/marked'
  import moment from 'moment'
  import _ from 'lodash'

  export default {
    name: 'markdown',
    props: ['value', 'toc'],
    data() {
      return {
        labels: {
          'edit': '编辑模式',
          'split': '分屏模式',
          'preview': '预览模式',
          'full': '全屏模式',
          'toc': 'TOC模式'
        },
        mode: 'edit', // ['edit', 'split', 'preview', 'toc'],
        isUploadShow: false,
        supportWebp: false,
        upToken: '',
        bucketHost: '',
        key: '',
        form: {}

      }
    },
    computed: {
      compiledMarkdown() {
        return marked(this.value.replace( /<!--more--> / g, '')
      )
        ;
      }
    },
    methods: {
      handlePreview(file) {

      },
      handleSuccess(response, file, filelist) {
        let key = response.key;
        let prefix = this.supportWebp ? 'webp/' : '';
        const preUrl = `${this.bucketHost}/${encodeURI(key)}`;
        const url = `${this.bucketHost}/${prefix}${encodeURI(key)}`;

        this.$store.dispatch('GET_IMAGE_HEIGHT', {
          url: preUrl
        }).then(height => {
          const target = `<img height="${height}" src="${url}">`;
          this.$confirm(text, '上传成功，是否插入图片链接？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            closeOnClickModal: false
          }).then(() => {
            this.isUploadShow = false;
            this._preInputText(text, 12, 12);
            this.$message({
              type: 'success',
              message: '已插入图片链接'
            });
          }).catch(() => {
            this.isUploadShow = false;
            this.$message({
              type: 'info',
              message: '已取消图片链接'
            });
          });
        });
      },
      handleError(err, response, file) {
        if (err.status === 401) {
          this.$message.error('图片上传失败，请求中未带Token');
        } else {
          this.$message.error(JSON.stringify(err));
        }
      },
      handleSelect(key, keyPath) {
        if (keyPath.length === 1) {
          switch (key) {
            case '1':
              this._boldText();
              break;
            case '2':
              this._italicText();
              break;
            case '3':
              this._blockquoteText();
              break;
            case '4':
              this._codeText();
              break;
            case '6':
              this._insertMore();
              break;
            case '8':
              this.mode = 'toc';
              break;
          }
        } else if (keyPath.length === 2) {
          switch (key) {
            case '5-1':
              this._uploadImage();
              break;
            case '5-2':
              this._importImage();
              break;
            case '7-1':
              this.mode = 'edit';
              break;
            case '7-2':
              this.mode = 'split';
              break;
            case '7-3':
              this.mode = 'preview';
              break;
            case '7-4':
              this.mode = 'edit';
              break;
          }
        }
      },
      handleTab(e) {
        thie._preInputText('\t');
        e.preventDefault();
      },
      handleInput: _.debounce(function (e) {
        let value = e.target.value;
        this.input = value;
        this.$emit('input', value);
      }, 300),
      handleTocInput: _.debounce(function (e) {
        let value = e.target.value;
        this.$emit('change', value);
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
      _uploadImage() {
        this.isUploadShow = true;
      },
      beforeUpload(file) {
        let curr = moment().format('HHmmss').toString()
        let prefix = moment(file.lastModified).format('HHmmss').toString()
        let suffix = file.name;
        let key = encodeURI(`${curr}/${prefix}_${suffix}`);
        return this.$store.dispatch('GET_IMAGE_TOKEN', {
          key
        }).then(response => {
          this.upToken = response.upToken;
          this.key = response.key;
          this.bucketHost = response.bucketHost;
          this.supportWebp = response.supportWebp;
          if (this.bucketHost === '') {
            this.$notify.error('获取七牛token失败，请确认配置文件');
            return Promise.reject();
          }
          this.form = {
            key,
            token: this.upToken
          }
        });
      },
      _importImage () {
        this.$prompt('请输入图片链接', '导入图片链接', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          this._preInputText(`![](${value})`, 12, 12);
          this.$message({
            type: 'success',
            message: '已插入图片链接'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消插入图片链接'
          });
        });
      },
      _insertMore() {
        this._preInputText('<!--more-->', 12, 12)
      },
      _boldText () {
        this._preInputText('**加粗文字**', 2, 6)
      },
      _italicText () {
        this._preInputText('_斜体文字_', 1, 5)
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
  .md-editor
    width: 100%
    position: relative
    textarea
      box-sizing: border-box
      resize: none
      height: 100%
      width: 100%
      min-height: 500px
      padding: 15px 15px 0
</style>
