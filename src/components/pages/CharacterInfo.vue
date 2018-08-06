<template>
  <div class="character-info">
    <div class="character-skin" ref="slider">
      <i class="iconfont icon-acg-arrow-left-" @click="goBack()"></i>
      <slider :data="swiperData"
              :showDot="false"
              :autoPlay="true"
              :itemHeight="itemHeight"
              :itemScale="itemScale">
        <div v-for="(data, i) in swiperData" :key="i">
          <img :src="data.srcOfficial" alt="">
        </div>
      </slider>
    </div>
    <div class="filter" ref="filter"></div>
    <div class="container">
      <div class="character-message" ref="message">
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
      <div class="scorll-container" ref="scroll">
        <scroll :listenScroll="listenScroll"
                @scroll="scroll"
                :probeType="probeType">
          <voice-list :data="voiceData" :showRank="showRank" @select="selectItem"></voice-list>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import Slider from 'components/common/Slider'
  import Scroll from 'components/common/Scroll'
  import VoiceList from 'components/common/VoiceList'
  import { swiperData, voiceData } from '../../common/js/data.js'
  import apiUrl from '@/serviceAPI.config.js'
  import { mapGetters, mapActions } from 'vuex'

  const RESERVED_HEIGHT = 80

  export default {
    name: 'characterInfo',
    data() {
      return {
        characterInfo: {},
        swiperData: [],
        voiceData: [],
        showRank: true,
        probeType: 3,
        listenScroll: true,
        scrollY: 0,
        itemHeight: '10rem',
        itemScale: 1
      }
    },
    created() {
      this.getData()
      this.getVoiceData()
    },
    mounted() {
      this.messageTop = this.$refs.message.offsetTop
      this.filterTop = this.$refs.filter.offsetTop
      this.$refs.slider.style.height = 'auto'
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
        this.itemHeightPx = this.itemHeightPx == undefined ? this.$refs.slider.clientHeight : this.itemHeightPx
        this.scrollY = pos.y
      },
      goBack() {
        this.$router.back()
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.voiceData,
          index
        })
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    computed: {
      ...mapGetters(['character'])
    },
    watch: {
      character() {
        this.getData()
      },
      scrollY(newY) {
        let filter = this.$refs.filter
        let scroll = this.$refs.scroll
        let message = this.$refs.message
        let reservedHeight = this.filterTop + newY
        if (newY > 0) {
          this.itemHeight = this.itemHeightPx + newY + 'px'
          this.itemScale = 1 + newY / this.itemHeightPx
        }
        if (newY === 0) {
          this.itemHeight = this.itemHeightPx + 'px'
          this.itemScale = 1
        }

        if (reservedHeight < RESERVED_HEIGHT) {
          newY = RESERVED_HEIGHT - this.filterTop
        }
        this.itemHeight = this.itemHeightPx + newY + 'px'
        message.style.marginTop = `${this.messageTop + newY}px`
        filter.style.height = `${-newY}px`
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
  .character-info {
    overflow: hidden;
  }
  .character-skin {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 10rem;
    z-index: 20;
    i {
      position: absolute;
      color: #fff;
      font-size: 2rem;
      margin: 10px;
      z-index: 999;
    }
  }
  .filter {
    background: $color-background;
    width: 100%;
    position: relative;
    height: 0;
    top: 0;
    border: 1px solid $color-background;
  }
  .container {
    background: $color-background;
    width: 100%;
    position: absolute;
    top: 10rem;
    bottom: 0;
  }
  .character-message {
    display: flex;
    margin: 0 5%;
    position: relative;
    background: $color-background-white;
    width: 90%;
    height: 4rem;
    margin-top: -2rem;
    border-radius: 5px;
    z-index: 30;
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
    box-sizing: border-box;
    background: $color-background;
    color: $color-text;
    position: absolute;
    width: 100%;
    top: 3rem;
    bottom: 0;
    z-index: 10;
  }
</style>
