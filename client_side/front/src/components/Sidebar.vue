<template>
  <nav id="sidebar">
    <div class="profile">
      <a href="/">
        <img :src="siteInfo.site_url.value + '/' + siteInfo.logo_url.value" :alt="siteInfo.title.value">
      </a>
      <span>{{siteInfo.title.value}}</span>
    </div>
    <ul class="buttons">
      <li><router-link :to="{name: 'main'}" title="首页"><span>首页</span></router-link></li>
      <li><router-link :to="{name: 'archives'}" title="归档"><span>归档</span></router-link></li>
      <li><router-link :to="{name: 'tag'}" title="标签"><span>标签</span></router-link></li>
      <li><router-link :to="{name: 'about'}" title="关于"><span>关于</span></router-link></li>
    </ul>
    <ul class="buttons">
      <li>
        <a :href="siteInfo.github_blog.value" target="_blank" class="inline">
          <i title="GitHub"></i>
        </a>
      </li>
      <li>
        <a href="/rss.html" target="_blank" class="inline">
          <i title="RSS"></i>
        </a>
      </li>
      <li>
        <a href="/search.html" target="_blank" class="inline">
          <i title="Search"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import store from '../store/index';

  export default {
    name: 'sideBar',
    data() {
      return {
        siteInfo: {}
      }
    },
    mounted() {
      store.fetchOption(this).then(result => {
        let obj = {};
        result.forEach(value => {
          obj[value.key] = value;
        });
        this.siteInfo = obj;
        if (this.siteInfo['title']) {
          document.title = this.siteInfo['title'].value;
        }
        if (this.siteInfo['comment']) {
          let value = JSON.parse(this.siteInfo['comment'].value);
          let type = value.type;
          let name = value.name;
        }
      });
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
