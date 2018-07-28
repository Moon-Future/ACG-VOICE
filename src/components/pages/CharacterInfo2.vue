<template>
  <div class="character-info">
    <div class="character-descr">
      <div class="slider-wrapper">
        <i class="iconfont icon-acg-zuo" @click="goBack()"></i>
        <slider :data="swiperData" :dotShow="false">
          <div v-for="(data, i) in swiperData" :key="i">
            <img :src="data.srcOfficial" alt="">
          </div>
        </slider>
      </div>
      <div class="character-message">
        <div class="character-avatar">
          <img :src="characterInfo.avatarOfficial" alt="头像">
        </div>
        <div class="character-msg">
          <p>{{ characterInfo.name }} - {{ characterInfo.nickName }}</p>
          <p>
            <span class="voice-num">Voices <span>20</span></span>
            <span class="like-num">
              <i class="iconfont icon-acg-like"></i> <span>70</span>
            </span>
          </p>
        </div>
        <div class="character-more">
          <i class="iconfont icon-acg-switch"></i>
        </div>
      </div>
    </div>
    <div class="scorll-container">
      <scroll :listenScroll="listenScroll"
              @scroll="scroll"
              :probeType="probeType">
        <voice-list :data="voiceData" :showRank="showRank"></voice-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import Slider from 'components/common/Slider'
import Scroll from 'components/common/Scroll'
import VoiceList from 'components/common/VoiceList'
import { swiperData, voiceData } from '../../common/js/data.js'
import apiUrl from '@/serviceAPI.config.js'
import { mapGetters } from 'vuex'
export default {
  name: 'characterInfo',
  data() {
    return {
      characterInfo: {},
      swiperData: [],
      voiceData: [],
      showRank: true,
      probeType: 3,
      listenScroll: true
    }
  },
  created() {
    this.getData()
    this.getVoiceData()
  },
  methods: {
    getData() {
      let findKey = this.character.findKey
      this.$http.get(apiUrl.getCharacterSkinAndAvatar, {
        params: {findKey}
      }).then((res) => {
        let data = res.data
        this.swiperData = data.skin.length === 0 ? swiperData : data.skin
        this.characterInfo = data.avatar[0] || {}
      })
    },
    getVoiceData() {
      this.voiceData = voiceData
    },
    scroll(pos) {
      // console.log(pos)
    },
    goBack() {
      this.$router.back()
    }
  },
  computed: {
    ...mapGetters(['character'])
  },
  watch: {
    character() {
      this.getData()
    }
  },
  components: {
    Slider,
    Scroll,
    VoiceList
  },
}
</script>

<style lang="scss">
  @import 'common/css/variable.scss';
  @import 'common/css/mixin.scss';
  .devide-line {
    @include devide-line(2px);
  }
  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    z-index: 990;
    i {
      position: absolute;
      color: #fff;
      font-size: 2rem;
      margin: 10px;
      z-index: 999;
    }
    img {
      height: 10rem;
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
    z-index: 999;
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
    .character-more {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      i {
        font-size: 2rem;
      }
    }
  }
  .scorll-container {
    position: fixed;
    width: 100%;
    top: 10rem;
    bottom: 2rem;
    padding-top: 3rem;
    box-sizing: border-box;
    background: $color-background;
    color: $color-text;
  }
</style>
