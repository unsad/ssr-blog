<template>
  <div>

  </div>
</template>

<script>
  import store from '../store/index';

  export default {
    methods: {
      logout() {
        store.logout().then(response => {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.$router.push({path: '/admin/login'});
        });
      }
    },
    routes: {
      data({to}) {
        this.logout();
      }
    },
    mounted() {
      this.logout();
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
