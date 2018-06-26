<template>
  <div class="character-info">
    <div class="character-msg">
      <p>姓名：卡特琳娜</p>
      <p>昵称：不祥之刃</p>
      <p>来自：英雄联盟</p>
      <p>配音：xxx</p>
    </div>
    <div class="character-avatar">
      <img src="../../../static/spider/images/LOL/不祥之刃-卡特琳娜(head).jpg" alt="头像">
      <!-- <img src="../../../static/spider/images/LOL/不祥之刃-卡特琳娜(head).jpg" alt="头像"> -->
    </div>
    <swiper :list="swiperSkins" auto></swiper>
    <div class="character-voice-list">
      <flexbox orient="vertical">
        <flexbox-item style="margin-top: 2px" v-for="(voice, i) in voices" :key="i">
          <div class="character-voice">
            <i class="iconfont icon-acg-play-circle"></i>
            <span>{{ voice.text }}</span>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Search, Swiper, Tab, TabItem, Flexbox, FlexboxItem } from 'vux'
export default {
  name: 'characterInfo',
  data() {
    return {
      swiperSkins: [
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          title: '不祥之刃'
        },
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          title: '九尾妖狐'
        },
        {
          url: 'javascript:',
          // img: '~/server/spider/files/images/LOL/光辉女郎-光辉女郎(skin8).jpg',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
          title: '光辉女郎'
        }
      ],
      voices: [
        {
          voiceUrl: '',
          text: '永远不要质疑我的忠诚，你不会了解我为之忍受的一切'
        }, {}, {}, {}, {}
      ]
    }
  },
  components: {
    Search,
    Swiper,
    Flexbox,
    FlexboxItem,
    Tab,
    TabItem
  },
}
</script>

<style lang="scss">
  .character-msg {
    background-color: red;
    text-align: left;
    padding: 0.5rem;
    font-size: 0.8rem;
    height: 6rem;
    box-sizing: border-box;
  }
  .character-avatar {
    // display: flex;
    // justify-content: center;
    position: absolute;
    top: 4rem;
    left: 50%;
    margin-left: -2rem;
    z-index: 999;
    img {
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
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
