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

  let items = [],
      page = 1,
      totalPage = 1;

  export default {
    name: 'blogPager',
    data() {
      return {
        items,
        page,
        totalPage
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fetchData();
      })
    },
    preFetch(state) {
      let fetchDataPromise = new Promise(resolve => {
        let query;

        try {
          query = this.$route.query;
        } catch (err) {
          query = {page: 1};
        }
        let page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
        if (page < 0) {
          page = 1;
        }
        this.data.page = page;

        store.fetchBlogByPage({type: 0}, page - 1).then(fetchedItems => {
          items = fetchedItems;
          resolve(items);
        });
      });
      let arr = [store.fetchBlogCount({type: 0}).then(fetchedTotalPage => {
        totalPage = fetchedTotalPage
      }), fetchDataPromise];
      return Promise.all(arr);
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData(val, oldVal) {
        console.log('fetchData');
        let query = this.$route.query;
        let page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
        if (page < 0) {
          page = 1;
        }
        this.page = page;
        store.fetchBlogByPage(this, {type: 0}, page - 1).then(items => {
          this.items = items;
        });
      }
    },
    components: {
      myFooter,
      blogSummary,
      pagination
    },
    created() {
      store.fetchBlogCount(this, {type: 0}).then(totalPage => {
        this.totalPage = totalPage;
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
