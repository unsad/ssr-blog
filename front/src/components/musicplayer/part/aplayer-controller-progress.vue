<template>
  <div
    class="aplayer-bar-wrap"
    @mousedown="onThumbMouseDown"
    @touchstart="onThumbTouchStart"
    ref="barWrap"
  >
    <div class="aplayer-bar">
      <div
        class="aplayer-loaded"
        :style="{width: `${loadProgress * 100}%`}">
      </div>
      <div
        class="aplayer-played"
        :style="{width: `${playProgress * 100}%`, background: theme}"
      >
        <span
          ref="thumb"
          @mouseover="thumbHovered = true"
          @mouseout="thumbHovered = false"
          class="aplayer-thumb"
          :style="{borderColor:　theme, backgroundColor: thumbHovered ? theme : '#fff'}"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {getElementViewLeft} from '../utils';
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class Vprogress extends Vue {
    @Prop()
    loadProgress

    @Prop()
    playProgress

    @Prop()
    theme

    thumbHovered = false;

    onThumbMouseDown (e) {
      const barWidth = (<HTMLElement>this.$refs.barWrap).clientWidth;
      let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth;
      percentage = percentage > 0 ? percentage : 0;
      percentage = percentage < 1 ? percentage : 1;
      console.log(e.clientX, getElementViewLeft(this.$refs.barWrap));
      this.$emit('dragbegin', percentage);
      document.addEventListener('mousemove', this.onDocumentMouseMove);
      document.addEventListener('mouseup', this.onDocumentMouseUp);
    }
    onDocumentMouseMove (e) {
      const barWidth = (<HTMLElement>this.$refs.barWrap).clientWidth;
      let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth;
      percentage = percentage > 0 ? percentage : 0;
      percentage = percentage < 1 ? percentage : 1;
      this.$emit('dragging', percentage);
    }
    onDocumentMouseUp (e) {
      document.removeEventListener('mouseup', this.onDocumentMouseUp);
      document.removeEventListener('mousemove', this.onDocumentMouseMove);
      const barWidth = (<HTMLElement>this.$refs.barWrap).clientWidth;
      let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth;
      percentage = percentage > 0 ? percentage : 0;
      percentage = percentage < 1 ? percentage : 1;
      this.$emit('dragend', percentage);
    }
    onThumbTouchStart (e) {
      const barWidth = (<HTMLElement>this.$refs.barWrap).clientWidth;
      let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth;
      percentage = percentage > 0 ? percentage : 0;
      percentage = percentage < 1 ? percentage : 1;
      this.$emit('dragbegin', percentage);
      document.addEventListener('touchmove', this.onDocumentTouchMove);
      document.addEventListener('touchend', this.onDocumentTouchEnd);
    }
    onDocumentTouchMove (e) {
      const touch = e.changedTouches[0];
      const barWidth = (<HTMLElement>this.$refs.barWrap).clientWidth;
      let percentage = (touch.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth;
      percentage = percentage > 0 ? percentage : 0;
      percentage = percentage < 1 ? percentage : 1;
      this.$emit('dragging', percentage);
    }
    onDocumentTouchEnd (e) {
      document.removeEventListener('touchend', this.onDocumentTouchEnd);
      document.removeEventListener('touchmove', this.onDocumentTouchMove);
      const touch = e.changedTouches[0];
      const barWidth = (<HTMLElement>this.$refs.barWrap).clientWidth;
      let percentage = (touch.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth;
      percentage = percentage > 0 ? percentage : 0;
      percentage = percentage < 1 ? percentage : 1;
      this.$emit('dragend', percentage);
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
 .aplayer-bar-wrap 
    min-width: 10rem
    margin: 0 0.3rem
    padding: 4px 0
    cursor: pointer !important
    flex: 1
    .aplayer-bar 
      position: relative
      height: 1rem
      background: rgb(200,200,200)
      width: 100%
      border: 2px solid #fff
      .aplayer-loaded 
        position: absolute
        left: 0
        top: 0
        bottom: 0
        background: #aaa
        height: 100%
        transition: all 0.5s ease
        will-change: width   
      .aplayer-played 
        position: absolute
        left: 0
        top: 0
        bottom: 0
        height: 100%
        transition: background-color .3s
        will-change: width
        .aplayer-thumb 
          position: absolute
          top: 0
          right: 5px
          margin-top: -0.3rem
          margin-right: -10px
          width: 1.5rem
          height: 1.5rem
          border: 1px solid
          will-change: transform
          transition: transform 300ms, background-color .3s, border-color .3s
          border-radius: 50%
          background: #000
          cursor: pointer !important
          &:hover 
            transform: scale(1)
</style>
