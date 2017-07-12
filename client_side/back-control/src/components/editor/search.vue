<template>
  <Select placeholder="请输入文章标题">

  </Select>
  <Option v-for="opt of options" >{{opt.title}}</Option>
</template>

<script>
  export default {
    name: 'search',
    props: {
      shouldTipShow: Boolean,
      type: String,
      text: String
    },
    data() {

    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
