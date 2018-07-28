<template>
  <button
    type="button"
    class="aplayer-icon"
  >
    <icon :type="icon"/>
  </button>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import Icon from './aplayer-icon.vue';

  @Component({
    components: {
      Icon
    }
  })
  export default class IconButton extends Vue {
    @Prop()
    icon
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
 
</style>
