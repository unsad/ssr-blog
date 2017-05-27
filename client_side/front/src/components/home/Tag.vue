<template>
  <div id="main">
    <article class="post tags">
      <h1 class="title">{{title}}</h1>
      <div class="entry-content">
        <section>
          <a v-for="item of items" href="javascript:void(0)" data-tag="item.name">{{item.name}}({{item.count}})</a>
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
        items: {}
      }
    },
    created() {
      store.fetchTags(this).then(items => {
        store.fetchPostTags(this).then(postTags => {
          postTags.forEach(value => {
            let tagID = value.tagID;
            if (typeof items[tagID - 1].count === 'undefined') {
              items[tagID - 1].count = 1;
            } else {
              items[tagID - 1].count++;
            }
          });
          items.sort((a, b) => b.count - a.count);
          this.items = items;
        });
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
