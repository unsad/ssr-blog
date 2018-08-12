<template>
    <div>
      <div :class="albumCss.selectedBox" v-show="selectedUrl">
        <img :class="albumCss.selectedContent" :src="selectedUrl" @click="selectedUrl = ''"/>
      </div>
      <img v-for="item of album" :key="item.url" :src="getPreviewUrl(item.url, 200)" @click="selectedUrl = item.url"/>
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
  selectedUrl: string = '';
  @Getter album
  getPreviewUrl(url, width) {
    return `${url}?imageView2/2/w/${width}`;
  }
}
</script>
<style module="albumCss" lang="stylus" rel="stylesheet/stylus">
.selectedBox
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: $main-second-color
  .selectedContent
    width: 80%
    height: auto
</style>
