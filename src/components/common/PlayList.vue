<template>
  <div class="play-list" v-show="showFlag" @click="hidePlayList">
    <div class="list-wrapper" @click.stop>
      <div class="operate"></div>
      <scroll class="list-content" ref="listContent">
        <ul>
          <li v-for="(item, i) in data" :key="i" class="item" :class="[currentIndex === i ? 'active' : '']"
            @click="selectItem(item, i)"
          >
            <i class="iconfont icon-acg-speaker i-speaker" v-if="currentIndex === i && playing"></i>
            <div class="list-num" v-if="showRank">{{ i + 1 }}</div>
            <div class="list-text">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </scroll>
    </div>
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
      }
    },
    computed: {
      ...mapGetters([
        'currentIndex',
        'playing'
      ])
    },
    data() {
      return {
        showFlag: false,
        scrollRefresh: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
        this.$refs.listContent.scrollRefresh()
      },
      hidePlayList() {
        this.showFlag = false
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
    components: {
      VoiceList,
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  .play-list {
    z-index: 200;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .list-wrapper {
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
      .list-content {
        height: 100%;
        overflow: hidden;
        .item {
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