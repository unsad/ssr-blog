<template>
  <div id="about">
      <h1 class="title">{{title}}</h1>
      <second-title second-text="Took the mask off to feel free"></second-title>
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
          <router-link to="/catchme" tag="div" class="catch-box">
             <svg width="200" height="80" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,50 50,50 45,60 155,55 150,80 200,40 140,0 150,25 120,25 122,15 0,50"
                  stroke="black" fill="white" stroke-width="6"/>
              <text x="80" y="45" font-family="jackey_handwriteregular" font-size="2rem">Catch me !</text> 
            </svg>
          </router-link>
        </div>
      </div>
      <back></back>
    <my-footer></my-footer>
  </div>
</template>
<script>
import myFooter from './Footer.vue';
import back from './Back.vue';
import secondTitle from './SecondTitle.vue';

export default {
  name: 'about',
  data() {
    return {
      title: '关于'
    };
  },
  components: {
    myFooter,
    secondTitle,
    back
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

@media only screen and (min-width : 769px) 
  #about
    .object-box 
      width: 500px
      height: 556px
    .direct-box 
      position: absolute  
      display: flex 
      width: max-content
      align-items: center
      .direct-content 
        font-size: 2rem
        two-color-border(0.5rem, 0.2rem)
        padding: 0.5rem
      .direct-line 
        width: 200px

@media only screen and (max-width : 768px) 
  #about
    .object-box 
      width: 60%
      display: flex
    .direct-content 
      font-size: 1rem
      two-color-border(0.2rem, 0.1rem)
      padding: 0.5rem
    .direct-box
      display: inline-block
      margin: 0.5rem 1rem
      .direct-content 
        display: inline-block
    .direct-line 
      display: none
    .catch-box 
      position: absolute
      z-index: 1
      right: 0
      bottom: 30%
      transition: all .3s ease
      &:hover
        cursor: pointer
        transform: translateX(0.5rem)
  

#about
  display: flex 
  flex-direction: column
  background: radial-gradient(circle, red, red 50%, transparent 50%, transparent 80%, red 80%),
              repeating-radial-gradient(circle, black, black 5%, transparent 5%, transparent 10%)
  .title
    title-base()
    margin: 0
  .entry-content 
    display: flex
    align-items: flex-start
    justify-content: center
    flex-grow: 1
    .object-box  
      position: relative
      display: inline-block
      object  
        z-index: 1
        position: relative
 

      
@media only screen and (min-width : 769px) 
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
  .catch-box 
    position: absolute
    z-index: 1
    right: 0
    bottom: 0
    transition: all .3s ease
    &:hover
      cursor: pointer
      transform: translateX(0.5rem)
</style>
