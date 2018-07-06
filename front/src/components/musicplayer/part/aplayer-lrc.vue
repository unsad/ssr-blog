<template>
  <div class="aplayer-lrc">
    <div
      class="aplayer-lrc-contents"
      :style="transformStyle"
    >
      <p
        v-for="(line, index) of lrcLines"
        :key="index"
        :class="{ 'aplayer-lrc-current': index === currentLineIndex }"
      >
        {{ line[1] }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import {parseLrc} from '../utils';
  import axios from 'axios';

  @Component
  export default class Lyrics extends Vue {
    @Prop({required: true})
    currentMusic: Object

    @Prop({required: true})
    playStat: Object

    displayLrc = '';
    currentLineIndex = 0;
   
    get lrcLines () {
      return parseLrc(this.displayLrc);
    }
    get currentLine () {
      if (this.currentLineIndex > this.lrcLines.length - 1) {
        return null;
      }
      return this.lrcLines[this.currentLineIndex];
    }
    get transformStyle () {
      // transform: translateY(0); -webkit-transform: translateY(0);
      return {
        transform: `translateY(${-this.currentLineIndex * 16}px)`,
        webkitTransform: `translateY(${-this.currentLineIndex * 16}px)`
      };
    }

    applyLrc (lrc) {
      if (/^https?:\/\//.test(lrc)) {
        this.fetchLrc(lrc);
      } else {
        this.displayLrc = lrc;
      }
    }
    fetchLrc (src) {
      axios(src).then(response => response.data).then((lrc) => {
        this.displayLrc = lrc;
      }).catch(err => console.log(err));
    }
    hideLrc () {
      this.displayLrc = '';
    }

    @Watch('currentMusic', {immediate: true})
    currentMusicHandler(music) {
      this.currentLineIndex = 0;
        if (music.lrc) {
          this.applyLrc(music.lrc);
        } else {
          this.hideLrc();
        }
    }

    @Watch('playStat.playedTime')
    playedTimeHandler(playedTime) {
      for (let i = 0; i < this.lrcLines.length; i++) {
        const line = this.lrcLines[i];
        const nextLine = this.lrcLines[i + 1];
        if (playedTime >= line[0] && (!nextLine || playedTime < nextLine[0])) {
          this.currentLineIndex = i;
        }
      }
    }
  };
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
 
</style>
