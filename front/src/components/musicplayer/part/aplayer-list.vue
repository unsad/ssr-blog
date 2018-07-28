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
        <span class="aplayer-list-index">{{ index + 1 }}</span>
        <span class="aplayer-list-title">{{ aMusic.title }}</span>
        <span class="aplayer-list-author">{{ aMusic.author }}</span>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class MusicList extends Vue {
    @Prop({ default: true })
    show: boolean

    @Prop()
    currentMusic: Object

    @Prop({ default: [] })
    musicList: any[]

    @Prop({ default: 0 })
    playIndex: number

    @Prop()
    theme: string

    @Prop()
    listmaxheight: string

    mounted() {
      this.$el.style.height = `${this.$el.offsetHeight}px`;
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.aplayer-list-hide
  display: none
</style>
