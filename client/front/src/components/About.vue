<template>
  <div id="main">
    <article class="post page">
    <h1 class="title">{{html.title}}</h1>
      <div class="entry-content" v-html="html.content">

      </div>
    </article>
  <my-footer></my-footer>
  </div>
</template>
<script>
  import myFooter from './Footer.vue';
  import store from '../store/index';

  function fetchAbout(store) {
    return store.dispatch('FETCH_ABOUT', {
      conditions: {
        pathName: 'about',
        type: 1
      },
      select: {
        content: 1,
        title: 1
      }
    });
  }

  export default {
    name: 'about',
    data() {
      return {
      }
    },
    asyncData(store) {
      return fetchAbout(store);
    },
    computed: {
      html() {
        return this.$store.state.about;
      }
    },
    preFetch(store) {
      return fetchAbout(store);
    },
    components: {
      myFooter
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
