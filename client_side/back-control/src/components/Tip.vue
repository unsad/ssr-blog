<template>
  <div>
    <div v-if="showTipShow === true">
      {{text}}
    </div>
    <div v-else></div>
  </div>
</template>

<script>
  export default {
    name: 'tip',
    data() {
      return {

      }
    },
    props: {
      shouldTipShow: Boolean,
      type: String,
      text: String
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
