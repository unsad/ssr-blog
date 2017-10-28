<template>
  <div id="main">
    <article class="post tags">
      <h1 class="title">{{title}}</h1>
      <div class="entry-content">
        <section>
          <router-link v-for="(item, key, index) of items" :key="item" :to="{name: 'tagPager', params: {tagName: key}}" :data-tag="key">{{key}}({{item}})</router-link>
        </section>
      </div>
    </article>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import store from '../store/index';
  import myFooter from './Footer.vue';

  function fetchTags({store, route: {path: pathName, params, query}}, callback) {
    return store.dispatch('FETCH_TAGS', {
      conditions: {},
      select: {
        _id: 0,
        tags: 1
      },
      callback
    });
  }

  export default {
    name: 'tag',
    data() {
      return {
        title: '标签'
      }
    },
    components: {
      myFooter
    },
    computed: {
      items() {
        return this.$store.state.tags
      }
    },
    asyncData(context) {
      return fetchTags(context);
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
