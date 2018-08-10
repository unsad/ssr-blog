<template>
    <div>
      <img v-for="item of album" :url="item.url" :key="item.url"/> 
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
  @Getter album
}
</script>
<style module="album" lang="stylus" rel="stylesheet/stylus">

</style>
