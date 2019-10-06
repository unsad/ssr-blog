<template>
  <div :class="sidebar.container">
     <div :class="sidebar.pic" class="no-phone">
        <img src="./img/sidebar.svg" alt="" width="125%">
    </div>
    <nav :class="sidebar.content">
      <ul :class="sidebar.icons">
        <li>
          <a href="/rss.xml" target="_blank" class="inline">
            <img src="./img/rss.svg" alt="RSS" width="20px">
          </a>
        </li>
      </ul>
      <ul :class="sidebar.link" v-if="option && option.menu">
        <li v-for="menu of option.menu" :key="menu.label">
          <router-link :class="sidebar.linkItem" :to="{path: menu.url}" :title="menu.label">
            <span :class="sidebar.rotate1">{{menu.label[0]}}</span><span :class="sidebar.rotate2">{{menu.label[1]}}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import myMixin from '@/mixin/image';

  @Component
  export default class Sidebar extends mixins(myMixin) {}
</script>
<style module="sidebar" lang="stylus" rel="stylesheet/stylus">
@media only screen and (max-width: 768px)
  .container
    font-family: 'special-for-me'
    a
      color: $main-third-color
    .link
      display: flex
      justify-content: space-around
      line-height: 2
      background: $main-second-color
      font-size: $font-size-middle
@media only screen and (min-width: 769px)
  .container
    position: relative
    font-family: 'special-for-me'
    &::before
      position: absolute
      content: ''
      left: 0 
      right: 0
      top: 0
      bottom: 0
      background: $main-second-color
      clip-path: polygon(0 0, 100% 0, calc(100% - 30vh) 100%, 0% 100%) 
    .pic 
      position: absolute
      font-size: 0
      bottom: 0
      left: calc(75% - 30vh)
      width: 100%
    .icons
      position: absolute
      padding: 1rem
    .content
      height: 100vh
      position: relative
      &::before
        position: absolute
        content: ''
        left: 0 
        right: 0
        top: 0
        bottom: 0
        background: $main-third-color
        clip-path: polygon(97% 0, 100% 0, calc(100% - 30vh) 100%, calc(97% - 30vh) 100%)
      a
        color: $main-third-color
      .link
        padding: 0
        text-align: center
        font-size: $font-size-large
        transform: rotate(20deg) translate(26%)
        line-height: 2
        .linkItem:hover 
          .rotate1
            transform: rotate(-20deg) translate(-10%, 10%)
          .rotate2
            transform: rotate(-20deg) translate(10%)
        .rotate1 
          display: inline-block
          transition: all .2s ease-out
          transform: rotate(-40deg)
          -webkit-text-stroke: 2px $main-second-color
        .rotate2 
          display: inline-block
          transition: all .2s ease-out
          color: $main-second-color
          -webkit-text-stroke: 2px $main-third-color
          transform: rotate(15deg) translate(5%)
</style>
