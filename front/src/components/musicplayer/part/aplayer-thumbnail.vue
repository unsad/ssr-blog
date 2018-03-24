<template>
  <div
    class="aplayer-pic"
    :style="currentPicStyleObj"
    @mousedown="onDragBegin"
    @click="onClick"
  >
    <div class="aplayer-button" :class="playing ? 'aplayer-pause' : 'aplayer-play'">
      <icon-button
        :icon="playing ? 'pause' : 'play'"
        :class="playing ? 'aplayer-icon-pause' : 'aplayer-icon-play'"
      />
    </div>
  </div>
</template>
<script>
  import IconButton from './aplayer-iconbutton.vue';
  export default {
    components: {
      IconButton
    },
    props: {
      pic: String,
      playing: {
        type: Boolean,
        default: false
      },
      enableDrag: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        hasMovedSinceMouseDown: false,
        dragStartX: 0,
        dragStartY: 0
      };
    },
    computed: {
      currentPicStyleObj () {
        if (!this.pic) return {};
        return {
          backgroundImage: `url(${this.pic})`
        };
      }
    },
    methods: {
      onDragBegin (e) {
        if (this.enableDrag) {
          this.hasMovedSinceMouseDown = false;
          this.$emit('dragbegin');
          this.dragStartX = e.clientX;
          this.dragStartY = e.clientY;
          document.addEventListener('mousemove', this.onDocumentMouseMove);
          document.addEventListener('mouseup', this.onDocumentMouseUp);
        }
      },
      onDocumentMouseMove (e) {
        this.hasMovedSinceMouseDown = true;
        this.$emit('dragging', {offsetLeft: e.clientX - this.dragStartX, offsetTop: e.clientY - this.dragStartY});
      },
      onDocumentMouseUp (e) {
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        this.$emit('dragend');
      },
      onClick () {
        if (!this.hasMovedSinceMouseDown) {
          this.$emit('toggleplay');
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
.aplayer-pic
  box-sizing: border-box
  margin: 2px
  width: 6rem
  height: 6rem 
  background: #000
  border: 1rem solid red
  box-shadow: 0 0 0 2px #fff
  border-radius: 50%
  display: flex 
  align-items: center 
  justify-content: center
  .aplayer-icon-play, .aplayer-icon-pause
    width: 2rem
    height: 2rem
</style>
