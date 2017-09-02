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
      data({transition}) {
        let query = transition.to.query;
        let page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
        if (page < 0) {
          page = 1;
        }
        store.fetchBlogByPage(this, {type: 0}, page - 1).then(items => {
          this.items = items;
        });
        if (transition.from.name !== 'post') {
          window.scrollTo(0, 0);
        }
        return {
          page
        }
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
