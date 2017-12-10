<template>
  <div id='main'>
    <article class="post archive">
      <h1 class="title">{{title}}</h1>
      <div class="entry-content" v-for="(item, key) of achieves">
        <h3>{{key}} ({{item.length}})</h3>
        <ul>
          <li v-for="subItem of item">
            <router-link :to="{name: 'post', params: {pathName: subItem.pathName}}" :title="subItem.title">{{subItem.title}}</router-link>&nbsp;
            <span class="date">{{subItem.createdAt.split(' ')[0]}}</span>
          </li>
        </ul>
      </div>
    </article>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myFooter from './Footer.vue';
  import { mapGetters } from 'vuex';

  function fetchArchive({store, route}, callback) {
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

  export default {
    name: 'archive',
    metaInfo() {
      return {
        title: this.title
      }
    },
    computed: {
      ...mapGetters([
        'achieves'
      ])
    },
    data() {
      return {
        title: '归档'
      }
    },
    asyncData(context) {
      return fetchArchive(context);
    },
    components: {
      myFooter
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
