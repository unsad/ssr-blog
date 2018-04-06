<template>
  <div id="catchme">
     <ul class="top-box">
         <li v-for="(value, key, index) of topBoxData" :key="key" :style="{'padding-left': `${30 - index * 4}vh`}">
             <span class="top-box-key">{{key}}</span><a :href="value">{{value}}</a>
        </li>
     </ul>
     <div class="bottom-box"></div>
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
      }
    };
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    #catchme 
        font-size: 2rem 
        color: #fff
        font-family: 'jackey_handwriteregular'
        background: url(../../static/catchme.svg) no-repeat left bottom/72vh,
                    linear-gradient(145deg, transparent, transparent calc(75vw + 1rem), red 0),
                    linear-gradient(145deg, transparent, transparent 75vw, white 0),
                    linear-gradient(130deg, black, black 20vh, transparent 0),
                    linear-gradient(-50deg, transparent, transparent calc(100% - 20vh - 1rem), white 0),
                    linear-gradient(110deg, transparent, transparent calc(45vh + 1rem), black 0),
                    linear-gradient(110deg, red, red 45vh, white 0)
        display: flex
        flex-direction: column
        .bottom-box 
            height: 56vh
            border-top: 0.3rem solid white
        .top-box 
            clip-path: polygon(0 0, 60vw 0, 70vw 100%, 0% 100%)
            flex-grow: 1
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
