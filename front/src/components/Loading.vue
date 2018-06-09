<template>
  <div>
    <div v-if="show"
       :class="{[loading.loadingBarFull]: full, [loading.loadingBar]: true, [loading.loadingBarToRight]: true}" :style="styling()">
      <div :class="loading.loadingBarGlow"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoadingBar',
    props: {
      progress: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        show: true,
        full: '',
        width: 0,
        wait: false
      };
    },
    watch: {
      progress(val, old) {
        if (old !== val) {
          this.width = val;
          this.$nextTick(() => {
            this.isFull();
          });
        }
      }
    },
    methods: {
      isFull() {
        let isFull = this.width === 100;
        if (isFull) {
          this.wait = true;
          setTimeout(() => {
            this.full = true;
            setTimeout(() => {
              this.show = false;
              this.width = 0;
              this.wait = false;
              this.$nextTick(() => {
                this.full = '';
                this.show = true;
              });
            }, 400);
          }, 400);
        }
      },
      styling() {
        if (!this.wait) {
          return {width: `${this.width}%`};
        } else {
          return {width: `100%`};
        }
      }
    }
  };
</script>
<style module="loading" lang="stylus" rel="stylesheet/stylus">
  .loadingBar
    transition: all .4s ease
    position: fixed
    top: 0
    background: #77b6ff
    height: 5px
    opacity: 1

  .loadingBarGlow
    top: 0
    position: absolute
    width: 100%
    height: 100%
    box-shadow: -4px 0 15px 1px rgba(119, 182, 255, 0.7)

  .loadingBarToRight
    left: 0
    z-index: 1000

  .loadingBarToRight .loadingBarGlow
    right: 0
    z-index: 1000

  .loadingBarFull
    transition: all .3s ease
    height: 0
    opacity: 0
</style>
