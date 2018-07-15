<template>
  <div class="character-info">
    <div class="slider-wrapper">
      <i class="iconfont icon-acg-zuo" @click="goBack()"></i>
      <slider :data="swiperData" :dotShow="false">
        <div v-for="(data, i) in swiperData" :key="i">
          <a :href="data.linkUrl">
            <img :src="data.src" alt="">
          </a>
        </div>
      </slider>
    </div>
    <!-- <div class="play-all"><i class="iconfont icon-acg-play-circle"></i></div> -->
    <div class="character-message">
      <div class="character-avatar">
        <img src="../../../static/spider/images/LOL/不祥之刃-卡特琳娜(head).jpg" alt="头像">
      </div>
      <div class="character-msg">
        <p>卡特琳娜(不祥之刃) - 英雄联盟</p>
        <p>
          <span class="voice-num">Voices <span>20</span></span>
          <span class="like-num">
            <i class="iconfont icon-acg-like"></i> <span>70</span>
          </span>
        </p>
      </div>
    </div>
    <div class="voice-list">

    </div>
    <!-- <div class="devide-line"></div> -->
    <!-- <div class="character-voice-list">
      <flexbox orient="vertical">
        <flexbox-item style="margin-top: 2px" v-for="(voice, i) in voices" :key="i">
          <div class="character-voice">
            <i class="iconfont icon-acg-play-circle"></i>
            <span>{{ voice.text }}</span>
          </div>
        </flexbox-item>
      </flexbox>
    </div> -->
  </div>
</template>

<script>
import Slider from '../common/Slider'
import { swiperData } from '../../common/js/data.js'
export default {
  name: 'characterInfo',
  data() {
    return {
      swiperData: [],
      voices: [
        {
          voiceUrl: '',
          text: '永远不要质疑我的忠诚，你不会了解我为之忍受的一切'
        }, {}, {}, {}, {}
      ]
    }
  },
  created() {
    this.getSwiperData()
  },
  methods: {
    getSwiperData() {
      this.swiperData = swiperData
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  components: {
    Slider
  },
}
</script>

<style lang="scss">
  @import 'common/css/variable.scss';
  @import 'common/css/mixin.scss';
  .devide-line {
    @include devide-line(2px);
  }
  .character-info {
    height: 100%;
    background: $color-background;
  }
  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    i {
      position: absolute;
      color: #fff;
      z-index: 999;
      font-size: 2rem;
      margin: 10px;
    }
  }
  .play-all {
    position: absolute;
    right: 25px;
    margin-top: -1.5rem;
    i {
      font-size: 3rem;
    }
  }
  .character-message {
    display: flex;
    margin: 5%;
    position: absolute;
    background: $color-background-white;
    width: 90%;
    height: 4rem;
    margin-top: -2rem;
    border-radius: 5px;
    .character-avatar {
      display: flex;
      flex-flow: column;
      justify-content: center;
      margin-left: 10px;
      img {
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
      }
    }
    .character-msg {
      padding: 0.5rem 0.5rem 0.5rem 0;
      font-size: 0.8rem;
      display: flex;
      flex-flow: column;
      margin-left: 10px;
      p {
        padding: 3px 0;
        span {
          font-size: 0.5rem;
          color: #c0c0c0;
        }
        .like-num {
          margin-left: 20px;
        }
      }
    }
  }
  .character-voice-list {
    .character-voice {
      padding: 0.3rem;
      background-color: beige;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      span {
        font-size: 0.7rem;
      }
    }
  }
</style>
