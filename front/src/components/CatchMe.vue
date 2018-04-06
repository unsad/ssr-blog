<template>
  <div id="catchme">
     <ul class="top-box">
         <li v-for="(value, key, index) of topBoxData" :key="key" :style="{'padding-left': `${30 - index * 4}vh`}">
             <span class="top-box-key">{{key}}</span><a :href="value">{{value}}</a>
        </li>
     </ul>
     <ul class="bottom-box">
          <li v-for="(value, key, index) of bottomBoxData" :key="key">
             <a :href="value">{{value}}</a><span :style="{'margin-right': `${index * 12 - 15}vh`}" class="bottom-box-key">{{key}}</span>
        </li>
     </ul>
  </div>
</template>
<script>
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
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    #catchme 
        font-size: 2rem 
        min-width: 1400px
        color: #fff
        font-family: 'jackey_handwriteregular'
        background: url(../../static/catchme.svg) no-repeat left bottom/78vh,
                    linear-gradient(145deg, transparent, transparent calc(50vw + 40vh + 1rem), red 0),
                    linear-gradient(145deg, transparent, transparent calc(50vw + 40vh), white 0),
                    linear-gradient(130deg, black, black 20vh, transparent 0),
                    linear-gradient(-50deg, transparent, transparent calc(100% - 20vh - 1rem), white 0),
                    linear-gradient(110deg, transparent, transparent calc(45vh + 1rem), black 0),
                    linear-gradient(110deg, red, red 45vh, white 0)
        display: flex
        flex-direction: column
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
                &:not(:last-child)
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
                margin-right: 15vh
            li 
                flex-grow: 1
                display: flex 
                align-items: center
                &:not(:last-child)
                    border-bottom: 0.3rem solid white
                a 
                    color: #fff
</style>
