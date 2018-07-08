
<template>
  <div id="disqus_thread"></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Disqus extends Vue {
    @Prop({required: true})
    shortname: string
  
    mounted () {
      if (window.DISQUS) {
        this.reset(window.DISQUS);
        return;
      }
      this.init();
    }

    reset (dsq) {
      const self = this;
      dsq.reset({
        reload: true,
        config: function () {
          (<any>this).page.identifier = (self.$route.path || window.location.pathname);
          (<any>this).page.url = self.$el.baseURI;
        }
      });
    }

    init () {
      const self = this;
      window.disqus_config = function() {
        (<any>this).page.identifier = (self.$route.path || window.location.pathname);
        (<any>this).page.url = self.$el.baseURI;
      };
      setTimeout(() => {
        let d = document;
        let s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.setAttribute('id', 'embed-disqus');
        s.setAttribute('data-timestamp', `${new Date()}`);
        s.src = `//${this.shortname}.disqus.com/embed.js`;
        (d.head || d.body).appendChild(s);
      }, 0);
    }
  };
</script>

<style></style>
