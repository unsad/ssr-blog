<template>
  <div>

  </div>
</template>

<script>
  import Api from '../store/api';

  export default {
    name: 'logout',
    methods: {
      logout() {
        Api.logout().then(response => {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.$notify({
            title: '成功',
            message: '登出成功',
            type: 'success',
            duration: 2000
          });
          this.$router.push({path: '/admin/login'});
        })
      }
    },
    beforeMount() {
      this.logout();
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
