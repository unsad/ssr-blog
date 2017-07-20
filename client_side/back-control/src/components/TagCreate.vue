<template>
  <div class="wrap">
    <top :current-route="currentRoute"></top>
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
        isSubmitting: false
      }
    },
    methods: {
      submitTag() {
        this.isSubmitting = true;
        store.newTag(this, this.name).then(body => {
          console.log('tagCreate', body);
          this.isSubmitting = false;
        });
      }
    },
    props: {
      shouldTipShow: Boolean,
      type: String,
      text: String,
      currentRoute: String
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
