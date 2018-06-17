/**
 * Created by unsad on 2017/11/17.
 */
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Getter } from 'vuex-class';

export class myMixin extends Vue {
  @Getter option
  @Getter siteInfo
  @Getter supportWebp
  get logoUrl() {
    return this.getValidImageUrl(this.option ? this.option.logoUrl || '' : '');
  }
  get sidebarUrl() {
    return this.getValidImageUrl(this.option ? this.option.sidebarImageUrl || '' : '');
  }
  getValidImageUrl (url) {
    if (!this.supportWebp) return url.replace(/.webp$/, '.png').replace('/webp', '');
    return url;
  }
};
