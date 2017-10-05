<template>
  <div id="main">
    <section id="page-index">
      <blog-summary v-for="item of items" :key="item" :article="item">

      </blog-summary>
      <pagination :page='page' :total-page="totalPage"></pagination>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import store from '../store/index';
  import myFooter from './Footer.vue';
  import blogSummary from './BlogSummary.vue';
  import pagination from './Pagination.vue';

  function fetchItems(serverStore, {path, query, params}) {
    if (path !== '/') return resolve();
    let page = (typeof query.page !== 'undefined') ? parseInt(query.page) : 1;
    if (page < 0) {
      page = 1;
    }
    return serverStore.dispatch('FETCH_ITEMS', {
      conditions: {
        type: 0
      },
      select: {
        title: 1,
        summary: 1,
        commentNum: 1,
        createdAt: 1,
        pathName: 1
      },
      limit: 10,
      skip: (page - 1) * 10,
      sort: 1
    });
  }

  export default {
    name: 'blogPager',
    data() {
      const isInitialRender = !this.$root._isMounted;

      return {
        totalPage: 1
      }
    },
    computed: {
      items() {
        return this.$store.getters.items;
      },
      totalPage() {
        return this.$store.state.totalPage;
      },
      page() {
        let page = this.$store.state.route.query.page || 1;
        return parseInt(page);
      }
    },
    preFetch: fetchItems,
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData(val, oldVal) {
        if (val.name !== 'main') return;
        fetchItems(this.$store, this.$store.state.route);
      }
    },
    components: {
      myFooter,
      blogSummary,
      pagination
    },
    beforeMount() {
      if (this.$root._isMounted) {
        fetchItems(this.$store, this.$store.state.route);
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
