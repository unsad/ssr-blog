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
        type: 'page',
        isPublic: true
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
    name: 'pageContainer',
    data() {
      return {
      }
    },
    asyncData(context) {
      return fetchPage(context);
    },
    computed: {
      page() {
        return this.$store.state.pathName ? this.$store.state.page : {
          pathName: 404,
          createdAt: '2017-01-01 00:00:00',
          updatedAt: '2017-01-01 00:00:00',
          title: '404 Not Found',
          content: '不存在'
        };
      }
    },
    components: {
      pager
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
