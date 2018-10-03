<template>
  <div class="wordsloop-wrapper" ref="wordsLoopWrapper">
    <span v-if="!wordsLoop" class="words" ref="words">{{ words }}</span>
    <div v-if="wordsLoop" class="words-loop">
      <span ref="words">{{ words }}</span><span class="blank"></span>
      <span>{{ words }}</span><span class="blank"></span>
      <span>{{ words }}</span><span class="blank"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      words: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        wordsLoop: true
      }
    },
    watch: {
      words() {
        if (this.$refs.words.clientWidth > this.$refs.wordsLoopWrapper.clientWidth) {
          this.wordsLoop = true
        } else {
          this.wordsLoop = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wordsloop-wrapper {
    white-space: nowrap;
    overflow: hidden;
    .words {
      display: inline-block;
    }
    .words-loop {
      display: inline-block;
      animation: 5s wordsLoop linear infinite normal;
      animation-delay: 3s;
      .blank {
        display: inline-block;
        width: 20px;
      }
    }
  }
  @keyframes wordsLoop {
    0% {transform: translateX(0px)}
    100% {transform: translateX(-33.3%)}
  }
</style>
