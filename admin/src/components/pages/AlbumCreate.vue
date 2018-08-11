<template>
  <div class="top">
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
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'albumCreate',
    props: ['model'],
    data() {
      return {
        title: '',
        form: {}
      }
    },
    methods: {
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
      handleSuccess(response, file, filelist) {
        let key = response.key;
        let prefix = this.supportWebp ? 'webp/' : '';
        const preUrl = `${this.bucketHost}/${encodeURI(key)}`;
        const url = `${this.bucketHost}/${prefix}${encodeURI(key)}`;

        this.$store.dispatch('POST', {
          model: this.model,
          form: {
            url
          }
        }).then(() => {
          this.$message({
            'type': 'success',
            message: '同步数据库成功'
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '同步数据库失败'
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
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
