<template>
  <div class="playing-lines" @click="showPlayer">
    <div class="line line-1" :class="{'play': playing}"></div>
    <div class="line line-2" :class="{'play': playing}"></div>
    <div class="line line-3" :class="{'play': playing}"></div>
    <div class="line line-4" :class="{'play': playing}"></div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'PlayingLines',
    props: {
      // play: {
      //   type: Boolean,
      //   default: false
      // }
    },
    computed: {
      ...mapGetters(['playing'])
    },
    methods: {
      showPlayer() {
        this.setFullScreen(true)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .playing-lines {
    display: flex;
    position: absolute;
    right: 10px;
    top: 5px;
    justify-content: space-around;
    flex-flow: wrap-reverse;
    width: 25px;
    height: 25px;
    z-index: 130;
    .line {
      width: 2px;
      border-radius: 20px;
      background: $color-green;
    }
    .line-1 {
      height: 10px;
      &.play {
        animation: playlingLines-1 0.5s linear infinite alternate;
      }
    }
    .line-2 {
      height: 25px;
      &.play {
        animation: playlingLines-2 0.5s linear infinite alternate;
      }
    }
    .line-3 {
      height: 15px;
      &.play {
        animation: playlingLines-3 0.5s linear infinite alternate;
      }
    }
    .line-4 {
      height: 20px;
      &.play {
        animation: playlingLines-4 0.5s linear infinite alternate;
      }
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