<template>
  <footer id='footer' class='inner'> &copy;2018&nbsp;-&nbsp; {{siteInfo.title.value}} &nbsp;<br> Powered by&nbsp;<a target="_blank"
     href="https://github.com/vuejs/vue">Vue2</a>&nbsp;&amp;&nbsp;<a target="_blank" href="https://github.com/koajs/koa">Koa2</a>
  </footer>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'footer',
    computed: {
      ...mapGetters([
        'siteInfo'
      ])
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
#footer 
  margin-top: 1rem
  text-align: center
</style>
