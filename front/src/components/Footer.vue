<template>
  <footer :class="footer.container"> 
    <div :class="footer.main">
      <span>&copy;2018&nbsp;&nbsp; {{siteInfo.title.value}}</span> &nbsp;<br> 
      <span>Powered by
        <a target="_blank" href="https://github.com/vuejs/vue">Vue</a>&nbsp;&amp;&nbsp;<a target="_blank" href="https://github.com/koajs/koa">Koa</a>
      </span>
    </div>
  </footer>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'myFooter',
    computed: {
      ...mapGetters([
        'siteInfo'
      ])
    }
  };
</script>
<style lang="stylus" module="footer" rel="stylesheet/stylus">
.container 
  margin-top: 1rem
  text-align: center
  .main
    display: inline-block
    width: 30%
    min-width: max-content
    border-top: .1rem solid #fff
    font-size: 1rem
    line-height: 1.5
    padding: 0.5rem 0
    color: #fff
    a 
      color: #fff
</style>
