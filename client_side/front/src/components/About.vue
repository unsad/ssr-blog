<template>
  <div id="main">
    <article class="post page">
    <h1 class="title">{{html.title}}</h1>
      <div class="entry-content" v-html="html.content">

      </div>
    </article>
  <my-footer></my-footer>
  </div>
</template>
<script>
  import myFooter from './Footer.vue';
  import store from '../../store/index';

  export default {
    name: 'about',
    data() {
      return {
        html: store.fetchPage(this, {title: '关于'}).then(html => {
          this.html = html[0];
        })
      }
    },
    components: {
      myFooter
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
