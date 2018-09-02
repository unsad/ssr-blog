<template>
    <div>
      <div :class="albumCss.selectedBox" v-show="selectedIndex >= 0">
        <span @click="front">front</span>
        <img :class="albumCss.selectedContent" :src="selectedIndex >= 0 ? album[selectedIndex].url : ''" @click="selectedIndex = -1"/>
        <span @click="next">next</span>
      </div>
      <img v-for="(item, index) of album" :key="item.url" :src="getPreviewUrl(item.url, 200)" @click="selectedIndex = index"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  Getter
} from 'vuex-class';

@Component({
  asyncData({store, route: {path, params, query}}) {
    return store.dispatch('FETCH_ALBUM', {
      model: 'album'
    });
  }
})
export default class Album extends Vue {
  selectedIndex: number = -1;
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
