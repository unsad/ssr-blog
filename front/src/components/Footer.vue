<template>
  <footer id='footer' class='inner'> &copy; 2016&nbsp;-&nbsp; {{siteInfo.title.value}} &nbsp;-&nbsp;<a href="/">smallpath.me</a> <br> Powered by&nbsp;<a target="_blank"
     href="https://github.com/vuejs/vue">Vue2</a>&nbsp;&amp;&nbsp;<a target="_blank" href="https://github.com/koajs/koa">Koa2</a>
  </footer>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'footer',
    data() {
      const isInitialRender = !this.$root._isMounted;

      return {
        siteInfo: this.$store.getters.siteInfo
      }
    },
    computed: {
      ...mapGetters([
        'siteInfo'
      ])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
