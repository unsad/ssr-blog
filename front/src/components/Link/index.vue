<template>
  <div :class="link.container">
    <h1 :class="link.title">{{title}}</h1>
    <second-title second-text="I was turning my back on you my friend"></second-title>
    <div :class="link.content">
      <ul :class="link.linklistBox">
        <li :class="link.clearInlineStyle" v-for="(item, index) of linkitems" :key="item.url + index" :style="{'margin-left': `-${index * 5}rem`}"><a :href="item.url" target="_blank">{{item.sitename}}</a></li>
      </ul>
      <div class="no-phone" :class="link.objectBox">
        <object type="image/svg+xml" data="./img/link-bg.svg">This browser sucks</object>
      </div>
    </div>
    <back></back>
    <my-footer></my-footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import myFooter from '@/components/footer';
import back from '@/components/back';
import secondTitle from '@/components/second-title';

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
export default class Link extends Vue {
  title: string = '友链';
  linkitems = [
    {
      url: 'https://smallpath.me',
      sitename: 'Smallpath的小站'
    },
    {
      url: 'http://uniclown.com/blog/',
      sitename: 'AKAGI PROJECT'
    },
    {
      url: 'https://jesor.me/about/',
      sitename: '大破进击'
    },
    {
      url: '',
      sitename: ''
    },
    {
      url: '',
      sitename: ''
    },
    {
      url: '',
      sitename: ''
    },
    {
      url: '',
      sitename: ''
    },
    {
      url: '',
      sitename: ''
    }
  ];
}
</script>
<style lang="stylus" module="link" rel="stylesheet/stylus">
@import '../../assets/css/mixin.styl'

.container    
  display: flex 
  flex-direction: column 
  background: linear-gradient(-40deg, transparent 42%, $main-color 0),
              linear-gradient(-30deg, transparent 22%, $main-second-color 0)
  .title
    title-base() 
    margin: 0  
  .content 
    display: flex
    flex-grow: 1
    font-size: 0
    justify-content: center
    .linklistBox
      font-size: $font-size-small
      position: absolute
      li 
        position: relative
        z-index: 1
        min-height: 3rem
        line-height: 3rem
        width: 25rem
        margin-bottom: $space-middle
        color: $main-third-color
        padding: 0 $space-middle
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
          color: $main-third-color
    .objectBox 
        width: 50rem
        min-height: 412px;

@media only screen and (max-width : 768px)
  .container
    .clearInlineStyle 
      margin-left: 0!important

@media only screen and (min-width : 769px)
  .container  
    .content 
      margin: 6rem 0
      padding-left: 15rem  
      align-items: flex-end
      margin-left: -5rem
      border-top: 0.4rem solid $main-third-color
      border-bottom: 0.4rem solid $main-third-color
      box-shadow:0 0 0 $space-middle $main-second-color, 0 0 0 1.4rem $main-third-color
</style>
