<template>
  <div>
     <h2 :class="secondTitle.container">
        <span :class="secondTitle.text">
          <object :class="secondTitle.deco" type="image/svg+xml" data="../../static/mask.svg">This browser sucks</object>
          {{ `" ${secondText} "` }}
        </span>
      </h2>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class SecondTitle extends Vue {
  @Prop()
  secondText
}
</script>
<style lang="stylus" module="secondTitle" rel="stylesheet/stylus">
.container
  color: $main-third-color
  text-align: center
  margin: $space-middle 0
  .text
    position: relative
    font-family: 'jackey_handwriteregular'
    background: $main-second-color
    letter-spacing: 0.1rem 
    display: inline-block
  .deco 
    position: absolute
    height: 100%
    transform: rotate(-20deg)
    left: -10%
    top: -50%

@media only screen and (min-width: 769px)
  .text
    font-size: $font-size-middle
    padding: $space-middle


@media only screen and (max-width: 768px)
  .text
    font-size: $font-size-middle-d
    padding: $space-small
</style>
