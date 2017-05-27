<template>
  <div class="hello">
    <template v-if="isLogin === false">
      <tip :should-tip-show="showTipShow" type="0" :text="placeholder"></tip>
      <login></login>
    </template>
  </div>
</template>

<script>
import Login from './Login';
import Tip from './Tip';

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
    Tip
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
