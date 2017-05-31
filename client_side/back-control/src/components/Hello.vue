<template>
  <div class="hello">
    <template v-if="isLogin === false">
      <tip :should-tip-show="showTipShow" type="success" text="placeholder"></tip>
      <login></login>
    </template>
    <template v-else>
      <sidebar :current-route="currentRoute"></sidebar>
      <dashboard v-if="currentRoute.indexOf('/dashboard') > -1"></dashboard>
      <tip :should-tip-show="showTipShow" :type="'success'" :text="'placeholder'"></tip>
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
    Dashboard
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
