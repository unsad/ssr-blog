<template>
  <div id="main">
    <section id="page-index">
      <h1 class="intro">标签<a href="javascript: void(0)">{{$route.params.tagName}}</a>下的文章</h1>
      <blog-summary v-for="item of items" :article="item"></blog-summary>
      <pagination :page="page" :total-page="totalPage"></pagination>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import store from '../store/index';
  import myFooter from './Footer.vue';
  import blogSummary from './BlogSummary.vue';
  import pagination from './Pagination.vue';

  export default {
    name: 'tagPager',
    components: {
      myFooter,
      blogSummary,
      pagination
    },
    data() {
      return {
        items: [],
        page: 1,
        totalPage: 1
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getItems();
      })
    },
    methods: {
      getItems() {
        let idArr = [];
        store.fetchTags(this).then(tags => {
          let tagID = '';
          tags.forEach(value => {
            if (value.name === this.$route.params.tagName) {
              tagID = value._id;
            }
          });

          store.fetchPostTags(this).then(postTags => {
            postTags = postTags.filter((value, index) => {
              return value.tagID === tagID;
            });

            postTags.forEach((value) => {
              store.fetchBlogByID(this, value.postID).then(item => {
                if (item._id) {
                  this.items.push(item);
                }
              });
            });
          })
        });
      }
    },
    created() {
      this.getItems();
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
