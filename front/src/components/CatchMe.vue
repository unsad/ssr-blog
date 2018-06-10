<template>
  <div :class="catchme.container">
     <ul :class="catchme.topBox">
         <li :class="catchme.clearInlineStyle" v-for="(value, key, index) of topBoxData" :key="key" :style="{'padding-left': `${32 - index * 4}vh`}">
             <span :class="catchme.topBoxKey" class="no-phone">{{key}}</span><a target="_blank" :href="value">{{value}}</a>
        </li>
     </ul>
     <ul :class="catchme.bottomBox">
          <li  v-for="(value, key, index) of bottomBoxData" :key="key">
            
             <a v-if="value.startsWith('http')" :href="value" target="_blank">{{value}}</a>
             <span v-else>{{value}}</span>
             <span :style="{'margin-right': `${index * 8 - 15}vh`}" class="no-phone" :class="[catchme.bottomBoxKey, catchme.clearInlineStyle]">{{key}}</span>
        </li>
     </ul>
      <second-title :class="catchme.title" second-text="Switch my current from DC to AC "></second-title>
     <back :class="catchme.clearInlineStyle" :position="{right: '1rem', bottom: '1rem'}"></back>
  </div>
</template>
<script>
import back from './Back.vue';
import secondTitle from './SecondTitle.vue';

export default {
  name: 'catchme',
  data() {
    return {
      topBoxData: {
        'Github': 'https://github.com/unsad',
        'Blog': 'https://www.sweetalkos.com',
        'Dribbble': 'https://dribbble.com/unsad',
        'Bilibili': 'https://space.bilibili.com/2428560/#/',
        'Bangumi': 'https://bgm.tv/user/365090'
      },
      bottomBoxData: {
        'Zhihu': 'https://www.zhihu.com/people/axunwa/activities',
        'Pixiv': 'https://www.pixiv.net/member.php?id=8208657',
        'NetEase Cloud Music': 'http://music.163.com/#/user/home?id=74380527',
        'Email': 'wzxaylryw@hotmail.com',
        'Nintendo Switch': 'SW-4276-5641-6320',
        'PSN': 'pre-unsad'
      }
    };
  },
  components: {
    back,
    secondTitle
  }
};
</script>
<style module="catchme" lang="stylus" rel="stylesheet/stylus">
@media only screen and (min-width : 769px)
  .container
    font-size: $font-size-middle
    color: $main-third-color
    font-family: 'jackey_handwriteregular'
    background: url(../../static/catchme.svg) no-repeat left bottom/78vh,
                linear-gradient(135deg, transparent, transparent calc(65vw + 30vh + 1rem), $main-color 0),
                linear-gradient(135deg, transparent, transparent calc(65vw + 30vh), $main-third-color 0),
                linear-gradient(130deg, $main-second-color, $main-second-color 20vh, transparent 0),
                linear-gradient(-50deg, transparent, transparent calc(100% - 20vh - 1rem), $main-third-color 0),
                linear-gradient(110deg, transparent, transparent calc(48vh + 1rem), $main-second-color 0),
                linear-gradient(110deg, $main-color, $main-color 48vh, $main-third-color 0)
    display: flex
    flex-direction: column
    .title 
        position: absolute 
        bottom: 0 
        right: 5%
    .bottomBox 
      clip-path: polygon(40% 0, 100% 0, 100% 100%, 51% 100%)
      overflow: hidden
      height: 48vh
      display: flex 
      flex-direction: column 
      .bottomBoxKey
        min-width: 15rem
        margin-left: 10vh
      li 
        flex-grow: 1
        justify-content: flex-end
        display: flex 
        align-items: center
        border-bottom: 0.3rem solid $main-third-color
        a 
            flex-grow: 1
            color: $main-third-color
            text-align: right
    .topBox 
      border-bottom: 0.3rem solid $main-third-color
      clip-path: polygon(28vh 0, 60% 0, 70% 100%, -8vh 100%)
      height: 40vh
      display: flex 
      flex-direction: column 
      .topBoxKey
        text-align: right
        min-width: 6rem
        margin-right: 16vh
      li 
        flex-grow: 1
        display: flex 
        align-items: center
        &:not(:last-child)
            border-bottom: 0.3rem solid $main-third-color
        a 
            color: $main-third-color

@media only screen and (max-width : 768px)
  .container
    font-size: $font-size-middle-d
    color: $main-third-color
    font-family: 'jackey_handwriteregular'
    display: flex
    flex-direction: column
    .bottomBox 
      overflow: hidden
      height: 48vh
      display: flex 
      flex-direction: column 
      .bottomBoxKey
        min-width: 15rem
        margin-left: 10vh
      li 
        flex-grow: 1
        justify-content: flex-end
        display: flex 
        align-items: center
        border-bottom: 0.3rem solid $main-third-color
        a 
          flex-grow: 1
          color: $main-third-color
          margin-left: $space-middle
    .topBox 
      border-bottom: 0.3rem solid $main-third-color
      height: 40vh
      display: flex 
      flex-direction: column 
      .topBoxKey
        text-align: right
        min-width: 6rem
        margin-right: 16vh
      li 
        flex-grow: 1
        display: flex 
        align-items: center
        &:not(:last-child)
          border-bottom: 0.3rem solid $main-third-color
        a 
          color: $main-third-color
          margin-left: $space-middle

    .clearInlineStyle 
      margin-right: 0!important
      padding-left: 0!important
      left: $space-middle
</style>
