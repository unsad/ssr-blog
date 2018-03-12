<template>
  <div>
     <h2 class="second-title">
        <span class="second-title-text">
          <object class="second-title-deco" type="image/svg+xml" data="../../static/mask.svg">This browser sucks</object>
          {{ `" ${secondText} "` }}
        </span>
      </h2>
  </div>
</template>
<script>
export default {
  name: 'secondTitle',
  data() {
    return {

    };
  },
  props: ['secondText']
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .second-title
    color: #fff 
    text-align: center
    margin: 1rem 0
    .second-title-text
      position: relative
      font-family: 'jackey_handwriteregular';
      font-size: 2rem
      background: #000
      letter-spacing: 0.1rem 
      padding: 1rem
      display: inline-block
    .second-title-deco 
      position: absolute
      height: 100%
      transform: rotate(-20deg)
      left: -10%
      top: -50%
</style>
