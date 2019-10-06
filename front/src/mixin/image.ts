/**
 * Created by unsad on 2017/11/17.
 */
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class MyMixin extends Vue {
  @Getter public option
  @Getter public siteInfo
  @Getter public supportWebp
  public get logoUrl() {
    return this.getValidImageUrl(this.option ? this.option.logoUrl || '' : '');
  }
  public get sidebarUrl() {
    return this.getValidImageUrl(this.option ? this.option.sidebarImageUrl || '' : '');
  }
  public getValidImageUrl(url) {
    if (!this.supportWebp) return url.replace(/.webp$/, '.png').replace('/webp', '');
    return url;
  }
}
