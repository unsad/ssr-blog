<template>
  <div id='main'>
    <div id="page-post">
      <article class="post detail">
        <div class="meta">
          <div class="date">{{ article.createdAt }}</div>
        </div>
        <h1 class="title">{{ article.title }}</h1>

        <div class="entry-content" v-html="article.content">
        </div>
      </article>
      <div class="comments" v-if="article.allowComment === true && commentName !== ''">
        <disqus :shortname="commentName" ></disqus>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myFooter from './Footer.vue';
  import disqus from './Disqus.vue';

  export default {
    name: 'page',
    props: ['page', 'siteInfo'],
    computed: {
      article () {
        return this.page || {}
      },
      commentName() {
        return this.siteInfo.commentName.value || '';
      }
    },
    watch: {
      '$route': 'resetDisqus'
    },
    methods: {
      reset (dsq) {
        const self = this
        dsq.reset({
          reload: true,
          config: function () {
            this.page.identifier = (self.$route.path || window.location.pathname)
            this.page.url = window.location.href
          }
        })
      },
      resetDisqus (val, oldVal) {
        if (val.name !== 'page') return
        if (window.DISQUS) {
          this.reset(window.DISQUS)
        }
      }
    },
    components: {
      myFooter,
      disqus
    }
  }
</script>
