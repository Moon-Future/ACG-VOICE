<template>
  <div class="container" v-show="show" @click="hidePlayList">
    <div class="play-list">
      <div class="operate"></div>
      <scroll :refreshOr="scrollRefresh">
        <ul class="voice-list">
          <li v-for="(item, i) in data" :key="i" :class="[currentIndex === i ? 'active' : '']"
            @click.stop="selectItem(item, i)"
          >
            <i class="iconfont icon-acg-speaker i-speaker" v-if="currentIndex === i"></i>
            <div class="list-num" v-if="showRank">{{ i + 1 }}</div>
            <div class="list-text">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </scroll>
    </div>
    <!-- <div class="mask-layer" @click="hidePlayList"></div> -->
  </div>
</template>

<script>
  import VoiceList from 'components/common/VoiceList'
  import Scroll from 'components/common/Scroll'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    props: {
      data: {
        type: Array,
        default: null
      },
      showRank: {
        type: Boolean,
        default: false
      },
      show: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      ...mapGetters([
        'currentIndex'
      ])
    },
    data() {
      return {
        scrollRefresh: false
      }
    },
    methods: {
      hidePlayList() {
        this.$emit('hidePlayList', false)
      },
      selectItem(item, index) {
        this.setCurrentIndex(index)
        this.setPlaying(true)
      },
      ...mapMutations({
        setPlaying: 'SET_PALYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      }),
    },
    watch: {
      show() {
        if (this.show) {
          this.scrollRefresh = true
        }
      }
    },
    components: {
      VoiceList,
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  .container {
    z-index: 200;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .play-list {
      position: absolute;
      top: 15rem;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 10px 10px 0 0;
      background: $color-background;
      color: $color-white;
      .operate {
        background: $color-red;
      }
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
    }
    .mask-layer {
      z-index: 150;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: $color-background;
      opacity: 0.3;
    }
  }
</style>
