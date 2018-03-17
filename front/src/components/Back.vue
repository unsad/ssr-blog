<template>
    <router-link tag="div" :to="{path: '/'}" id="back">
        <object class="back-deco" type="image/svg+xml" data="../../static/back.svg">This browser sucks</object>
    </router-link>
</template>
<script>
export default {
  name: 'back',
  data() {
    return {

    };
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
#back
  width: 10rem
  position: fixed
  cursor: pointer
  bottom: 1rem
  left: 1rem
  .back-deco
    pointer-events: none
</style>
