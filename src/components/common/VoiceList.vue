<template>
  <div class="list-container">
    <ul class="voice-list">
      <li v-for="(item, i) in data" :key="i" :class="[activeIndex === i ? 'active' : '']"
        @click="selectItem(item, i)"
      >
        <i class="iconfont icon-acg-speaker i-speaker" v-if="showSpeaker && activeIndex === i"></i>
        <div class="list-num" v-if="showRank">{{ i + 1 }}</div>
        <div class="list-text">
          {{ item.name }}
        </div>
        <playing-lines></playing-lines>
      </li>
    </ul>
  </div>
</template>

<script>
  import PlayingLines from 'components/common/PlayingLines'
  export default {
    name: 'VoiceList',
    props: {
      data: {
        type: Array,
        default: null
      },
      showRank: {
        type: Boolean,
        default: false
      },
      showSpeaker: {
        type: Boolean,
        default: false
      },
      activeIndex: {
        type: Number,
        default: -1
      }
    },
    components: {
      PlayingLines
    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .voice-list {
    li {
      display: flex;
      padding: 10px;
      position: relative;
      .i-speaker {
        margin-right: 5px;
      }
      .list-num {
        margin: 0 10px;
        display: flex;
        justify-content: center;
        flex-flow: column;
      }
      .list-text {
        line-height: 1rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &.active {
        color: $color-green;
      }
    }
  }
</style>
