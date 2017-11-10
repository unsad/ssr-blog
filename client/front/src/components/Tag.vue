<template>
  <div id="main">
    <article class="post tags">
      <h1 class="title">{{title}}</h1>
      <div class="entry-content">
        <section>
          <router-link v-for="key of sortedKeys" :key="item" :to="{name: 'tagPager', params: {tagName: key}}" :data-tag="key">{{key}}({{tags[key]}})</router-link>
        </section>
      </div>
    </article>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import store from '../store/index';
  import myFooter from './Footer.vue';
  import { mapGetters } from 'vuex';

  function fetchTags({store, route: {path: pathName, params, query}}, callback) {
    return store.dispatch('FETCH_TAGS', {
      conditions: {
        type: 'post',
        isPublic: true
      },
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
      ...mapGetters([
        'tags'
      ]),
      sortedKeys() {
        let ref = this.items;
        return Object.keys(ref).sort((a, b) => ref[b] < ref[a]);
      }
    },
    asyncData(context) {
      return fetchTags(context);
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
