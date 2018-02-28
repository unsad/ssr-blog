<template>
  <div id='archive'>
    <article class="archive-main">
      <h1 class="title">{{title}}</h1>
      <second-title second-text="Took the mask off to feel free"></second-title>
      <div class="timeline" v-for="(item, key) of achieves" :key="key">
        <div class="content">
          <h3>{{key}} ({{item.length}})</h3>
          <ul>
            <li v-for="subItem of item" :key="subItem.title">
              <router-link :to="{name: 'post', params: {pathName: subItem.pathName}}" :title="subItem.title">{{subItem.title}}</router-link>&nbsp;
              <span class="date">{{subItem.createdAt.split(' ')[0]}}</span>
            </li>
          </ul>
        </div>
      </div>
    </article>
    <back></back>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myFooter from './Footer.vue';
  import secondTitle from './SecondTitle.vue';
  import back from './Back.vue';
  import { mapGetters } from 'vuex';

  function fetchArchive({store, route}, callback) {
    return store.dispatch('FETCH_ACHIEVE', {
      model: 'post',
      query: {
        conditions: {
          type: 'post',
          isPublic: true
        },
        select: {
          _id: 0,
          title: 1,
          createdAt: 1,
          pathName: 1
        },
        sort: {
          createdAt: -1
        }
      },
      callback
    });
  }

  export default {
    name: 'archive',
    metaInfo() {
      return {
        title: this.title
      };
    },
    computed: {
      ...mapGetters([
        'achieves'
      ])
    },
    data() {
      return {
        title: '归档'
      };
    },
    asyncData(context) {
      return fetchArchive(context);
    },
    components: {
      myFooter,
      secondTitle,
      back
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/mixin.styl';

#archive 
  display: flex 
  flex-direction: column
  .archive-main
    flex-grow: 1
    .title 
      title-base()
    .timeline
      position: relative
      width: 0.5rem
      margin: 0 auto 
      background: #000
      &:before
        content: '';
        background: red;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: 2rem;
        height: 2rem;
        border: 3px solid #000;
        border-radius: 50%;
      .content 
        two-color-border()
        color: #fff
        background: #000
        position: relative 
        width: 40rem
        padding: 1rem
        top: 0.5rem
        ul
          line-height: 1.7
          font-size: 1.2rem
          li 
            display: flex 
            justify-content: space-between
            a
              color: #fff
        h3 
          text-align: center
          font-size: 1.5rem
          padding-bottom: 1rem;
          border-bottom: 1px solid #fff;
        &:before 
          content: ''
          background: #000 
          position: absolute 
          top: -0.7rem
          width: 3rem 
          height: 0.3rem 
      &:nth-child(odd) .content
        left: 4rem 
        background: #000 
        &:before 
          left: -4rem
      &:nth-child(even) .content
        left: calc(-40rem - 3.5rem)
        &:before 
          right: -4rem
</style>
