<template>
  <div class="player" v-show="playlist.length>0" @touchstart.stop="hidePlayList">
    <transition
      name="normal"
      enter-active-class="animated fadeInRight faster"
      leave-active-class="animated fadeOutDown faster"
    >
      <div class="normal-player" v-show="fullScreen" ref="normalPlayer">
        <div class="background">
          <img :src="currentSong.bgimg" alt="" width="100%" height="100%">
        </div>
        <div class="top">
          <div class="back">
            <i class="iconfont icon-acg-arrow-down- icon-back" @click="goDown"></i>
          </div>
          <div class="song-title animated bounceInDown">
            <h1 class="title">{{ currentSong.text }}</h1>
            <h2 class="subtitle">{{ currentSong.name }} ></h2>
          </div>
        </div>
        <div class="middle">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper animated zoomIn">
              <div class="cd">
                <img :src="currentSong.bgimg" alt="" class="image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ currentSong.text }}</div>
            </div>
          </div>
          <scroll class="middle-r">
            <div class="lyric-wrapper">
              <div>
                <p>{{ 3333333 }}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{ format(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar 
                :percent="percent"
                :buffered="buffered"
                :loadingShow="loadingShow"
                @percentChange="percentChange"
              >
              </progress-bar>
            </div>
            <span class="time time-r">{{ format(duration) }}</span>
          </div>
          <div class="operators animated slideInUp">
            <div class="icon i-left">
              <i class="iconfont icon-acg-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="iconfont icon-acg-prev" @click="prev"></i>
            </div>
            <div class="icon i-center">
              <i class="iconfont" :class="playIco" @click="play"></i>
            </div>
            <div class="icon i-right">
              <i class="iconfont icon-acg-next" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i class="iconfont icon-acg-playlist" @click="showPlayList"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" ref="miniPlayer">
        <div class="mini-player">
          <div class="icon">
            <img src="" alt="" width="40" height="40">
          </div>
          <div class="text">
            <h2 class="name"></h2>
            <p class="desc"></p>
          </div>
          <div class="control">

          </div>
          <div class="control"></div>
        </div>
      </div>
    </transition>
    <transition 
      name="play-list"
      enter-active-class="animated slideInUp faster"
      leave-active-class="animated slideOutDown faster"
    >
      <div class="play-list" v-show="playListShow">
        <voice-list :data="playlist"></voice-list>
      </div>
    </transition>
    <audio :src="voiceSrc" ref="audio"
        @timeupdate="updateTime"
        @progress="progress"
        @canplay="canplay"
        @ended="end">
    </audio>
  </div>
</template>

<script>
  import Scroll from 'components/common/Scroll'
  import ProgressBar from 'components/common/ProgressBar'
  import VoiceList from 'components/common/VoiceList'
  import { playMode } from 'common/js/config'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    data() {
      return {
        bgimg: 'http://ossweb-img.qq.com/images/lol/web201310/skin/big266002.jpg',
        // voiceSrc: require('assets/星辰陨落，只为坠入爱河.wav'),
        voiceSrc: '#',
        currentTime: 0,
        duration: 0,
        songReady: false,
        moveing: false,
        buffered: [],
        readyState: 0,
        loadingShow: true,
        playListShow: false
      }
    },
    computed: {
      playIco() {
        return this.playing ? 'icon-acg-pause' : 'icon-acg-play'
      },
      percent() {
        return this.currentTime / this.duration
      },
      ...mapGetters([
        'currentIndex',
        'currentSong',
        'fullScreen',
        'playing',
        'playlist',
        'mode'
      ])
    },
    created() {
      this.$nextTick(() => {
        this.audio = this.$refs.audio
        this.readyState = this.audio.readyState
      })
    },
    methods: {
      goDown() {
        this.setFullScreen(false)
      },
      hidePlayList(e) {
        const target = e.target
        if (this.$refs.normalPlayer.contains(target) || this.$refs.miniPlayer.contains(target)) {
          this.playListShow = false
        }
      },
      prev() {
        let currentIndex = 0
        if (this.mode !== playMode.random) {
          currentIndex = this.currentIndex === 0 ? this.playlist.length - 1 : this.currentIndex - 1
        }
        this.setCurrentIndex(currentIndex)
        this.setPlaying(true)
      },
      play() {
        const audio = this.$refs.audio
        this.setPlaying(!this.playing)
        this.playing ? audio.play() : audio.pause()
      },
      next() {
        let currentIndex = 0
        if (this.mode !== playMode.random) {
          currentIndex = this.currentIndex === this.playlist.length - 1 ? 0 : this.currentIndex + 1
        }
        this.setCurrentIndex(currentIndex)
        this.setPlaying(true)
      },
      showPlayList() {
        this.playListShow = !this.playListShow
      },
      updateTime(e) {
        if (!this.moveing) {
          this.currentTime = e.target.currentTime
        }
        this.readyState = this.audio.readyState
      },
      progress() {
        const audio = this.$refs.audio
        const buffered = audio.buffered
        const len = buffered.length
        this.buffered = []
        for (let i = 0; i < len; i++) {
          this.buffered.push({
            x: buffered.start(i) / this.duration,
            y: buffered.end(i) / this.duration
          })
        }
      },
      canplay() {
        this.duration = this.audio.duration
        this.songReady = true
      },
      end() {
        this.setPlaying(false)
        this.currentTime = 0
      },
      percentChange({percent, flag}) {
        if (flag === true) {
          this.moveing = false
          this.audio.currentTime = this.duration * percent
          this.currentTime = this.duration * percent
        } else {
          this.moveing = true
          this.currentTime = this.duration * percent
        }
        this.readyState = this.audio.readyState
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlaying: 'SET_PALYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      }),
    },
    watch: {
      playing() {

      },
      currentSong() {
        // this.voiceSrc = 'http://www.ytmp3.cn/down/50965.mp3'
        this.buffered = []
        this.voiceSrc = this.currentSong.src
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.audio.play()
        }, 1000)
      },
      readyState() {
        this.loadingShow = this.readyState >= 3 ? false : true
      }
    },
    components: {
      Scroll,
      ProgressBar,
      VoiceList
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .player {
    .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: $color-background;
      color: $color-text;
      z-index: 150;
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
      }
      .top {
        position: relative;
        margin-bottom: 25px;
        .back {
          position: absolute;
          z-index: 50;
          .icon-back {
            display: block;
            padding: 10px;
            font-size: $font-size-large-x;
            color: $color-active;
          }
        }
        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          font-size: $font-size-large;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .subtitle {
          line-height: 20px;
          text-align: center;
          font-size: $font-size-medium;
        }
      }
      .middle {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .middle-l {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              &.play {
                animation: rotate 20s linear infinite;
              }
              &.pause {
                 animation-play-state: paused;
              }
              .image {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
          .playing-lyric-wrapper {
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;
            .playing-lyric {
              height: 20px;
              line-height: 20px;
              font-size: $font-size-medium;
            }
          }
        }
        .middle-r {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .lyric-wrapper {
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .text {
              line-height: 32px;
              font-size: $font-size-medium;
              &.current {
                color: $color-active
              }
            }
          }
        }
      }
      .bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;
        .dot-wrapper {
          text-align: center;
          font-size: 0;
          .dot {
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            &.active {
              width: 20px;
              border-radius: 5px;
            }
          }
        }
        .progress-wrapper {
          display: flex;
          align-items: center;
          width: 85%;
          margin: 0px auto;
          padding: 10px 0;
          .time {
            font-size: $font-size-small;
            flex: 0 0 30px;
            line-height: 30px;
            width: 30px;
            &.time-l {
              text-align: left;
              margin-right: 5px;
            }
            &.time-r {
              text-align: right;
              margin-left: 5px;
            }
          }
          .progress-bar-wrapper {
            flex: 1
          }
        }
        .operators {
          display: flex;
          align-items: center;
          .icon {
            flex: 1;
            &.disable {

            }
            i {
              font-size: 30px;
              color: $color-active;
            }
          }
          .i-left {
            text-align: right;
          }
          .i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 40px;
            }
          }
          .i-right {
            text-align: left;
          }
        }
      }
    }
    .play-list {
      z-index: 200;
      position: fixed;
      background: #fff;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
