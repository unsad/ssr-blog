<template>
  <pager :page="page"></pager>
</template>
<script>
  import pager from './Page';
  import mock404 from '../utils/404';

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
    asyncData(context) {
      return fetchPage(context);
    },
    computed: {
      page() {
        return this.$store.state.pathName ? this.$store.state.page : mock404
      }
    },
    components: {
      pager
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
