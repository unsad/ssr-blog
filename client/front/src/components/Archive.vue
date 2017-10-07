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

  function fetchArchive(store) {
    return store.dispatch('FETCH_ACHIEVE', {
      conditions: {type: 0},
      select: {
        title: 1,
        createdAt: 1,
        pathName: 1
      },
      sort: 1
    });
  }

  export default {
    name: 'archive',
    data() {
      return {
        title: '归档'
      }
    },
    asyncData(store) {
      return fetchArchive(store);
    },
    computed: {
      items() {
        return this.$store.getters.achieves;
      }
    },
    components: {
      myFooter
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
