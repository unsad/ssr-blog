<template>
  <footer id='footer' class='inner'> &copy; 2016&nbsp;-&nbsp; {{title}} &nbsp;-&nbsp;<a href="/">smallpath.me</a> <br> Powered by&nbsp;<a target="_blank"
     href="https://github.com/vuejs/vue">Vue</a>&nbsp;&amp;&nbsp;<a target="_blank" href="https://github.com/koajs/koa/tree/v2.x">Koa2</a>
  </footer>
</template>

<script>
  import store from '../store/index';

  export default {
    name: 'footer',
    data() {
      return {
        title: ''
      }
    },
    mounted() {
      store.fetchOptionByJSON(this, {key: 'title'}).then(result => {
        if (Array.isArray(result) && result[0]) {
          this.title = result[0].value;
        }
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
