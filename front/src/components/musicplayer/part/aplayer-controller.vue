<template>
  <div class="aplayer-controller">
    <v-progress
      :loadProgress="loadProgress"
      :playProgress="playProgress"
      :theme="theme"
      @dragbegin="val => $emit('dragbegin', val)"
      @dragend="val => $emit('dragend', val)"
      @dragging="val => $emit('dragging', val)"
    />
    <div class="aplayer-time">
      <div class="aplayer-time-inner" v-if="false">
        <span class="aplayer-ptime">{{secondToTime(stat.playedTime)}}</span> / <span
        class="aplayer-dtime">{{secondToTime(stat.duration)}}</span>
      </div>
      <volume
        :volume="volume"
        :theme="theme"
        :muted="muted"
        @togglemute="$emit('togglemute')"
        @setvolume="v => $emit('setvolume', v)"
      />
      <icon-button v-if="false" class="aplayer-icon-mode" :icon="mode" @click.native="$emit('nextmode')"/>
      <icon-button v-if="false" class="aplayer-icon-menu" icon="menu" @click.native="$emit('togglelist')"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import IconButton from './aplayer-iconbutton.vue';
  import VProgress from './aplayer-controller-progress.vue';
  import Volume from './aplayer-controller-volume.vue';
  @Component({
    components: {
      IconButton,
      VProgress,
      Volume
    }
  })
  export default class Controls extends Vue {
    @Prop()
    mode

    @Prop()
    stat

    @Prop()
    theme

    @Prop()
    volume

    @Prop()
    muted

    get loadProgress() {
      if (this.stat.duration === 0) return 0;
      return this.stat.loadedTime / this.stat.duration;
    }

    get playProgress() {
      if (this.stat.duration === 0) return 0;
      return this.stat.playedTime / this.stat.duration;
    }

    secondToTime(second) {
      if (isNaN(second)) {
        return '00:00';
      }
      const pad0 = (num) => {
        return num < 10 ? '0' + num : String(num);
      };
      const min = Math.trunc(second / 60);
      const sec = Math.trunc(second - min * 60);
      const hours = Math.trunc(min / 60);
      const minAdjust = Math.trunc((second / 60) - (60 * Math.trunc((second / 60) / 60)));
      return second >= 3600 ? pad0(hours) + ':' + pad0(minAdjust) + ':' + pad0(sec) : pad0(min) + ':' + pad0(sec);
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.aplayer-controller
  display: flex
  align-items: center
  .aplayer-time 
    display: flex 
    line-height: 1.2
    padding: 0 0.5rem
    align-items: center 
    background: #000
    color: #fff
    border: 2px solid #fff
</style>
