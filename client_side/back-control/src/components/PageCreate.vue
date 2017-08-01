<template>
  <div class="wrap">
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
                <markdown-editor></markdown-editor>
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
              <date-picker></date-picker>
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
                <div class="radio"><label for=""></label><input type="radio"><span>公开</span></div>
              </div>
              <div>
                <div class="radio"><label for=""></label><input type="radio"><span>不公开</span></div>
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
  import Top from './Top';
  import MarkdownEditor from './editor/index';
  import DatePicker from 'vue-datepicker/vue-datepicker-es6.vue';
  import moment from 'moment';

  export default {
    name: 'pageCreate',
    components: {
      Top,
      MarkdownEditor,
      DatePicker
    },
    props: {
      shouldTipShow: Boolean,
      type: String,
      text: String,
      currentRoute: String
    },
    data() {
      return {
        starttime: '',
        endtime: '2016-01-19',
        test: '',
        multiTime: '',
        option: {
          type: 'day',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May',
            'June', 'Jujy', 'August', 'September', 'October', 'November',
            'December'],
          format: 'YYYY-MM-DD',
          placeholder: 'when?',
          inputStyle: {},
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: 'Ok',
            cancel: 'Cancel'
          },
          overlayOpacity: 0.5,
          dismissible: true
        },
        timeoption: {
          type: 'min',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May',
            'June', 'Jujy', 'August', 'September', 'October', 'November',
            'December'],
          format: 'YYYY-MM-DD HH:mm'
        },
        limit: [
          {
            type: 'weekday',
            available: [1, 2, 3, 4, 5]
          },
          {
            type: 'fromto',
            from: '2016-02-01',
            to: '2016-02-20'
          }]
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
