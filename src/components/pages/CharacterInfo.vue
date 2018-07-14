<template>
  <div class="character-info">
    <div class="slider-wrapper">
      <i class="iconfont icon-acg-zuo"></i>
      <slider :data="swiperData" :dotShow="false">
        <div v-for="(data, i) in swiperData" :key="i">
          <a :href="data.linkUrl">
            <img :src="data.src" alt="">
          </a>
        </div>
      </slider>
    </div>
    <div class="play-all"><i class="iconfont icon-acg-play-circle"></i></div>
    <div class="character-message">
      <div class="character-avatar">
        <img src="../../../static/spider/images/LOL/不祥之刃-卡特琳娜(head).jpg" alt="头像">
      </div>
      <div class="character-msg">
        <p>姓名：卡特琳娜</p>
        <p>昵称：不祥之刃</p>
        <p>来自：英雄联盟</p>
        <p>配音：xxx</p>
      </div>
    </div>
    <div class="devide-line"></div>
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
  },
  components: {
    Slider
  },
}
</script>

<style lang="scss">
  @import 'common/css/mixin.scss';
  .devide-line {
    @include devide-line(2px);
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
    margin: 10px;
    .character-avatar {
      display: flex;
      flex-flow: column;
      justify-content: center;
      img {
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
      }
    }
    .character-msg {
      padding: 0.5rem;
      font-size: 0.8rem;
      display: flex;
      flex-flow: column;
      margin-left: 10px;
      p {
        padding: 3px 0;
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
