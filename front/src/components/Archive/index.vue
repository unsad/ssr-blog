<template>
  <div :class="archive.container">
    <article :class="archive.main">
      <h1 :class="archive.title">{{title}}</h1>
      <second-title second-text="Dust to Dust , Ash to Ash"></second-title>
      <div :class="archive.timeline" v-for="(item, key) of achieves" :key="key">
        <div :class="archive.content">
          <h3>{{key}} ({{item.length}})</h3>
          <ul>
            <li v-for="subItem of item" :key="subItem.title">
              <router-link :to="{name: 'post', params: {pathName: subItem.pathName}}" :title="subItem.title">{{subItem.title}}</router-link>&nbsp;
              <span class="date no-phone">{{subItem.createdAt.split(' ')[0]}}</span>
            </li>
          </ul>
        </div>
      </div>
    </article>
    <back></back>
    <my-footer></my-footer>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {
    Getter
  } from 'vuex-class';
  import myFooter from '@/components/footer';
  import secondTitle from '@/components/second-title';
  import back from '@/components/back';

  function fetchArchive({ store, route }, callback?) {
    return store.dispatch('FETCH_ACHIEVE', {
      model: 'post',
      query: {
        conditions: {
          type: 'post',
          isPublic: true
        },
        select: {
          _id: 0,
          title: 1,
          createdAt: 1,
          pathName: 1
        },
        sort: {
          createdAt: -1
        }
      },
      callback
    });
  }
  @Component({
    metaInfo() {
      return {
        title: this.title
      };
    },
    asyncData(context) {
      return fetchArchive(context);
    },
    components: {
      myFooter,
      secondTitle,
      back
    }
  })
  export default class Archive extends Vue {
    title = '归档';
    @Getter achieves
  }
</script>
<style module="archive" lang="stylus" rel="stylesheet/stylus">
@import '../../assets/css/mixin.styl';

@media only screen and (max-width : 768px)
  .container
    background: linear-gradient(40deg, transparent 52%, $main-color 0),
                linear-gradient(30deg, transparent 28%, #000 0)
    display: flex 
    flex-direction: column
    .main
      flex-grow: 1
      .title 
        title-base()
      .timeline
        margin: $space-middle
        .content 
          two-color-border()
          color: $main-third-color
          background: $main-second-color
          position: relative 
          padding: $space-middle
          top: $space-small
          ul
            line-height: 1.7
            font-size: $font-size-small-u
            li 
              display: flex 
              justify-content: space-between
              a
                color: #fff
                no-wrap()
          h3 
            text-align: center
            font-size: $font-size-middle-d
            padding-bottom: $space-middle;
            border-bottom: 1px solid $main-third-color;

@media only screen and (min-width : 769px)
  .container 
    display: flex 
    flex-direction: column
    .main
      flex-grow: 1
      .title 
        title-base()
      .timeline
        position: relative
        width: 0.5rem
        margin: 0 auto 
        background: #000
        &:before
          content: ''
          background: $main-color
          position: absolute
          left: 50%
          top: 0
          transform: translateX(-50%)
          width: 2rem
          height: 2rem
          border: 3px solid #000
          border-radius: 50%
        .content 
          two-color-border()
          color: $main-third-color
          background: $main-second-color
          position: relative 
          width: 40rem
          padding: $space-middle
          top: $space-small
          ul
            line-height: 1.7
            font-size: $font-size-small-u
            li 
              display: flex 
              justify-content: space-between
              a
                color: $main-third-color
          h3 
            text-align: center
            font-size: $font-size-middle-d
            padding-bottom: $space-middle
            border-bottom: 1px solid $main-third-color
          &:before 
            content: ''
            background: $main-second-color
            position: absolute 
            top: -0.7rem
            width: 3rem 
            height: 0.3rem 
        &:nth-child(odd) .content
          left: 4rem 
          background: #000 
          &:before 
            left: -4rem
        &:nth-child(even) .content
          left: calc(-40rem - 3.5rem)
          &:before 
            right: -4rem
</style>
