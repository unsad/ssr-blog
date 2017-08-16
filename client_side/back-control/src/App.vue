<template>
  <div id="app">
      <sidebar :current-route="currentRoute"></sidebar>
      <top :current-route="currentRoute"></top>
    <router-view :current-route="currentRoute"></router-view>
  </div>
</template>

<script>
import Login from '@/components/Login';
import Top from '@/components/Top';
import Tip from '@/components/Tip';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'app',
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
    Top

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
