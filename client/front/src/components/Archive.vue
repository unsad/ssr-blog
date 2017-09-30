<template>
  <div id='main'>
    <article class="post archive">
      <h1 class="title">{{title}}</h1>
      <div class="entry-content" v-for="(item, key) of items">
        <h3>{{key}} ({{item.length}})</h3>
        <ul>
          <li v-for="subItem of item">
            <router-link :to="{name: 'post', params: {pathName: subItem.pathName}}" :title="subItem.title">{{subItem.title}}</router-link>&nbsp;
            <span class="date">{{subItem.createdAt.split('')[0]}}</span>
          </li>
        </ul>
      </div>
    </article>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myFooter from './Footer.vue';
  import store from '../store/index';

  function fetchAchieves(store) {
    return store.dispatch('FETCH_ACHIEVE', {type: 0}, {sort: 1});
  }

  export default {
    name: 'archive',
    data() {
      return {
        title: '归档'
      }
    },
    computed: {
      items() {
        return this.$store.getters.achieves;
      }
    },
    preFetch: fetchAchieves,
    beforeMount() {
      if (this.$root._isMounted) {
        console.log('fetchAchirenve');
        fetchAchieves(this.$store);
      }
    },
    components: {
      myFooter
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
