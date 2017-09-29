<template>
  <div id="main">
    <section id="page-index">
        <blog-summary v-for="item of items" :article="item">

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
      queryJSON: {type: 0},
      page: page - 1
    })
  }

  export default {
    name: 'blogPager',
    data() {
      const isInitialRender = !this.$root._isMounted;

      return {
        items: this.$store.getters.items,
        page: 1,
        totalPage: 1
      }
    },
    computed: {
      totalPage() {
        return this.$store.state.totalPage;
      }
    },
    preFetch: fetchItems,
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData(val, oldVal) {
        if (val.name !== 'main') return;
        console.log('fetchData');
        let query = this.$route.query;
        let page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
        if (page < 0) {
          page = 1;
        }
        this.page = page;
        this.$store.dispatch('FETCH_ITEMS', {
          queryJSON: { type: 0 },
          page: page - 1
        });
        console.log('fetchData', page);
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
