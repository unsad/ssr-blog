<template>
  <div class="wrap">
    <div class="manage-container">
      <h3>网站统计代码</h3>
      <form action="#" onsubmit="return false" class="options-general">
      <div class="form-group">
        <div class="form-group">
          <textarea type="textarea" name="analyze_code" cols="30" rows="10"></textarea>
        </div>
        <p>统计代码</p>
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
    name: 'optionAnalytic',
    components: {
      Top
    },
    props: {
      shouldTipShow: Boolean,
      tipType: String,
      tipInfo: String,
      currentRoute: String
    },
    mounted() {
      this.getOption();
    },
    data() {
      return {
        option: {},
        analyze_code: ''
      }
    },
    methods: {
      getOption() {
        store.fetchOption().then(result => {
          let obj = {};
          result.forEach(value => {
            obj[value.key] = value;
          });
          this.option = obj;
          this.analyze_code = obj['anaylze_code'].value;
        });
      },
      submit() {
        this.tipInfo = '统计代码已更新';
        this.tipType = 'success';
        this.shouldTipShow = true;
        setTimeout(() => {
          this.shouldTipShow = false;
        }, 2000);
        store.patchOption(this.option['analyze_code']._id, {
          value: this.analyze_code
        }).then(result => {
          console.log(result);
        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
