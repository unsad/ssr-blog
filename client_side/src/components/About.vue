<template>
  <div>
    {{html}}
  </div>
</template>

<script>
  export default {
    name: 'about',
    data() {
      return {
        html: this.$http.get('/proxyPrefix/api/post/57dbe47c2993f70dc6d6b12c').then((response) => {
          console.log('response ok');
          this.html = response;
        }, (err) => {
          console.log('response error', err)
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
