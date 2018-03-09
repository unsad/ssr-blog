<template>
  <div id="about">
      <h1 class="title">{{title}}</h1>
      <h2 class="second-title">
        <span class="second-title-text">
          <object class="second-title-deco" type="image/svg+xml" data="../../static/mask.svg">This browser sucks</object>
          " Took the mask off to feel free "
        </span>
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
          <div class="direct-box box-2">
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,0 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span class="direct-content">INFJ</span>
          </div>
           <div class="direct-box box-3">
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,180 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span class="direct-content">前端开发</span>
          </div>
          <div class="direct-box box-4">
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,180 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span class="direct-content">人像摄影</span>
          </div>
          <div class="direct-box box-5">
            <span class="direct-content">手办</span>
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,20"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
           <div class="direct-box box-6">
            <span class="direct-content">Motion Graphic</span>
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,200"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
          <div class="direct-box box-7">
            <span class="direct-content">动画</span>
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,200"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
          <div class="direct-box box-8">
            <span class="direct-content">主机游戏</span>
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,20"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
          <div class="direct-box box-10">
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,180 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span class="direct-content">电子乐</span>
          </div>
           <div class="direct-box box-9">
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,0 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span class="direct-content">剪辑</span>
          </div>
          <div class="direct-box box-12">
            <span class="direct-content">影视后期</span>
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,20"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
          <div class="direct-box box-11">
            <span class="direct-content">爵士乐</span>
            <svg class="direct-line" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,20"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
        </div>
      </div>
      <router-link tag="div" :to="{path: '/'}" class="back">
        <object class="back-deco" type="image/svg+xml" data="../../static/back.svg">This browser sucks</object>
      </router-link>
    <my-footer></my-footer>
  </div>
</template>
<script>
import myFooter from './Footer.vue';

export default {
  name: 'about',
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
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

#about
  .title
    title-base()
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
  .entry-content 
    text-align: center
    .object-box  
      position: relative
      width: 500px
      display: inline-block
      object  
        z-index: 1
        position: relative
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
.back
  width: 10rem
  position: fixed
  cursor: pointer
  bottom: 1rem
  z-index: 1
  left: 1rem
  .back-deco
    pointer-events: none


.box-1 
  left: 70%
  bottom: 4rem
.box-2 
  left: 65% 
  bottom: 9rem
.box-3
  left: 70%
  top: 3rem
.box-4
  left: 50%
  top: 8rem
.box-5 
  left: -20%
  bottom: 0
.box-6
  left: -30%
  top: 9rem
.box-7 
  left: -10%
  top: 3rem
.box-8
  left: -35%
  bottom: 5rem
.box-9
  left: 50%
  top: 17rem
.box-10
  left: 68%
  top: 16rem
.box-11
  left: -5%
  top: 15rem
.box-12
  left: -30% 
  bottom: 18rem
</style>
