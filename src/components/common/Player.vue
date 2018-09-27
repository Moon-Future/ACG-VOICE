<template>
  <div class="player">
    <transition
      name="normal"
      enter-active-class="animated fadeInRight faster"
      leave-active-class="animated fadeOutDown faster"
    >
      <div class="normal-player" v-show="fullScreen" ref="normalPlayer">
        <div class="background">
          <img :src="currentSong.bgimg || currentSong.coverimg" alt="" width="100%" height="100%">
        </div>
        <div class="top">
          <div class="back">
            <svg class="iconfont icon-back" aria-hidden="true" @click="goBack">
              <use xlink:href="#icon-acg-arrow-down"></use>
            </svg>
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
            <h2 class="subtitle">{{ currentSong.characterName }} ></h2>
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
          <div class="middle-r" v-show="!middleLeft">
            <lyric :lyric="lyric" :currentTime="currentTime" :searching="lyricSearching"></lyric>
          </div>
          <div class="middle-b" v-show="middleLeft">
            <div class="like">
              <svg class="iconfont" aria-hidden="true" @click.stop="like">
                <use :xlink:href="`#${likeIcon}`"></use>
              </svg>
            </div>
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
              <svg class="iconfont" aria-hidden="true" @click="changeMode">
                <use :xlink:href="`#${modeIcon}`"></use>
              </svg>
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
      <!-- <div class="mini-player" v-if="miniPlayer" v-show="!fullScreen" ref="miniPlayer">
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
      </div> -->
      <div class="mini-player-circle">
        <div class="control" @click="play">
          <progress-circle :percent="percent">
            <svg class="iconfont" aria-hidden="true" @click.stop="like">
              <use :xlink:href="`#${playIcon}`"></use>
            </svg>
          </progress-circle>
        </div>
      </div>
    </transition>
    <play-list :data="playlist" ref="playlist"></play-list>
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
  import PlayList from 'components/common/PlayList'
  import Lyric from 'components/common/Lyric'
  import apiUrl from '@/serviceAPI.config.js'
  import { playMode, playModeList, modeIconClass } from 'common/js/config'
  import { getRandomInt } from 'common/js/util'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    data() {
      return {
        bgimg: 'http://ossweb-img.qq.com/images/lol/web201310/skin/big266002.jpg',
        // voiceSrc: require('assets/星辰陨落，只为坠入爱河.wav'),
        voiceSrc: '',
        currentTime: 0,
        duration: 0,
        songReady: false,
        moveing: false,
        buffered: [],
        readyState: 0,
        loadingShow: true,
        playListShow: false,
        wordsLoop: false,
        miniPlayer: true,
        likeFill: false,
        middleLeft: true,
        lyric: '',
        lyricSearching: false
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
        return modeIconClass[this.mode].icon
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
        this.$toast({
          message: modeIconClass[this.mode].txt,
          position: 'bottom',
          duration: 1000
        })
      },
      prev() {
        this.changeSong('prev')
      },
      play() {
        if (this.playlist.length === 0) {
          this.$toast({
            message: '播放列表空',
            duration: 1000,
            position: 'bottom'
          })
          return
        }
        const audio = this.$refs.audio
        this.setPlaying(!this.playing)
      },
      next() {
        this.changeSong('next')
      },
      showPlayList() {
        this.$refs.playlist.show()
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
          return
        }
        if (this.mode === playMode.sequence || this.mode === playMode.loop || this.mode === playMode.one) {
          if (type === 'next' || type === undefined) {
            currentIndex = currentIndex === length - 1 ? 0 : currentIndex + 1
          } else if (type === 'prev') {
            currentIndex = currentIndex === 0 ? length - 1 : currentIndex - 1
          }
        } else if (this.mode === playMode.random) {
          currentIndex = getRandomInt(0, length - 1, currentIndex)
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
      getLyric() {
        this.lyricSearching = true
        if (this.currentSong.platform !== 'wyy') {
          this.lyric = this.currentSong.lyric
          this.lyricSearching = false
          return
        }
        this.$http.post(apiUrl.getLyric, {
          id: this.currentSong.id, 
          platform: this.currentSong.platform
        }).then(res => {
          if (res.data.code === 200) {
            this.lyric = res.data.message
          } else {
            this.lyric = ''
          }
          this.lyricSearching = false
        }).catch(err => {
          this.lyric = ''
          this.lyricSearching = false
        })
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
      ...mapActions(['clearPlaylist'])
    },
    watch: {
      playing() {
        this.$nextTick(() => {
          this.playing ? this.$refs.audio.play() : this.$refs.audio.pause()
        })
      },
      currentSong(newSong, oldSong) {
        if (this.playlist.length === 0 || 
            (newSong.id && newSong.id === oldSong.id) || 
            (newSong.key && (newSong.key + newSong.name === oldSong.key + oldSong.name))) {
          return
        }
        this.buffered = []
        this.voiceSrc = this.currentSong.src
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.audio.play()
          this.getLyric()
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
      VoiceList,
      PlayList,
      Lyric
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
            padding: 10px;
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
            i, .iconfont {
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
    .mini-player-circle {
      position: fixed;
      bottom: 0;
      margin: auto;
      width: 2rem;
      height: 2rem;
      left: 50%;
      margin-left: -1rem;
      z-index: 120;
      .control {
        height: 100%;
        .iconfont {
          font-size: 2rem;
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          color: gray;
        }
      }
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
