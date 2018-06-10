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
  text-align: center
  margin-top: $space-middle
  .main
    display: inline-block
    width: 30%
    min-width: max-content
    border-top: .1rem solid #fff
    font-size: $font-size-small
    line-height: 1.5
    padding: $space-small 0
    color: $main-third-color
    a 
      color: $main-third-color
</style>
