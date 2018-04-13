<template>
    <router-link tag="div" :to="{path: '/'}" id="back" :style="position">
        <object class="back-deco" type="image/svg+xml" data="../../static/back.svg">This browser sucks</object>
    </router-link>
</template>
<script>
export default {
  name: 'back',
  props: {
    position: {
      type: Object,
      default: () => ({
        left: '1rem',
        bottom: '1rem'
      })
    }
  },
  data() {
    return {

    };
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
#back
  position: fixed
  cursor: pointer
  .back-deco
    pointer-events: none

@media only screen and (min-width : 769px)
  #back 
    width: 10rem


@media only screen and (max-width : 768px)
  #back 
    width: 6rem

</style>
