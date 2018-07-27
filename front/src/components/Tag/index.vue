<template>
  <div :class="tag.container">
    <article :class="tag.main">
      <h1 :class="tag.title">{{title}}</h1>
      <second-title second-text="My game's always so fast so fine"></second-title>
      <div>
        <section>
          <router-link :class="tag.tag" tag="span" v-for="key of sortedKeys" :key="key" :to="{name: 'tagPager', params: {tagName: key}}" :data-tag="key">
            {{key}}
            <span :class="tag.number">{{tags[key]}}</span>
          </router-link>
        </section>
      </div>
    </article>
    <back></back>
    <my-footer></my-footer>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';
  import store from '../store/index';
  import back from '@/components/Back';
  import myFooter from '@/components/Footer';
  import secondTitle from '@/components/SecondTitle';

  function fetchTags({ store, route: { path: pathName, params, query }}, callback?) {
    return store.dispatch('FETCH_TAGS', {
      model: 'post',
      query: {
        conditions: {
          type: 'post',
          isPublic: true
        },
        select: {
          _id: 0,
          tags: 1
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
      return fetchTags(context);
    },
    components: {
      myFooter,
      secondTitle,
      back
    }
  })
  export default class Tag extends Vue {
    title = '标签';
    @Getter tags

    get sortedKeys() {
      let ref = this.tags;
      return Object.keys(ref).sort((a, b) => ref[b] - ref[a]);
    }
  }
</script>
<style lang="stylus" module="tag" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl'

.container 
  display: flex 
  flex-direction: column
  .main 
    flex-grow: 1
    .title 
      title-base()
    .tag 
      cursor: pointer
      position: relative
      display: inline-block
      z-index: 1
      padding: $space-middle
      color: $main-third-color
      .number 
        position: absolute
        right: 0
        bottom: -40%
        padding: 0.3rem
        transform: translate(1rem, -0.5rem) rotate(15deg) skew(-5deg)
        background: $main-second-color
      &::after
        content: ''
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        z-index: -1
        transform: skew(-25deg)
        two-color-border(0.4rem, 0.3rem)

@media only screen and (max-width: 768px)
  .container 
    .tag
      font-size: $font-size-small
      margin:$space-small $space-middle-u

@media only screen and (min-width: 769px)
  .container 
    .tag
      font-size: $font-size-middle
      margin: $space-middle $space-large
</style>
