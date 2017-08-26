<template>
  <div id="header">
    <div><i></i></div>
    <h1><a href="/">造梦之地</a></h1>
    <a href="/about/"><img :src="siteInfo.logo_url.value" :alt="siteInfo.title"></a>
  </div>
  <div id="sidebar-mask"></div>
</template>

<script>
  import store from '../store/index';

  export default {
    name: 'header',
    data() {
      return {
        siteInfo: {}
      }
    },
    mounted() {
      store.fetchOption(this).then(result => {
        let obj = {};
        result.forEach(value => {
          obj[value.key] = value;
        });
        this.siteInfo = obj;
        if (this.siteInfo['title']) {
          document.title = this.siteInfo['title'].value;
        }
        if (this.siteInfo['comment']) {
          let value = JSON.parse(this.siteInfo['comment'].value);
          let type = value.type;
          let name = value.name;
        }
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
