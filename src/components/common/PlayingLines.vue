<template>
  <div class="playing-lines">
    <div class="line line-1"></div>
    <div class="line line-2"></div>
    <div class="line line-3"></div>
    <div class="line line-4"></div>
  </div>
</template>

<script>
  export default {
    name: 'PlayingLines',
    props: {
      play: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .playing-lines {
    display: flex;
    position: absolute;
    right: 20px;
    bottom: 6px;
    justify-content: space-around;
    flex-flow: wrap-reverse;
    width: 25px;
    height: 25px;
    .line {
      width: 2px;
      border-radius: 20px;
      background: $color-green;
    }
    .line-1 {
      height: 10px;
      animation: playlingLines-1 0.5s linear infinite alternate
    }
    .line-2 {
      height: 25px;
      animation: playlingLines-2 0.5s linear infinite alternate
    }
    .line-3 {
      height: 15px;
      animation: playlingLines-3 0.5s linear infinite alternate
    }
    .line-4 {
      height: 20px;
      animation: playlingLines-4 0.5s linear infinite alternate
    }
  }

  @keyframes playlingLines-1 {
    0% { height: 5px; }
    100% { height: 20px; }
  }
  @keyframes playlingLines-2 {
    0% { height: 25px; }
    100% { height: 10px; }
  }
  @keyframes playlingLines-3 {
    0% { height: 10px; }
    100% { height: 25px; }
  }
  @keyframes playlingLines-4 {
    0% { height: 20px; }
    100% { height: 5px; }
  }
</style>