<template>
  <div class="hello">
    <template v-if="isLogin === false">
      <tip :should-tip-show="shouldTipShow" type="success" text="placeholder"></tip>
      <login></login>
    </template>
    <template v-else>
      <sidebar :current-route="currentRoute"></sidebar>
      <dashboard :current-route="currentRoute" v-if="currentRoute.indexOf('/dashboard') > -1"></dashboard>
      <post-list :current-route="shouldTipShow" v-if="currentRoute === '/post/list'"></post-list>
      <tip :should-tip-show="shouldTipShow" :type="'success'" :text="'placeholder'"></tip>
      <router-view></router-view>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './Login';
import Tip from './Tip';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import PostList from './PostList';

export default {
  name: 'hello',
  data () {
    return {
      isLogin: true,
      shouldTipShow: false,
      SystemInfo: {},
      currentRoute: '/dashboard'
    }
  },
  components: {
    Login,
    Tip,
    Sidebar,
    Dashboard,
    PostList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
