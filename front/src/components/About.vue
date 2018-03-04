<template>
  <div id="main">
      <h1 class="title">{{title}}</h1>
      <h2 class="second-title">
        <span class="title-deco">WANTED</span>
      </h2>
      <div class="entry-content">
        <div class="object-box">
          <object style="width: 100%" type="image/svg+xml" data="../../static/me.svg">This browser sucks</object>
          <div class="direct-box box-1">
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,0 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span class="direct-content">节能主义</span>
        </div>
        </div>
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
  .object-box  
    position: relative
    width: 500px
    display: inline-block
  .direct-box 
    position: absolute
    display: flex 
    width: max-content
    align-items: center
    .direct-line 
      width: 200px
    .direct-content 
      font-size: 2rem
      padding: 0.5rem
      two-color-border(0.5rem, 0.2rem)
  .box-1 
    left: 70%
    bottom: 4rem
</style>