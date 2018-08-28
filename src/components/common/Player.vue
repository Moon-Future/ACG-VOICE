<template>
  <div class="player" v-show="playlist.length>0">
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
            <i class="iconfont icon-acg-arrow-down- icon-back" @click="goBack"></i>
          </div>
          <div class="song-title animated bounceInDown">
            <h1 class="title" ref="title">
              <span v-if="!wordsLoop" class="words" ref="words">{{ currentSong.name }}</span>
              <div v-if="wordsLoop" class="words-loop">
                <span ref="words">{{ currentSong.name }}</span><span class="blank"></span>
                <span>{{ currentSong.name }}</span><span class="blank"></span>
                <span>{{ currentSong.name }}</span><span class="blank"></span>
              </div>
            </h1>
            <h2 class="subtitle">{{ currentSong.character }} ></h2>
          </div>
        </div>
        <div class="middle" @click="switchMiddle">
          <div class="middle-l" ref="middleL" v-show="middleLeft">
            <div class="cd-wrapper animated zoomIn">
              <div class="cd" :class="[playing ? 'play' : 'play pause']">
                <img :src="currentSong.coverimg" alt="" class="image">
              </div>
            </div>
          </div>
          <scroll class="middle-r" v-show="!middleLeft">
            <div class="lyric-wrapper">
              <p>33333333333333333</p>
            </div>
          </scroll>
          <div class="middle-b" v-show="middleLeft">
            <div class="like"><i class="iconfont" :class="likeIcon" @click.stop="like"></i></div>
            <div class="like"><i class="iconfont icon-acg-download" @click.stop="download"></i></div>
            <div class="like"><i class="iconfont icon-acg-comment" @click.stop="comment"></i></div>
            <div class="like"><i class="iconfont icon-acg-more-vertical" @click.stop="more"></i></div>
          </div>
        </div>
        <div class="bottom">
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
              <i class="iconfont" :class="modeIcon" @click="changeMode"></i>
            </div>
            <div class="icon i-left">
              <i class="iconfont icon-acg-prev" @click="prev"></i>
            </div>
            <div class="icon i-center">
              <i class="iconfont" :class="playIcon" @click="play"></i>
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
      <div class="mini-player" v-if="miniPlayer" v-show="!fullScreen" ref="miniPlayer">
        <div class="mini-player">
          <div class="icon">
            <img :src="currentSong.coverimg" alt="" width="40" height="40" @click="goFullScreen">
          </div>
          <div class="text">
            <h2 class="name" v-html="currentSong.name"></h2>
            <p class="desc" v-html="currentSong.character"></p>
          </div>
          <div class="control" @click="play">
            <progress-circle :percent="percent">
              <i class="iconfont icon-play" :class="playIcon"></i>
            </progress-circle>
          </div>
          <div class="control">
            <i class="iconfont icon-acg-playlist icon-playlist" @click="showPlayList"></i>
          </div>  
        </div>
      </div>
    </transition>
    <transition 
      name="play-list"
      enter-active-class="animated slideInUp faster"
      leave-active-class="animated slideOutDown faster"
    >
      
      <div class="play-list" v-show="playListShow">
        <scroll class="play-list-scroll" :data="playlist">
          <voice-list :data="playlist" :activeIndex="currentIndex" :showSpeaker="true" @select="selectItem"></voice-list>
        </scroll>
      </div>
    </transition>
    <div class="mask-layer" v-show="playListShow" @click="hidePlayList"></div>
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
  import ProgressCircle from 'components/common/ProgressCircle'
  import VoiceList from 'components/common/VoiceList'
  import { playMode, playModeList } from 'common/js/config'
  import { getRandomInt } from 'common/js/util'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
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
        playListShow: false,
        wordsLoop: false,
        miniPlayer: false,
        likeFill: false,
        middleLeft: true
      }
    },
    computed: {
      playIcon() {
        return this.playing ? 'icon-acg-pause' : 'icon-acg-play'
      },
      likeIcon() {
        return this.likeFill ? 'icon-acg-like_fill i-like-fill' : 'icon-acg-like'
      },
      percent() {
        return this.currentTime / this.duration
      },
      modeIcon() {
        return this.modeIconClass[this.mode]
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
      this.modeIconClass = {
        [playMode.sequence]: 'icon-acg-sequence',
        [playMode.loop]: 'icon-acg-listloop',
        [playMode.random]: 'icon-acg-random',
        [playMode.one]: 'icon-acg-oneloop'
      }
    },
    methods: {
      goMini() {
        this.setFullScreen(false)
      },
      goFullScreen() {
        this.setFullScreen(true)
      },
      goBack() {
        this.setFullScreen(false)
      },
      changeMode() {
        const modeIndex = playModeList.indexOf(this.mode)
        this.setMode(playModeList[modeIndex === playModeList.length - 1 ? 0 : modeIndex + 1])
      },
      prev() {
        this.changeSong('prev')
      },
      play() {
        const audio = this.$refs.audio
        this.setPlaying(!this.playing)
        this.playing ? audio.play() : audio.pause()
      },
      next() {
        this.changeSong('next')
      },
      showPlayList() {
        this.playListShow = !this.playListShow
      },
      hidePlayList(e) {
        this.playListShow = false
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
        this.changeSong()

        // if (this.mode === playMode.sequence && this.currentIndex === this.playlist.length - 1) {
        //   this.setPlaying(false)
        //   this.currentTime = 0
        //   return
        // }
        // let currentIndex = 0
        // if (this.mode !== playMode.random) {
        //   currentIndex = this.currentIndex === this.playlist.length - 1 ? 0 : this.currentIndex + 1
        // }
        // this.setCurrentIndex(currentIndex)
        // this.setPlaying(true)
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
      switchMiddle() {
        this.middleLeft = !this.middleLeft
      },
      like() {
        this.likeFill = !this.likeFill
      },
      download() {

      },
      comment() {

      },
      more() {

      },
      changeSong(type) {
        const length = this.playlist.length
        let currentIndex = this.currentIndex
        if (type === undefined && (this.mode === playMode.one || (this.mode === playMode.sequence && currentIndex === length - 1))) {
          this.setPlaying(false)
          this.currentTime = 0
        } else if (this.mode === playMode.sequence || this.mode === playMode.loop || this.mode === playMode.one) {
          if (type === 'next') {
            currentIndex = currentIndex === length - 1 ? 0 : currentIndex + 1
          } else if (type === 'prev') {
            currentIndex = currentIndex === 0 ? length - 1 : currentIndex - 1
          } else if (this.mode === playMode.random) {
            currentIndex = getRandomInt(0, length - 1, currentIndex)
          }
        }
        this.setCurrentIndex(currentIndex)
        this.setPlaying(true)
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      selectItem(item, index) {
        this.setCurrentIndex(index)
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
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setMode: 'SET_PALY_MODE'
      }),
    },
    watch: {
      playing() {

      },
      currentSong() {
        this.buffered = []
        this.voiceSrc = this.currentSong.src
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.audio.play()
        }, 1000)

        this.$nextTick(() => {
          if (this.$refs.words.clientWidth > this.$refs.title.clientWidth) {
            this.wordsLoop = true
          } else {
            this.wordsLoop = false
          }
        })
      },
      readyState() {
        this.loadingShow = this.readyState >= 3 ? false : true
      }
    },
    components: {
      Scroll,
      ProgressBar,
      ProgressCircle,
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
        margin-bottom: 1rem;
        line-height: 2rem;
        .back {
          position: absolute;
          z-index: 50;
          .icon-back {
            display: block;
            padding: 0 10px;
            font-size: $font-size-large-x;
            color: $color-active;
          }
        }
        .title {
          width: 70%;
          margin: 0 auto;
          text-align: center;
          font-size: $font-size-large;
          white-space: nowrap;
          overflow: hidden;
          .words {
            display: inline-block;
          }
          .words-loop {
            display: inline-block;
            animation: 15s wordsLoop linear infinite normal;
            animation-delay: 3s;
            .blank {
              display: inline-block;
              width: 50px;
            }
          }
        }
        .subtitle {
          text-align: center;
          font-size: $font-size-medium;
        }
      }
      .middle {
        position: fixed;
        width: 100%;
        top: 5rem;
        bottom: 8rem;
        white-space: nowrap;
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
        }
        .middle-r {
          display: block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .lyric-wrapper {
            width: 80%;
            height: 100%;
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
        .middle-b {
          position: absolute;
          bottom: 0;
          width: 60%;
          display: flex;
          justify-content: space-between;
          margin: 0 20%;
          .iconfont {
            font-size: $font-size-large-x;
            &.i-like-fill {
              color: $color-red;
            }
          }
        }
      }
      .bottom {
        position: absolute;
        bottom: 1rem;
        width: 100%;
        .progress-wrapper {
          display: flex;
          align-items: center;
          width: 85%;
          margin: 0px auto;
          padding: 1rem 0;
          height: 2rem;
          .time {
            font-size: $font-size-small;
            flex: 0 0 30px;
            line-height: 2rem;
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
          height: 3rem;
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
    .mini-player {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 200;
      width: 100%;
      height: 3rem;
      background: $color-deepgray;
      color: $color-white;
      .icon {
        padding: 0 10px;
        img {
          border-radius: 50%;
          width: 3.5rem;
          height: 3.5rem;
          margin-top: -1rem;
          &.play {
            animation: rotate 10s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        white-space: nowrap;
        .name {
          margin-bottom: 2px;
          font-size: $font-size-medium;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .desc {
          font-size: $font-size-small;
          color: $color-gray;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .control {
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
        padding: 0 10px;
        color: $color-active;
        .icon-play, .icon-playlist {
          font-size: 30px;
        }
        .icon-play {
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
        }
      }
    }
    .play-list {
      z-index: 200;
      position: fixed;
      top: 15rem;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 10px 10px 0 0;
      background: $color-background;
      color: $color-white;
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

  @keyframes rotate {
    0% {transform: rotate(0)}
    100% {transform: rotate(360deg)}
  }
  @keyframes wordsLoop {
    0% {transform: translateX(0px)}
    100% {transform: translateX(-33.3%)}
  }
</style>
