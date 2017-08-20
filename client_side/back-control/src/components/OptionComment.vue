<template>
  <div class="wrap">
    <div class="manage-container">
      <form onsubmit="return false" class="options-comment">
        <div class="form-group">
          <label>评论类型</label>
          <div class="form-group">
            <div>
              <div class="">
                <div class="radio">
                  <label><input name="type" type="radio" value="disqus" v-model="picked"><span>评论</span></label>
                </div>
              </div>
              <div class="">
                <div class="radio">
                  <label><input name="type" value="custom" v-model="picked" type="radio"><span>自定义</span></label>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label><span>网站名称</span></label>
            <div class="form-group"><input type="text" value="unsad" name="name" v-model="name"></div>
          </div>
          <button type="submit" @click="submit">
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
      tipType: String,
      tipInfo: String,
      currentRoute: String
    },
    data() {
      return {
        picked: 'disqus',
        name: '',
        option: {}
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
          let {type, name} = JSON.parse(obj['comment'].value);
          this.picked = type;
          this.name = name;
        });
      },
      submit() {
        this.tipInfo = '评论设置已更新';
        this.tipType = 'success';
        this.shouldTipShow = true;
        setTimeout(() => {
          this.shouldTipShow = false;
        }, 2000);
        let value = JSON.stringify({type: this.picked, name: this.name});
        store.patchOption(this, this.option['comment']._id, {value}).then(result => {
          console.log(value, result);
        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
