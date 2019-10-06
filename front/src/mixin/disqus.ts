/**
 * Created by unsad on 2017/11/10.
 */
import Vue from 'vue';
import { Watch, Component } from 'vue-property-decorator';
const TYPES = ['post', 'page'];

@Component
export default class DisqusMixin extends Vue {
  @Watch('$route')
  public resetDisqus(val, oldVal) {
    if (TYPES.indexOf(val.name) === -1) return;
    if (val.path === oldVal.path) return;
    if (window.DISQUS) {
      this.reset(window.DISQUS);
    }
  }

  public reset(dsq) {
    dsq.reset({
      reload: true,
      config: function () {
        this.page.identifier = (self.$route.path || window.location.pathname);
        this.page.url = window.location.href;
      }
    });
  }
}
