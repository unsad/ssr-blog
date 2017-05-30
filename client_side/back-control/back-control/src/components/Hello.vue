<template>
  <div class="hello">
    <template v-if="isLogin === false">
      <tip :should-tip-show="showTipShow" type="success" text="placeholder"></tip>
      <login></login>
    </template>
    <template v-else>
      <sidebar current-route="/dashboard"></sidebar>
      <tip :should-tip-show="showTipShow" type="success" text="placeholder"></tip>
      <router-view></router-view>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './Login';
import Tip from './Tip';
import Sidebar from './Sidebar';

export default {
  name: 'hello',
  data () {
    return {
      isLogin: false,
      shouldTipShow: false,
      SystemInfo: {}
    }
  },
  components: {
    Login,
    Tip,
    Sidebar
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
