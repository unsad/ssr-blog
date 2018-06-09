<template>
  <div>
     <h2 :class="secondTitle.container">
        <span :class="secondTitle.text">
          <object :class="secondTitle.deco" type="image/svg+xml" data="../../static/mask.svg">This browser sucks</object>
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
};
</script>
<style lang="stylus" module="secondTitle" rel="stylesheet/stylus">

.container
  color: #fff 
  text-align: center
  margin: 1rem 0
  .text
    position: relative
    font-family: 'jackey_handwriteregular';
    background: #000
    letter-spacing: 0.1rem 
    display: inline-block
  .deco 
    position: absolute
    height: 100%
    transform: rotate(-20deg)
    left: -10%
    top: -50%

@media only screen and (min-width: 769px)
  .text
    font-size: 2rem
    padding: 1rem


@media only screen and (max-width: 768px)
  .text
    font-size: 1.5rem
    padding: 0.5rem
</style>
