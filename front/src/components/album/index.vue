<template>
    <div>
      <h1 :class="albumCss.title">{{title}}</h1>
      <second-title second-text="Why can't you see the flowers in her eyes?"></second-title>
      <div v-for="(item, index) of album" :key="item.url" :class="albumCss.previewBox">
        <img :class="albumCss.previewContent" :src="getPreviewUrl(item.url, 200)" @click="selectedIndex = index"/>
      </div>
      <transition name="fade">
        <div :class="albumCss.selectedBox" v-show="selectedIndex >= 0">
          <span @click="front">front</span>
          <img :class="albumCss.selectedContent" :src="selectedIndex >= 0 ? album[selectedIndex].url : ''" @click="selectedIndex = -1"/>
          <span @click="next">next</span>
        </div>
      </transition>
       <back></back>
       <my-footer></my-footer>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  Getter
} from 'vuex-class';
import secondTitle from '@/components/second-title';
import myFooter from '@/components/footer';
import back from '@/components/back';

@Component({
  asyncData({store, route: {path, params, query}}) {
    return store.dispatch('FETCH_ALBUM', {
      model: 'album'
    });
  },
  components: {
    myFooter,
    secondTitle,
    back
  }
})
export default class Album extends Vue {
  selectedIndex: number = -1;
  title: string = '相册';
  @Getter album
  getPreviewUrl(url, width) {
    return `${url}?imageView2/2/w/${width}`;
  }
  next() {
    this.selectedIndex = (this.selectedIndex + 1) % this.album.length;
  }
  front() {
    this.selectedIndex = this.selectedIndex - 1 < 0 ? this.album.length - 1 : this.selectedIndex - 1;
  }
}
</script>
<style module="albumCss" lang="stylus" rel="stylesheet/stylus">
@import '../../assets/css/mixin.styl'

.title 
  title-base() 
.previewBox
  margin: $space-middle
  display: inline-block
  font-size: 0
  two-color-border(0.3rem, 0.2rem) 
  .previewContent
    filter: grayscale(100%)
    padding: 0.2rem
.selectedBox
  position: absolute
  display: flex
  align-items: center
  justify-content: center
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: $main-second-color
  color: $main-third-color
  .selectedContent
    width: 90%
    height: auto
</style>

<style lang="stylus" rel="stylesheet/stylus">
.fade-enter-active, .fade-leave-active
  transition: opacity .3s ease
.fade-enter, .fade-leave-to
  opacity: 0
</style>

