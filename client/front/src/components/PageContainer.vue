<template>
  <pager :page="page"></pager>
</template>
<script>
  import pager from './Pager';

  function fetchPage({store, route: {path: pathName, params, query}}, callback) {
    pathName = pathName.replace(/^\//g, '');
    return store.dispatch('FETCH_PAGE', {
      conditions: {
        pathName,
        type: 'page'
      },
      select: {
        _id: 0,
        title: 1,
        createdAt: 1,
        content: 1,
        updatedAt: 1,
        pathName: 1,
        allowComment: 1
      },
      callback
    });
  }

  export default {
    name: 'about',
    data() {
      return {
      }
    },
    asyncData(context) {
      return fetchPage(context);
    },
    computed: {
      page() {
        return this.$store.state.page;
      }
    },
    components: {
      pager
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
