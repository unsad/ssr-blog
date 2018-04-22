<template>
  <div id="link">
    <h1 class="title">{{title}}</h1>
    <second-title second-text="I was turning my back on you my friend"></second-title>
    <div class="content">
      <ul class="linklist-box">
        <li class="clear-inline-style" v-for="(item, index) of linkitems" :key="item" :style="{'margin-left': `-${index * 5}rem`}"><a :href="item.link" target="_blank">{{item.sitename}}</a></li>
      </ul>
      <div class="object-box no-phone">
        <object type="image/svg+xml" data="../../static/link-bg.svg">This browser sucks</object>
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
  name: 'Link',
  metaInfo() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      title: '友链',
      linkitems: [
        {
          link: 'https://smallpath.me',
          sitename: 'Smallpath的小站'
        },
        {
          link: 'http://uniclown.com/blog/',
          sitename: 'AKAGI PROJECT'
        },
        {
          link: 'https://jesor.me/about/',
          sitename: '大破进击'
        },
        {
          link: '',
          sitename: ''
        },
        {
          link: '',
          sitename: ''
        },
        {
          link: '',
          sitename: ''
        },
        {
          link: '',
          sitename: ''
        },
        {
          link: '',
          sitename: ''
        }
      ]
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
 #link    
    display: flex 
    flex-direction: column 
    background: linear-gradient(-40deg, transparent 42%, red 0),
                linear-gradient(-30deg, transparent 22%, #090909 0)
    .title
      title-base() 
      margin: 0  
    .content 
      display: flex
      flex-grow: 1
      font-size: 0
      justify-content: center
      .linklist-box
        font-size: 1rem
        position: absolute
        li 
          position: relative
          z-index: 1
          min-height: 3rem
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
          a 
            color: #fff
      .object-box 
          width: 50rem
          min-height: 412px;

@media only screen and (max-width : 768px)
  #link
    .clear-inline-style 
      margin-left: 0!important

@media only screen and (min-width : 769px)
  #link  
    .content 
      margin: 6rem 0
      padding-left: 15rem  
      align-items: flex-end
      margin-left: -5rem
      border-top: 0.4rem solid #fff
      border-bottom: 0.4rem solid #fff
      box-shadow:0 0 0 1rem #000, 0 0 0 1.4rem #fff
</style>
