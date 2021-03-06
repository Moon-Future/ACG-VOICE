<template>
  <div class="character-info">
    <div class="character-skin" ref="slider">
      <i class="iconfont icon-acg-arrow-left- icon-back" @click="goBack()"></i>
      <loading v-if="!imageData.length > 0"></loading>
      <slider :data="imageData"
              :showDot="false"
              :autoPlay="true"
              :itemHeight="itemHeight"
              :itemScale="itemScale">
        <div v-for="(data, i) in imageData" :key="i">
          <img :src="data.src" alt="">
        </div>
      </slider>
    </div>
    <div class="filter" ref="filter"></div>
    <div class="container">
      <div class="character-message" ref="message">
        <div class="character-avatar">
          <img :src="characterData.avatar" alt="头像">
        </div>
        <div class="character-msg">
          <p>{{ characterData.name }} - {{ characterData.nickName }}</p>
          <p>
            <span class="voice-num">Voices <span>20</span></span>
            <span class="like-num">
              <i class="iconfont icon-acg-like"></i> <span>70</span>
            </span>
          </p>
        </div>
        <div class="character-more">
          <i class="iconfont icon-acg-more-vertical" @click="infoMore"></i>
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
    <layer :avatar="characterData.avatar" :target="layerTarget" :show="layerShow" @hideLayer="hideLayer">
      <p slot="title">{{ characterData.name }} - {{ characterData.nickName }}</p>
      <p slot="desc" v-html="desc"></p>
    </layer>
  </div>
</template>

<script>
  import Slider from 'components/common/Slider'
  import Scroll from 'components/common/Scroll'
  import VoiceList from 'components/common/VoiceList'
  import Loading from 'components/common/Loading'
  import Layer from 'components/common/Layer'
  import apiUrl from '@/serviceAPI.config.js'
  import { getRandomInt } from 'common/js/util.js'
  import { mapGetters, mapActions } from 'vuex'

  const RESERVED_HEIGHT = 80

  export default {
    name: 'characterInfo',
    data() {
      return {
        imageData: [],
        characterData: {},
        voiceData: [],
        showRank: true,
        probeType: 3,
        listenScroll: true,
        scrollY: 0,
        itemHeight: '10rem',
        itemScale: 1,
        key: '',
        layerShow: false,
        layerTarget: '',
        desc: '作为阿瓦罗萨部族的战母，寒冰血脉的艾希率领着北方人数最多的部落。她克己、智慧、忠于理想，但并不适应自己作为领袖的角色，艾希与自己血脉中蕴藏的先祖魔法相通，挽起了臻冰打造的长弓。她的族人相信她就是神话中的女英雄阿瓦罗萨的转世，在人们的追随下，艾希希望夺回那些属于部族的古代领土，从而让弗雷尔卓德再次实现统一。作为阿瓦罗萨部族的战母，寒冰血脉的艾希率领着北方人数最多的部落。她克己、智慧、忠于理想，但并不适应自己作为领袖的角色，艾希与自己血脉中蕴藏的先祖魔法相通，挽起了臻冰打造的长弓。她的族人相信她就是神话中的女英雄阿瓦罗萨的转世，在人们的追随下，艾希希望夺回那些属于部族的古代领土，从而让弗雷尔卓德再次实现统一。'
      }
    },
    mounted() {
      this.messageTop = this.$refs.message.offsetTop
      this.filterTop = this.$refs.filter.offsetTop
      this.$refs.slider.style.height = 'auto'
    },
    activated() {
      this.key = this.$route.params.key
    },
    methods: {
      getCharacterInfo() {
        this.$http.post(apiUrl.getCharacterInfo, {key: this.key}).then(res => {
          if (res.data.code === 200) {
            const message = res.data.message
            this.imageData = message.imageData
            this.characterData = message.characterData
            this.voiceData = message.voiceData
          }
        })
      },
      infoMore(e) {
        this.layerTarget = e.target
        this.layerShow = true
      },
      hideLayer(flag) {
        this.layerShow = flag
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
      key() {
        this.getCharacterInfo()
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
      VoiceList,
      Loading,
      Layer
    },
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  @import 'common/css/mixin.scss';

  .devide-line {
    @include devide-line(2px);
  }
  .character-info {
    overflow: hidden;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 130;
  }
  .character-skin {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 10rem;
    z-index: 20;
    i.icon-back {
      position: absolute;
      color: #fff;
      font-size: $font-size-large-x;
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
    background: $color-white;
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
