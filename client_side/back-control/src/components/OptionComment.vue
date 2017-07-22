<template>
  <div class="wrap">
    <top :current-route="currentRoute"></top>
    <div class="manage-container">
      <form action="#" class="options-comment">
        <div class="form-group">
          <label>评论类型</label>
          <div class="form-group">
            <div>
              <div class="">
                <div class="radio">
                  <label for=""><input type="radio"><span>评论</span></label>
                </div>
              </div>
              <div class="">
                <div class="radio">
                  <label for=""><input type="radio"><span>自定义</span></label>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for=""><span>网站名称</span></label>
            <div class="form-group"><input type="text" value="unsad"></div>
          </div>
          <button type="submit">
            提交
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
    name: 'optionComment',
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

      }
    },
    mounted() {
      this.getOption();
    },
    methods: {
      getOption() {
        store.fetchOption(this).then(result => {
          let obj = {};
          result.forEach(value => {
            obj[value.key] = value;
          });
          this.option = obj;
          this.analyze_code = obj['analyze_code'].value;
        });
      },
      submit() {
        store.patchOption(this, this.option['analyze_code']._id, {
          value: this.analyze_code
        }).then(result => {

        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
