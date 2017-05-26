<template>
  <div id="main">
    <article class="post tags">
      <h1 class="title">{{title}}</h1>
      <div class="entry-content">
        <section>
          <a v-for="item of items" :href="`/tags/${item.name}`" data-tag="item.name">{{{item.name}}(0)</a>
        </section>
      </div>
    </article>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import store from '../../store/index';
  import myFooter from './Footer.vue';

  export default {
    name: 'tag',
    data() {
      return {
        title: '标签',
        items: []
      }
    },
    created() {
      store.fetchTags(this).then(items => {
        this.items = items;
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
