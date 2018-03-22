<template>
  <div
    class="aplayer-list"
    :class="{'aplayer-list-hide': !show}"
    :style="{maxHeight: listmaxheight || ''}"
    ref="list"
  >
    <ol
      ref="ol"
      :style="{maxHeight: listmaxheight || ''}"
    >
      <li
        v-for="(aMusic, index) of musicList"
        :key="index"
        :class="{'aplayer-list-light': aMusic === currentMusic}"
        @click="$emit('selectsong', aMusic)"
      >
        <span class="aplayer-list-cur" :style="{background: theme}"></span>
        <span class="aplayer-list-index">{{ index + 1}}</span>
        <span class="aplayer-list-title">{{ aMusic.title }}</span>
        <span class="aplayer-list-author">{{ aMusic.author }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: true
      },
      currentMusic: Object,
      musicList: {
        type: Array,
        default () {
          return [];
        }
      },
      playIndex: {
        type: Number,
        default: 0
      },
      theme: String,
      listmaxheight: String
    },
    mounted () {
      this.$el.style.height = `${this.$el.offsetHeight}px`;
      this.$refs.ol.style.height = `${this.$el.offsetHeight}px`;
    }
  };
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
 
</style>
