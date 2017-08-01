<template>
  <div class="wrap">
    <div class="manage-container">
      <form onsubmit="return false">
        <div class="form-group">
          <label for="">站点名称</label>
          <div class="form-group">
            <input type="text" v-model="title" name="title">
          </div>
        </div>
        <div class="form-group">
          <label for="">LOGO地址</label>
          <img :src="`${site_url}/static/upload/201605/logo.png?m=1474296766757`" alt="logo">
          <div class="form-group">
            <input type="text" v-model="logo_url" name="logo_url">
          </div>
          <p>
            <span>尺寸：140X140</span>
            <button type="button"><span>上传</span></button>
            <input type="file" accept="image/*">
          </p>
        </div>
        <div class="form-group">
          <label for="">站点描述</label>
          <div class="form-group">
            <input type="text" name="description" v-model="description">
          </div>
        </div>
        <div class="form-group">
          <label for="">网站地址</label>
          <div class="form-group">
            <input type="text" name="site_url" v-model="site_url">
          </div>
        </div>
        <div class="form-group">
          <label for="">favicon地址</label>
          <img :src="`${site_url}/favicon.ico?m=1474296766757`" alt="logo">
          <div class="form-group">
            <input type="text" name="favicon_url" v-model="favicon_url">
          </div>
          <p>
            <span>尺寸：128X128</span>
            <button type="button"><span>上传</span></button>
            <input type="file" accept="image/x-icon">
          </p>
        </div>
        <div class="form-group">
          <label for="">关键词</label>
          <div class="form-group">
            <input type="text" name="keywords" v-model="keywords">
            <p>请以半角逗号,分隔关键字</p>
          </div>
        </div>
          <div class="form-group">
            <label for="">GitHub地址</label>
            <div class="form-group">
              <input type="text" name="github_url" v-model="github_url">
            </div>
          </div>
          <div class="form-group">
            <label for="">网站备案号</label>
            <div class="form-group">
              <input type="text" name="miitbeian" v-model="miitbeian">
            </div>
          </div>
        <button type="submit" @click="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Top from './Top';
  import store from '../store/index';

  export default {
    name: 'optionGeneral',
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
        option: {},
        title: '',
        logo_url: '',
        description: '',
        site_url: '',
        favicon_url: '',
        keywords: '',
        twitter_url: '',
        github_url: '',
        github_blog: '',
        miitbeian: '',
        image_upload: ''
      }
    },
    methods: {
      getOption() {
        store.fetchOption(this).then(result => {
          let obj = {};
          result.forEach(value => {
            obj[value.key] = value;
            if (typeof this[value.key] !== 'undefined') {
              this[value.key] = value.value;
            }
          });
          this.option = obj;
        });
      },
      submit() {
        Object.keys(this.option).forEach(name => {
          let value = this.option[name];
          if (typeof this[value.key] === 'undefined') return;
          if (this[value.key] === value.value) return;
          store.patchOption(this, value._id, {
            value: this[value.key]
          }).then(result => {
            value.value = this[value.key];
          });
        });
      }
    },
    mounted() {
      this.getOption();
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
