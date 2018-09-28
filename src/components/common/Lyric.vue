<template>
  <scroll class="lyric-wrapper" :class="staticFlag ? 'static-center' : ''" :data="lines" ref="lyricWrapper">
    <div class="lyric-lines" v-show="lyric && !staticFlag && !searching" ref="lyricLines">
      <p ref="line"
        class="text" 
        :class="{'current': currentLine === i}" 
        v-for="(line, i) in lines" :key="i">{{ line.txt }}</p>
    </div>
    <div class="lyric-static" v-show="lyric && staticFlag && !searching">
      <p class="text static" v-for="(line, i) in staticLyric" :key="i">{{ line }}</p>
    </div>
    <div class="lyric-message" v-show="!lyric || searching">
      <p v-show="searching">正在搜索歌词...</p>
      <p v-show="!lyric && !searching">没有找到歌词...</p>
    </div>
    <div class="middle-line" v-show="moveing">
      <span class="play">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-acg-bofang"></use>
        </svg>
      </span>
      <div class="line"></div>
      <span class="time">00:25</span>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/Scroll'
import { setTimeout, clearTimeout } from 'timers';
  export default {
    props: {
      lyric: {
        type: String,
        default: ''
      },
      currentTime: {
        type: Number,
        default: 0
      },
      // [00:08.82] => [mm:ss.ff] 若为false,ff => 百分一秒; 若为true,ff => 毫秒数
      flag: {
        type: Boolean,
        default: true
      },
      searching: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        lines: [],
        currentLine: 0,
        staticLyric: [],
        staticFlag: false,
        moveing: false
      }
    },
    created() {
      this.timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
      this.tagRegMap = {
        title: 'ti',
        artist: 'ar',
        album: 'al',
        offset: 'offset',
        by: 'by'
      }
      this.tags = {}
      this.touch = {}
    },
    methods: {
      init() {
        this.lines = null
        this.currentLine = 0
        this.tags = {}
        this.initTag()
        this.initLines()
      },
      initTag() {
        for (let tag in this.tagRegMap) {
          const matches = this.lyric.match(new RegExp(`\\[${this.tagRegMap[tag]}:([^\\]]*)]`, 'i'))
          this.tags[tag] = matches && matches[1] || ''
        }
      },
      initLines() {
        const lines = this.lyric.split('\n')
        this.lines = []
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          let result = this.timeExp.exec(line)
          if (result) {
            const txt = line.replace(this.timeExp, '').trim()
            if (txt) {
              this.lines.push({
                time: result[1] * 60 * 1000 + result[2] * 1000 + (this.flag ? result[3] * 1 : (result[3] || 0) * 10),
                txt
              })
            }
          }
        }
        this.lines.sort((a, b) => {
          return a.time - b.time
        })
      },
      findLine(time) {
        for (let i = 0; i < this.lines.length; i++) {
          if (time <= this.lines[i].time) {
            return i - 1
          }
        }
        return this.lines.length - 1
      },
      scrollToLine(index) {
        if (!this.moveing) {
          this.$refs.lyricWrapper.scrollToElement(this.$refs.line[index], 1000)
        }
      },
      scrollTo(y) {
        if (!this.moveing) {
          this.$refs.lyricWrapper.scrollTo(0, 1000)
        }
      },
      play() {
        const index = this.findLine(this.currentTime * 1000)
        this.currentLine = index
      },
      // touchStart(e) {
      //   this.touch.initiated = true
      //   this.touch.startX = e.touches[0].pageX
      // },
      // touchMove(e) {
      //   this.moveing = true
      // },
      // touchEnd(e) {
      //   clearTimeout(this.timer)
      //   this.timer = setTimeout(() => {
      //     this.moveing = false
      //   }, 2000);
      // },
      // scroll(pos) {
      //   const lyricWrapperHieght = this.$refs.lyricWrapper.$el.clientHeight
      //   const lyricLinesHeight = this.$refs.lyricLines.clientHeight
      //   this.scrollY = pos.y
      // }
    },
    watch: {
      lyric() {
        if (this.lyric === '') {
          return
        }
        this.init()
        if (this.lines.length !== 0) {
          this.staticLyric = []
          this.staticFlag = false
          this.scrollTo(0, 1000)
        } else {
          this.staticLyric = this.lyric.indexOf('\n') === -1 ? this.lyric.split(',') : this.lyric.split('\n')
          this.staticFlag = true
        }
      },
      currentTime() {
        if (this.lines.length !== 0) {
          this.play()
        }
      },
      currentLine() {
        if (this.currentLine >= 5) {
          this.scrollToLine(this.currentLine - 5)
        } else {
          this.scrollToLine(0)
        }
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .lyric-wrapper {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    &.static-center {
      display: flex;
      justify-content: center;
      flex-flow: column;
    }
    .lyric-lines, .lyric-static {
      .text {
        line-height: 32px;
        font-size: $font-size-medium;
        &.static {
          white-space: initial;
        }
        &.current {
          color: $color-white;
          font-weight: bold;
        }
        &.moveing-line {
          color: $color-active;
          font-weight: bold;
        }
      }
    }
    .lyric-message {
      height: 100%;
      display: flex;
      flex-flow: column;
      justify-content: center;
    }
    .middle-line {
      height: 1px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      color: $color-white;
      .play, .time {
        margin-top: -7px;
      }
      .line {
        width: 70%;
        border-top: 1px dashed $color-white;
        margin: 0 10px;
      }
    }
  }
</style>
