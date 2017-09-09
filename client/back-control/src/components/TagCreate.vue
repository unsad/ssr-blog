<template>
  <div class="wrap">
    <div class="manage-container">
      <form model="{tagInfo}" onsubmit="return false">
        <div class="form-group">
          <label for="">标签名称</label>
          <div>
            <input type="text" name="name" v-model="name" validate="required">
          </div>
        </div>
        <div class="form-group">
          <label for="">缩略名</label>
          <div>
            <input type="text" name="pathname" validate="required">
          </div>
        </div>
        <div class="form-group">
          <button type="submit" @click="submitTag">{{isSubmitting ? '提交中' : '提交'}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Top from './Top';
  import store from '../store/index';

  export default {
    name: 'tagCreate',
    data() {
      return {
        name: '',
        id: '',
        isSubmitting: false
      }
    },
    methods: {
      submitTag() {
        this.isSubmitting = true;
        this.tipInfo = '已成功提交';
        this.tipType = 'success';
        this.shouldTipShow = true;
        setTimeout(() => {
          this.shouldTipShow = true;
          this.$router.go({path: '/tag/list'});
        }, 2000);
        if (this.id === '') {
          store.newTag(this.name).then(body => {
            console.log('tagCreate', body);
            this.isSubmitting = false;
          });
        } else {
          store.patchTag(this.id, {name: this.name}).then(body => {
            console.log('tagPatched', body);
            this.isSubmitting = false;
          });
        }
      }
    },
    route: {
      data({to}) {
        if (typeof to.params.id === 'undefined') return;
        this.id = to.params.id;
        store.fetchTagById(this.id).then(result => {
          this.name = result.name;
        });
      }
    },
    props: {
      shouldTipShow: Boolean,
      tipType: String,
      tipInfo: String,
      currentRoute: String
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
