<template>
  <div id="catchme">
     <ul class="top-box">
         <li class="clear-inline-style" v-for="(value, key, index) of topBoxData" :key="key" :style="{'padding-left': `${32 - index * 4}vh`}">
             <span class="top-box-key">{{key}}</span><a :href="value">{{value}}</a>
        </li>
     </ul>
     <ul class="bottom-box">
          <li  v-for="(value, key, index) of bottomBoxData" :key="key">
             <a :href="value">{{value}}</a><span :style="{'margin-right': `${index * 8 - 15}vh`}" class="bottom-box-key clear-inline-style">{{key}}</span>
        </li>
     </ul>
      <second-title class="catchme-title" second-text="Switch my current from DC to AC "></second-title>
     <back class="clear-inline-style" :position="{right: '1rem', bottom: '1rem'}"></back>
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
        'Twitter': 'https://twitter.com/sunnyunsad',
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
<style lang="stylus" rel="stylesheet/stylus">
@media only screen and (min-width : 769px)
    #catchme 
        font-size: 2rem 
        color: #fff
        font-family: 'jackey_handwriteregular'
        background: url(../../static/catchme.svg) no-repeat left bottom/78vh,
                    linear-gradient(135deg, transparent, transparent calc(65vw + 30vh + 1rem), red 0),
                    linear-gradient(135deg, transparent, transparent calc(65vw + 30vh), white 0),
                    linear-gradient(130deg, black, black 20vh, transparent 0),
                    linear-gradient(-50deg, transparent, transparent calc(100% - 20vh - 1rem), white 0),
                    linear-gradient(110deg, transparent, transparent calc(48vh + 1rem), black 0),
                    linear-gradient(110deg, red, red 48vh, white 0)
        display: flex
        flex-direction: column
        .catchme-title 
            position: absolute 
            bottom: 0 
            right: 5%
        .bottom-box 
            clip-path: polygon(40% 0, 100% 0, 100% 100%, 51% 100%)
            overflow: hidden
            height: 48vh
            display: flex 
            flex-direction: column 
            .bottom-box-key
                min-width: 15rem
                margin-left: 10vh
            li 
                flex-grow: 1
                justify-content: flex-end
                display: flex 
                align-items: center
                border-bottom: 0.3rem solid white
                a 
                    flex-grow: 1
                    color: #fff
                    text-align: right
        .top-box 
            border-bottom: 0.3rem solid white
            clip-path: polygon(28vh 0, 60% 0, 70% 100%, -8vh 100%)
            height: 40vh
            display: flex 
            flex-direction: column 
            .top-box-key
                text-align: right
                min-width: 6rem
                margin-right: 16vh
            li 
                flex-grow: 1
                display: flex 
                align-items: center
                &:not(:last-child)
                    border-bottom: 0.3rem solid white
                a 
                    color: #fff

@media only screen and (max-width : 768px)
    #catchme 
        font-size: 2rem 
        color: #fff
        font-family: 'jackey_handwriteregular'
        display: flex
        flex-direction: column
        .bottom-box 
            overflow: hidden
            height: 48vh
            display: flex 
            flex-direction: column 
            .bottom-box-key
                min-width: 15rem
                margin-left: 10vh
            li 
                flex-grow: 1
                justify-content: flex-end
                display: flex 
                align-items: center
                border-bottom: 0.3rem solid white
                a 
                    flex-grow: 1
                    color: #fff
                    text-align: right
        .top-box 
            border-bottom: 0.3rem solid white
            height: 40vh
            display: flex 
            flex-direction: column 
            .top-box-key
                text-align: right
                min-width: 6rem
                margin-right: 16vh
            li 
                flex-grow: 1
                display: flex 
                align-items: center
                &:not(:last-child)
                    border-bottom: 0.3rem solid white
                a 
                    color: #fff

        .clear-inline-style 
            margin-right: 0!important
            padding-left: 0!important
            left: 1rem
</style>
