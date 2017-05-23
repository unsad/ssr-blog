<template>
  <div id="main">
    <section id="page-index">
      <li v-for="item in items">
        {{item.title}}
      </li>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import store from '../store/index';
  import myFooter from './Footer.vue';

  export default {
    name: 'BlogPager',
    data() {
      return {
        items: store.fetchBlogByPage(this, 0).then(items => this.items = items)
      }
    },
    components: {
      myFooter
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
