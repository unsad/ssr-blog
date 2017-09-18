<template>
  <div>
    <div class="manage-container">
      <form onsubmit="return false">
        <div class="form-group">
          <label>名称</label>
          <div>
            <input type="text" name="name" label="名称" v-model="name" validate="required">
          </div>
        </div>
        <div class="form-group">
          <label>版本号</label>
          <div>
            <input type="text" name="version" label="版本号" v-model="version" validate="required">
          </div>
        </div>
        <div class="form-group">
          <label>下载链接</label>
          <div>
            <input type="text" name="link" label="下载链接" v-model="path" validate="required">
          </div>
        </div>
        <div class="form-group">
          <button type="submit" @click="submitTag">
            {{isSubmitting ? '提交中...' : '提交'}}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Top from './Top';
  import store from '../store/index';

  export default {
    name: 'updateCreate',
    components: {
      Top
    },
    props: {
      shouldTipShow: Boolean,
      tipType: String,
      tipInfo: String,
      currentRoute: String
    },
    data() {
      return {
        name: '',
        path: '',
        version: '',
        id: '',
        isSubmitting: false
      }
    },
    route: {
      data({to}) {
        if (typeof to.params.id === 'undefined') {
          return;
        }
        this.id = to.params.id;
        store.fetchVersionById(this.id).then(result => {
          this.name = result.name;
          this.path = result.path;
          this.version = result.version;
        });
      }
    },
    methods: {
      submitTag() {
        this.isSubmitting = true;
        setTimeout(() => {
          this.$router.push({
            path: '/update/list'
          });
        }, 2000);
        if (this.id === '') {
          store.newVersion({
            name: this.name,
            path: this.path,
            version: this.version
          }).then(result => {
            this.isSubmitting = false;
          });
        } else {
          store.patchVersion(this.id, {
            name: this.name,
            path: this.path,
            version: this.version
          }).then(result => {
            this.isSubmitting = false;
          });
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
