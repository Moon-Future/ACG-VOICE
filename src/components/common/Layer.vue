<template>
  <div class="layer" ref="layer">

  </div>
</template>

<script>
  export default {
    name: 'Layer',
    props: {
      target: null
    },
    methods: {

    },
    watch: {
      target() {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .layer {
    display: none;
    height: 80%;
    width: 90%;
    background: $color-white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.8;
    z-index: 100;
  }
</style>