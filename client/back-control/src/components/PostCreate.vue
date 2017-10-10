<template>
  <div class="wrap">
    <div class="manage-container">
      <form onsubmit="return false">
        <div class="row">
          <div class="col-xs-9">
            <div class="form-group">
              <label for="" class="control-label">
                <span>撰写文章</span>
              </label>
              <input v-model="post.title" type="text" name="title" placeholder="标题">
            </div>
            <div class="pathname">
              <span>{{site_url}}{{isPost ? '/post/' : '/page/'}}</span>
              <div class="form-group">
                <input :disabled="shouldPathDisabled" v-model="post.pathName" type="text" name="pathname"></div>
            </div>
            <div class="form-group">
              <markdown-editor @filter="getFinalContent" :content="post.markdownContent"></markdown-editor>
              <p><span>文章使用markdown格式</span></p>
            </div>
          </div>
          <div class="col-xs-3">
            <div class="button-group">
              <button type="submit">
                保存草稿
              </button>
              <span></span>
              <button type="submit" @click="submit">
                发布文章
              </button>
            </div>
            <div><label for="">{{id === '' ? '发布日期' : '修改日期'}}</label>
              <div>
                <div class="rdt">
                  <date-picker :date="startTime" :limit="limit" :option="option"></date-picker>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="isPost">
            <label for="">分类</label>
            <ul>
              <li v-for="cate of cates">
                <label for="">
                  <input type="radio" name="cate" :value="cate.name" v-model="postCate">
                  <span>{{cate.name}}</span>
                </label>
              </li>
            </ul>
          </div>
          <div class="form-group" v-if="isPost">
            <label for="">标签</label>
            <ul>
              <li v-for="tag of tags">
                <label for="">
                  <input type="checkbox" :value="tag.name" v-model="postTags">
                  <span>{{tag.name}}</span>
                </label>
              </li>
            </ul>
          </div>
          <div class="form-group" v-if="isPost">
            <label for="">公开度</label>
            <div>
              <div>
                <div class="radio"><label for=""></label><input type="radio" value="1"
                                                                v-model="isPublic"><span>公开</span></div>
              </div>
              <div>
                <div class="radio"><label for=""></label><input type="radio" value="0"
                                                                v-model="isPublic"><span>不公开</span></div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="">权限控制</label>
            <div>
              <label for="">
                <input type="checkbox" v-model="allowComment"><span>允许评论</span>
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
  import marked from '../utils/marked';
  import moment from 'moment';
  import store from '../store/index';

  export default {
    name: 'postCreate',
    components: {
      Top,
      MarkdownEditor,
      DatePicker
    },
    props: {
      shouldTipShow: Boolean,
      tipType: String,
      tipInfo: String,
      currentRoute: String
    },
    data() {
      return {
        startTime: {
          time: ''
        },
        endTime: {
          time: ''
        },
        test: '',
        multiTime: '',
        option: {
          type: 'day',
          week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          month: ['一月', '二月', '三月', '四月', '五月',
            '六月', '七月', '八月', '九月', '十月', '十一月',
            '十二月'],
          format: 'YYYY-MM-DD HH:mm:ss',
          placeholder: '请选择时间',
          inputStyle: {
            'display': 'inline-block',
            'padding': '6px',
            'line-height': '22px',
            'font-size': '16px',
            'border': '2px solid #fff',
            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
            'border-radius': '2px',
            'color': '#5F5F5F'
          },
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: '确认',
            cancel: '取消'
          }
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
          }],
        id: '',
        isPost: true,
        shouldPathDisabled: false,
        cates: [],
        postCate: [],
        postCateBackup: [],
        tags: [],
        postTags: [],
        postTagsBackup: [],
        allowComment: true,
        isPublic: '1',
        site_url: '',
        post: {
          updateAt: '',
          createAt: '',
          allowComment: 1,
          pathName: '',
          type: '',
          title: '',
          isPublic: '1',
          markdownContent: '',
          finalContent: ''
        }
      }
    },
    beforeRouteUpdate(to) {
      this.isPost = to.path.indexOf('/post/') > -1;
      if (typeof to.params.id === 'undefined') return;
      this.id = to.params.id;
      this.shouldPathDisabled = true;
      let tempResult;
      store.fetchBlogByID(this.id).then(result => {
        this.post = result;
        this.starttime = this.post.updatedAt || this.post.createdAt;
        this.option.placeholder = this.starttime;
        this.allowComment = this.post.allowComment === '1';

        if (this.isPost === false) return;

        this.postTags = result.tags;
        this.postCate = result.category;
      });
    },
    methods: {
      getFinalContent(val) {
        this.post.finalContent = val;
      },
      submit() {
        this.isSubmitting = true;
        let time = moment().format('YYYY-MM-DD HH:mm:ss').toString();
        setTimeout(() => {
          this.$router.push({path: this.isPost ? '/post/list' : '/page/list'});
        }, 2000);
        if (this.id === '') {
          let newPost = {
            title: this.post.title,
            type: this.isPost ? '0' : '1',
            updatedAt: time,
            createdAt: time,
            status: 3,
            pathName: this.post.pathName,
            summary: marked(this.post.finalContent.split('<!-- more -->')[0].replace(/<[>]*>/g, '')),
            markdownContent: this.post.finalContent,
            content: marked(this.post.finalContent),
            allowComment: this.allowComment === true ? '1' : '0',
            isPublic: this.isPublic === '1' ? 1 : 0,
            commentNum: 0,
            options: {},
            category: this.postCate,
            tags: this.postTags
          };
          store.newBlog(newPost).then(body => {
            console.log('postCreate', body);
            this.isSubmitting = false;
            this.deletePostAndTag(body._id);
          })
        } else {
          this.post = Object.assign({}, this.post, {
            updatedAt: time,
            summary: marked(this.post.finalContent.split('<!-- more -->')[0].replace(/<[>]*>/g, '')),
            markdownContent: this.post.finalContent,
            content: marked(this.post.finalContent),
            allowComment: this.allowComment === true ? '1' : '0',
            isPublic: this.isPublic === '1' ? 1 : 0,
            category: this.postCate,
            tags: this.postTags
          });
          store.patchBlog(this.id, this.post).then(body => {
            console.log('postPatched', body);
            this.isSubmitting = false;
          });
        }
      }
    },
    mounted() {
      store.fetchOption({key: 'site_url'}).then(result => {
        if (Array.isArray(result) && result[0]) {
          this.site_url = result[0].value;
        }
      });
      if (this.isPost === false) return;
      store.fetchCate().then(result => {
        this.cates = result;
      });
      store.fetchTag().then(result => {
        this.tags = result;
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
