<template>
  <div class="player" v-show="playlist.length>0">
    <transition 
      name="normal"
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutDown"
    >
      <div class="normal-player" v-show="fullScreen">
        播放器 {{ currentSong.name }}
        <i class="iconfont icon-acg-arrow-down-" @click="goDown"></i>
        <div class="background">
          <img src="" alt="" width="100%" height="100%">
        </div>
        <div class="top">
          <div class="back">
            <i class="icontfont"></i>
          </div>
          <h1 class="title"></h1>
          <h2 class="subtitle"></h2>
        </div>
        <div class="middle">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper">
              <div class="cd">
                <img src="" alt="" class="image">
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>  
    <div class="mini-player"></div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    data() {
      return {
        bgimg: 'http://ossweb-img.qq.com/images/lol/web201310/skin/big266002.jpg'
      }
    },
    computed: {
      ...mapGetters([
        'currentIndex',
        'currentSong',
        'fullScreen',
        'playing',
        'playlist'
      ])
    },
    methods: {
      goDown() {
        this.setFullScreen(false)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      }),
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
      }
    }
  }
</style>
