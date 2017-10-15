<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import api from './store/api'
  import {getChineseDesc} from './utils/error'

  export default {
    name: 'app',
    data() {
      return {};
    },
    computed: {
      siteInfo() {
        return this.$store.state.siteInfo;
      }
    },
    beforeMount() {
      this.$store.dispatch('FETCH_OPTIONS').then(() => {
        if (this.siteInfo['title'] && typeof document !== 'undefined') {
          document.title = this.siteInfo['title'].value;
        }
      });
      const {axios} = api;

      axios.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (config.method === 'get' && config.url.indexOf('/proxyPrefix/api/user') === -1) return config;
        if (token !== null && token !== 'undefined') {
          config.headers['authorization'] = token;
        }
        return config;
      }, error => Promise.reject(error));

      axios.interceptors.response.use(response => {
        if (this.$store.state.route.name === 'logout') {
          return response;
        }
        if (response.data && response.data.status && response.data.status === 'fail') {
          let desc = getChineseDesc(response.data.description);
          this.$notify.error(desc);
          return Promise.reject(desc);
        }
        return response;
      }, error => Promise.reject(error));

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
