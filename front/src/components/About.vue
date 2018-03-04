<template>
  <div id="main">
      <h1 class="title">{{title}}</h1>
      <h2 class="second-title">
        <span class="title-deco">WANTED</span>
      </h2>
      <div class="entry-content">
        <object style="width: 500px;" type="image/svg+xml" data="../../static/me.svg">This browser sucks</object>
      </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import myFooter from './Footer.vue';

export default {
  name: "about",
  data() {
    return {
      title: '关于'
    };
  },
   components: {
      myFooter
    }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
 @import '../assets/css/mixin.styl';

 .title
   title-base()
  .second-title
    color: #fff 
    text-align: center
    margin: 1rem 0
.entry-content 
  text-align: center
</style>