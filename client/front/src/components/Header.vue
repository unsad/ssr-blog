<template>
  <div id="header">
    <div><i></i></div>
    <h1><a href="/">{{siteInfo.title.value}}</a></h1>
    <a href="/about/"><img :src="siteInfo.logo_url.value" :alt="siteInfo.title.value"></a>
  </div>
  <div id="sidebar-mask"></div>
</template>

<script>
  import store from '../store/index';

  export default {
    name: 'header',
    data() {
      return {
        siteInfo: {
          logo_url: {
            value: ''
          },
          title: {
            value: ''
          }
        }
      }
    },
    mounted() {
      store.fetchOption(this).then(result => {
        let obj = {};
        result.forEach(value => {
          obj[value.key] = value;
        });
        this.siteInfo = obj;
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
