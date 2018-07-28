<template>
    <router-link tag="div" :to="{path: '/'}" :class="back.container" :style="position">
        <object :class="back.backDeco" type="image/svg+xml" data="../../static/back.svg">This browser sucks</object>
    </router-link>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Back extends Vue {
  @Prop({
    default: () => ({
      left: '1rem',
      bottom: '1rem'
    })
  })
  position: Object
}
</script>
<style module="back" lang="stylus" rel="stylesheet/stylus">
@media only screen and (min-width : 769px)
  .container
    width: 10rem


@media only screen and (max-width : 768px)
  .container
    width: 6rem

.container
  position: fixed
  cursor: pointer
  .backDeco
    pointer-events: none


</style>
