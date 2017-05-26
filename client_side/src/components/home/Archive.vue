<template>
  <div id='main'>
    <article class="post archive">
      <h1 class="title">{{title}}</h1>
      <div class="entry-content" v-for="(item, key) of items">
        <h3>{{key}} ({{item.length}})</h3>
        <ul>
          <li v-for="subItem of item">
            <a :href='`/post/${subItem.pathName}.html`' :title="subItem.title">{{subItem.title}}</a>&nbsp;
            <span class="date">{{subItem.createdAt.split('')[0]}}</span>
          </li>
        </ul>
      </div>
    </article>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import Footer from './Footer.vue';
  import store from '../../store/index';

  export default {
    name: 'archive',
    data() {
      return {
        title: '归档',
        items: {}
      }
    },
    created() {
      store.fetchAllBlog(this).then(items => {
        let result = {};
        item.forEach(item => {
          let time = item.createdAt.slice(0, 7).replace('-', '年') + '月';
          if (typeof result[time] === 'undefined') {
            result[time] = [item];
          } else {
            result[time].push(item);
          }
        });
        this.items = result;
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
