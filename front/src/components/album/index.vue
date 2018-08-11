<template>
    <div>
      <img v-for="item of album" :key="item.url" :src="item.url" />
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
<style module="albumCss" lang="stylus" rel="stylesheet/stylus">

</style>
