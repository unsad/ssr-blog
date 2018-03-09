<template>
  <div id="link">
    <h1 class="title">{{title}}</h1>
    <h2 class="second-title">
      <span class="second-title-text">
        <object class="second-title-deco" type="image/svg+xml" data="../../static/mask.svg">This browser sucks</object>
        " I was turning my back on you my friend "
      </span>
    </h2>
    <div class="content">
      <ul class="linklist-box">
        <li v-for="(item, index) of linkitems" :key="item" :style="{'margin-left': `-${index * 5}rem`}">{{item}}</li>
      </ul>
      <div class="object-box">
        <object class="second-title-deco" type="image/svg+xml" data="../../static/link-bg.svg">This browser sucks</object>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myFooter from './Footer.vue';

export default {
  name: 'Link',
  data() {
    return {
      title: '友链',
      linkitems: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h'
      ]
    };
  },
  components: {
    myFooter
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

#link    
  display: flex 
  flex-direction: column 
  background: linear-gradient(-40deg, transparent 42%, red 0),
              linear-gradient(-30deg, transparent 22%, #090909 0)
  .title
    title-base() 
    margin: 0  
  .second-title
    color: #fff 
    text-align: center
    margin: 1rem 0
    .second-title-text
      position: relative
      font-family: 'jackey_handwriteregular'
      letter-spacing: 0.1rem 
      font-size: 2rem
      background: #000
      padding: 1rem
      display: inline-block
    .second-title-deco 
      position: absolute
      height: 100%
      transform: rotate(-20deg)
      left: -10%
      top: -50%
  .content 
    display: flex
    border-top: 0.4rem solid #fff
    border-bottom: 0.4rem solid #fff
    box-shadow:0 0 0 1rem #000, 0 0 0 1.4rem #fff
    margin: 6rem 0
    flex-grow: 1
    padding-left: 15rem
    align-items: flex-end
    font-size: 0
    justify-content: center
    .linklist-box
      font-size: 1rem
      margin-left: -5rem
      position: absolute
      li 
        position: relative
        z-index: 1
        line-height: 3rem
        width: 25rem
        margin-bottom: 1rem
        color: #fff
        padding: 0 1rem
        &::after
          content: ''
          position: absolute
          top: 0
          right: 0
          bottom: 0
          left: 0
          z-index: -1
          transform: skew(-25deg)
          two-color-border(0.4rem, 0.3rem)
    .object-box 
        width: 50rem

</style>
