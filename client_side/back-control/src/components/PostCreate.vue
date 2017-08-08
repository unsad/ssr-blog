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
              <span>https://sweetalkto.me/post/</span>
              <div class="form-group">
                <input :disabled="shouldPathDisabled" v-model="post.pathName" type="text" name="pathname"></div>
              <span>.html</span>
            </div>
            <div class="form-group">
              <markdown-editor :content="post.markdownContent"></markdown-editor>
              <p><span>文章使用markdown格式</span></p>
            </div>
          </div>
          <div class="col-xs-3">
            <div class="button-group">
              <button type="submit">
                保存草稿
              </button>
              <span></span>
              <button type="submit" @click="sumbit">
                发布文章
              </button>
            </div>
            <div><label for="">{{this.id === '' ? '发布日期' : '修改日期'}}</label>
              <div>
                <div class="rdt">
                  <date-picker :time="starttime" :option="timeoption"></date-picker>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="isPost">
            <label for="">分类</label>
            <ul>
              <li v-for="cate of cates">
                <label for="">
                  <input type="checkbox" name="cate" :value="cate._id" v-model="postCate">
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
                  <input type="checkbox" :value="tag._id" v-model="postTags">
                  <span>{{tag.name}}</span>
                </label>
              </li>
            </ul>
          </div>
          <div class="form-group" v-if="isPost">
            <label for="">公开度</label>
            <div>
              <div>
                <div class="radio"><label for=""></label><input type="radio" value="1" v-model="isPublic"><span>公开</span></div>
              </div>
              <div>
                <div class="radio"><label for=""></label><input type="radio" value="0" v-model="isPublic"><span>不公开</span></div>
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
  import moment from 'moment';
  import store from '../store/index';

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
        timeoption: {
          type: 'min',
          week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          month: ['一月', '二月', '三月', '四月', '五月',
            '六月', '七月', '八月', '九月', '十月', '十一月',
            '十二月'],
          format: 'YYYY-MM-DD HH:mm:ss',
          placeholder: '请选择时间',
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
        post: {
          updateAt: '',
          createAt: '',
          allowComment: 1,
          pathName: '',
          type: '',
          title: '',
          isPublic: '1',
          markdownContent: ''
        }
      }
    },
    route: {
      data({to}) {
        this.isPost = to.path.indexOf('/post/') > -1;
        if (typeof to.params.id === 'undefined') return;
        this.id = to.params.id;
        this.shouldPathDisabled = true;
        let tempResult;
        store.fetchBlogByID(this, this.id).then(result => {
          this.post = result;
          this.starttime = this.post.updatedAt ||  this.post.createdAt;
          this.timeoption.placeholder = this.starttime;
          this.allowComment = this.post.allowComment === '1';

          if(this.isPost === false) return;

          store.fetchPostTags(this).then(result => {
            let obj = {};
            this.postTagsBackup = result.filter(value => value.postID === this.id).map(value => value._id);
            result = result.filter(val => val.postID === this.id);
            this.postTags = result.map(val => val.tagID);
          });

          store.fetchPostCate(this.then(result => {
            let obj = {};
            this.postCateBackup = result.filter(value => value.postID === this.id).map(value => value._id);
            result = result.filter(val => val.postID === this.id);
            this.postCate = result.map(val => val.categoryID);
          }));
        });
      }
    },
    methods: {
      submit() {
        this.isSubmitting = true;
        let time = moment().format('YYYY-MM-DD HH:mm:ss').toString();
        if (this.id === '') {
          let newPost = {
            title: this.post.title,
            type: this.isPost ? '0' : '1',
            updatedAt: time,
            createdAt: time,
            status: 3,
            pathName: this.post.status,
            summary: 'gg',
            markdownContent: this.post.markdownContent,
            content: 'gg',
            allowComment: this.allowComment === true ? '1' : '0',
            isPublic: this.isPublic === '1' ? 1 : 0,
            commentNum: 0,
            options: ''
          };
          store.newBlog(this, newPost).then(body => {
            console.log('postCreate', body);
            this.isSubmitting = false;
            this.deletePostAndTag(body._id);
          })
        } else {
          this.post = Object.assign({}, this.post, {
            updatedAt: time,
            summary: 'gg',
            markdownContent: this.post.markdownContent,
            content: 'gg',
            allowComment: this.allowComment === true ? '1' : '0',
            isPublic: this.isPublic === '1' ? 1 : 0
          });
          store.patchBlog(this, this.id, this.post).then(body => {
            console.log('postPatched', body);
            this.isSubmitting = false;
            this.deletePostAndTag(body._id);
          });
        }
      },
      deletePostAndTag(id) {
          this.postTagsBackup.forEach(value => {
            store.deletePostTags(this, value);
          });
          console.log(this.postCateBackup);
          this.postCateBackup.forEach(value => {
            store.deletePostCates(this, value);
          });
          this.postTags.forEach(value => {
            store.addPostTags(this, {
              postID: id,
              tagID: value
            });
          });
          this.postCate.forEach(value => {
            store.addPostCates(this, {
              postID: id,
              categoryID: value
            });
          });
        }
      }
    },
    mounted() {
      if (this.isPost === false) return;
      store.fetchCate(this).then(result => {
        this.cates = result;
      });
      store.fetchTag(this).then(result => {
        this.tags = result;
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
