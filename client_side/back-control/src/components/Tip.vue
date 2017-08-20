<template>
  <div>
    <div v-if="shouldTipShow === true">
      <div v-if="shouldTipShow === true">{{tipInfo}}</div>
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
      tipType: String,
      tipInfo: String
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
