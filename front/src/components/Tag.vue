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

<script>
  import store from '../store/index';
  import back from './Back.vue';
  import myFooter from './Footer.vue';
  import secondTitle from './SecondTitle.vue';
  import { mapGetters } from 'vuex';

  function fetchTags({store, route: {path: pathName, params, query}}, callback) {
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

  export default {
    name: 'tag',
    data() {
      return {
        title: '标签'
      };
    },
    metaInfo() {
      return {
        title: this.title
      };
    },
    components: {
      myFooter,
      secondTitle,
      back
    },
    computed: {
      ...mapGetters([
        'tags'
      ]),
      sortedKeys() {
        let ref = this.tags;
        return Object.keys(ref).sort((a, b) => ref[b] < ref[a]);
      }
    },
    asyncData(context) {
      return fetchTags(context);
    }
  };
</script>
<style lang="stylus" module="tag" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';
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
      padding: 1rem
      color: #fff
      .number 
        position: absolute
        right: 0
        bottom: -40%
        padding: 0.3rem
        transform: translate(1rem, -0.5rem) rotate(15deg) skew(-5deg)
        background: #000
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
      font-size: 1rem
      margin:0.5rem 2rem

@media only screen and (min-width: 769px)
  .container 
    .tag
      font-size: 2rem
      margin: 1rem 4rem
</style>
