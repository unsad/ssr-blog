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
  import pagination from './Pagination.vue'

  export default {
    name: 'blogPager',
    data() {
      return {
        items: [],
        page: 1,
        totalPage: 1
      }
    },
    route: {
      data({to}) {
        let query = to.query;
        let page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
        if (page < 0) {
          page = 1;
        }
        return {
          page
        }
      }
    },
    watch: {
      page() {
        this.getItems();
      }
    },
    methods: {
      getItems() {
        store.fetchBlogByPage(this, {type: 0}, this.page - 1).then(items => {
          this.items = items;
        })
      }
    },
    components: {
      myFooter,
      blogSummary,
      pagination
    },
    created() {
      store.fetchBlogByPage(this, {type: 0}, 0).then(items => {
        this.items = items;
      });
      store.fetchBlogCount(this, {type: 0}).then(totalPage => {
        this.totalPage = totalPage;
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
