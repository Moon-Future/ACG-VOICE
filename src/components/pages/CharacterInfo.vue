<template>
  <div class="character-info">
    <div class="character-msg">
      <p>姓名：卡特琳娜</p>
      <p>昵称：不祥之刃</p>
      <p>来自：英雄联盟</p>
      <p>配音：xxx</p>
    </div>
    <!-- <div class="character-avatar">
      <img src="../../../static/spider/images/LOL/不祥之刃-卡特琳娜(head).jpg" alt="头像">
    </div> -->
    <!-- <swiper :list="swiperSkins" auto></swiper>
    <div class="character-voice-list">
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
export default {
  name: 'characterInfo',
  data() {
    return {
      swiperSkins: [
        {
          url: 'javascript:',
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E7%86%94%E5%B2%A9%E5%B7%A8%E5%85%BD-%E5%A2%A8%E8%8F%B2%E7%89%B9%28skin4%29.jpg',
          title: '熔岩巨兽-墨菲特'
        },
        {
          url: 'javascript:',
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E5%9C%A3%E6%9E%AA%E6%B8%B8%E4%BE%A0-%E5%8D%A2%E9%94%A1%E5%AE%89%28skin1%29.jpg',
          title: '圣枪游侠-卢锡安'
        },
        {
          url: 'javascript:',
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E4%BB%99%E7%81%B5%E5%A5%B3%E5%B7%AB-%E7%92%90%E7%92%90%28skin2%29.jpg',
          title: '仙灵女巫-璐璐'
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
