<template>
  <div :class="about.container">
      <h1 :class="about.title">{{title}}</h1>
      <second-title second-text="Took the mask off to feel free"></second-title>
      <div :class="about.content">
        <div :class="about.objectBox">
          <object style="width: 100%" type="image/svg+xml" data="../../static/me.svg">This browser sucks</object>
          <div :class="[about.directBox, about.box1]">
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,0 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span :class="about.directContent">节能主义</span>
          </div>
          <div :class="[about.directBox, about.box2]">
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,0 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span :class="about.directContent">INFJ</span>
          </div>
           <div :class="[about.directBox, about.box3]">
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,180 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span :class="about.directContent">前端开发</span>
          </div>
          <div :class="[about.directBox, about.box4]">
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,180 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span :class="about.directContent">人像摄影</span>
          </div>
          <div :class="[about.directBox, about.box5]">
            <span :class="about.directContent">手办</span>
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,20"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
           <div :class="[about.directBox, about.box6]">
            <span :class="about.directContent">Motion Graphic</span>
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,200"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
          <div :class="[about.directBox, about.box7]">
            <span :class="about.directContent">动画</span>
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,200"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
          <div :class="[about.directBox, about.box8]">
            <span :class="about.directContent">主机游戏</span>
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,20"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
          <div :class="[about.directBox, about.box10]">
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,180 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span :class="about.directContent">电子乐</span>
          </div>
           <div :class="[about.directBox, about.box9]">
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,0 100,75 200,75"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
            <span :class="about.directContent">剪辑</span>
          </div>
          <div :class="[about.directBox, about.box12]">
            <span :class="about.directContent">影视后期</span>
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,20"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
          <div :class="[about.directBox, about.box11]">
            <span :class="about.directContent">爵士乐</span>
            <svg :class="about.directLine" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,75 100,75 200,20"
                  stroke="black" fill="transparent" stroke-width="6"/>
            </svg>
          </div>
          <router-link to="/catchme" tag="div" :class="about.catchBox">
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
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import myFooter from '@/components/Footer';
import back from '@/components/Back';
import secondTitle from '@/components/SecondTitle';

@Component({
  metaInfo() {
    return {
      title: this.title
    };
  },
  components: {
    myFooter,
    secondTitle,
    back
  }
})
export default class About extends Vue {
  title = '关于';
}
</script>
<style lang="stylus" module="about" rel="stylesheet/stylus">
@import '~@/assets/css/mixin.styl';

@media only screen and (min-width : 769px) 
  .container
    .objectBox 
      width: 500px
      height: 556px
    .directBox 
      position: absolute  
      display: flex 
      width: max-content
      align-items: center
      .directContent 
        font-size: $font-size-middle
        two-color-border(0.5rem, 0.2rem)
        padding: $space-small
      .directLine 
        width: 200px

@media only screen and (max-width : 768px) 
  .container
    .objectBox 
      display: flex
      min-height: 528px
    .directContent 
      font-size: $font-size-small
      two-color-border(0.2rem, 0.1rem)
      padding: $space-small
    .directBox
      display: inline-block
      margin: $space-small $space-middle
      .direct-content 
        display: inline-block
    .directLine 
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
  

.container
  display: flex 
  flex-direction: column
  background: radial-gradient(circle, $main-color, $main-color 50%, transparent 50%, transparent 80%, $main-color 80%),
              repeating-radial-gradient(circle, $main-second-color, $main-second-color 5%, transparent 5%, transparent 10%)
  .title
    title-base()
    margin: 0
  .content 
    display: flex
    align-items: flex-start
    justify-content: center
    flex-grow: 1
    .objectBox  
      position: relative
      display: inline-block
      object  
        z-index: 1
        position: relative
 

      
@media only screen and (min-width : 769px) 
  .box1 
    left: 70%
    bottom: 4rem
  .box2 
    left: 65% 
    bottom: 9rem
  .box3
    left: 70%
    top: 3rem
  .box4
    left: 50%
    top: 8rem
  .box5 
    left: -20%
    bottom: 0
  .box6
    left: -30%
    top: 9rem
  .box7 
    left: -10%
    top: 3rem
  .box8
    left: -35%
    bottom: 5rem
  .box9
    left: 50%
    top: 17rem
  .box10
    left: 68%
    top: 16rem
  .box11
    left: -5%
    top: 15rem
  .box12
    left: -30% 
    bottom: 18rem
  .catchBox 
    position: absolute
    z-index: 1
    right: 0
    bottom: 0
    transition: all .3s ease
    &:hover
      cursor: pointer
      transform: translateX(0.5rem)
</style>
