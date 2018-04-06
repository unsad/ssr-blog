<template>
  <div id="catchme">
     CatchMe
  </div>
</template>
<script>
export default {
  name: 'catchme',
  data() {
    return {

    };
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    #catchme 
        background: url(../../static/catchme.svg) no-repeat left bottom/62vh,
                    linear-gradient(145deg, transparent, transparent calc(80vw + 1rem), red 0),
                    linear-gradient(145deg, transparent, transparent 80vw, white 0),
                    linear-gradient(130deg, transparent, transparent calc(20vh + 1rem), transparent 0),
                    linear-gradient(130deg, black, black 20vh, transparent 0),
                    linear-gradient(110deg, transparent, transparent calc(45vh + 1rem), black 0),
                    linear-gradient(110deg, red, red 45vh, white 0)
                    
</style>
