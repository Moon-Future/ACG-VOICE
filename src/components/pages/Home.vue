<template>
<scroll :data="recommends" class="scroll">
  <div class="home">
    <div class="slider-wrapper">
      <slider :data="swiperData">
        <div v-for="(data, i) in swiperData" :key="i">
          <a :href="data.linkUrl">
            <img :src="data.src" @load="loadImage" alt="">
          </a>
        </div>
      </slider>
    </div>
    <div class="tabs-wrapper">
      <ul class="tabs">
        <li v-for="(tabData, i) in tabsData" :key="i">
          <div><img :src="tabData.src" alt=""></div>
          <span>{{ tabData.text }}</span>
        </li>
      </ul>
    </div>
    <div class="recommend-wrapper">
      <div class="recommend-head">
        <div class="recommend-title">
          <i class="iconfont icon-acg-huo"></i> 大家都在听
        </div>
        <div class="recommend-refresh" @click="changeRecommendData">
          <i class="iconfont icon-acg-shuaxin"></i>  换一换
        </div>
      </div>
      <div class="recommend-list">
        <div class="recommend-voice" v-for="(recommend, i) in recommends" :key="i">
          <div class="voice-img">
            <img v-lazy="recommend.src" alt="pic">
          </div>
          <div class="voice-text">
            {{ recommend.character }}
          </div>
        </div>
      </div>
    </div>

    <div class="recommend-wrapper">
      <div class="recommend-head">
        <div class="recommend-title">
          <i class="iconfont icon-acg-huo"></i> 大家都在听
        </div>
        <div class="recommend-refresh" @click="changeRecommendData">
          <i class="iconfont icon-acg-shuaxin"></i>  换一换
        </div>
      </div>
      <div class="recommend-list">
        <div class="recommend-voice" v-for="(recommend, i) in recommends" :key="i">
          <div class="voice-img">
            <img v-lazy="recommend.src" alt="pic">
          </div>
          <div class="voice-text">
            {{ recommend.character }}
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-wrapper">
      <div class="recommend-head">
        <div class="recommend-title">
          <i class="iconfont icon-acg-huo"></i> 大家都在听
        </div>
        <div class="recommend-refresh" @click="changeRecommendData">
          <i class="iconfont icon-acg-shuaxin"></i>  换一换
        </div>
      </div>
      <div class="recommend-list">
        <div class="recommend-voice" v-for="(recommend, i) in recommends" :key="i">
          <div class="voice-img">
            <img v-lazy="recommend.src" alt="pic">
          </div>
          <div class="voice-text">
            {{ recommend.character }}
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-wrapper">
      <div class="recommend-head">
        <div class="recommend-title">
          <i class="iconfont icon-acg-huo"></i> 大家都在听
        </div>
        <div class="recommend-refresh" @click="changeRecommendData">
          <i class="iconfont icon-acg-shuaxin"></i>  换一换
        </div>
      </div>
      <div class="recommend-list">
        <div class="recommend-voice" v-for="(recommend, i) in recommends" :key="i">
          <div class="voice-img">
            <img v-lazy="recommend.src" alt="pic">
          </div>
          <div class="voice-text">
            {{ recommend.character }}
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-wrapper">
      <div class="recommend-head">
        <div class="recommend-title">
          <i class="iconfont icon-acg-huo"></i> 大家都在听
        </div>
        <div class="recommend-refresh" @click="changeRecommendData">
          <i class="iconfont icon-acg-shuaxin"></i>  换一换
        </div>
      </div>
      <div class="recommend-list">
        <div class="recommend-voice" v-for="(recommend, i) in recommends" :key="i">
          <div class="voice-img">
            <img v-lazy="recommend.src" alt="pic">
          </div>
          <div class="voice-text">
            {{ recommend.character }}
          </div>
        </div>
      </div>
    </div>

  </div>
</scroll>
</template>

<script>
import Slider from '../common/Slider'
import Scroll from '../common/Scroll';
import { tabsData, swiperData, recommendData } from '../../common/js/data.js'
import { setTimeout } from 'timers';
export default {
  name: 'Home',
  data() {
    return {
      tabsData: tabsData,
      swiperData: [],
      recommends: []
    }
  },
  created() {
    this.getSwiperData()
    this.getRecommend()
  },
  methods: {
    getSwiperData() {
      setTimeout(() => {
        this.swiperData = swiperData
      }, 2000)
    },
    getRecommend() {
      // this.$http.get('/api/getRecommend').then((res) => {
      //   this.recommends = res.data
      // })
      
      setTimeout(() => {
        this.recommends = recommendData
      }, 1000)
    },
    changeRecommendData() {
      // this.$http.get('/api/getRecommend').then((res) => {
      //   this.recommends = res.data
      // })
    },
    loadImage() {
      // if (!this.checkLoaded) {
      //   this.$refs.scroll.initScroll()
      // }
      // this.checkLoaded = true
    }
  },
  components: {
    Slider,
    Scroll
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/css/variable';
  .scroll {
    height: 100%;
    overflow: hidden;
  }
  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .tabs-wrapper {
    margin-top: 5px;
    overflow: hidden;
    .tabs {
      list-style: none;
      display: flex;
      li {
        width: 25%;
        display: flex;
        flex-flow: column;
        flex: 0 0 25%;
        div {
          height: 2rem;
        }
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
      }
    }
  }
  .recommend-wrapper {
    margin-top: 10px;
    .recommend-head {
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      .recommend-title {
        i {
          color: #d4237a
        }
      }
    }
    .recommend-list {
      display: flex;
      flex-wrap: wrap;
      text-align: left;
      .recommend-voice {
        flex: 0 0 50%;
        box-sizing: border-box;
        padding: 5px;
        font-size: 0.75rem;
        .voice-img {
          position: relative;
          img {
            width: 100%;
            border-radius: 5px;
          }
          span {
            position: absolute;
            bottom: 5px;
            color: #fff;
            right: 10px;
            i {
              font-size: 0.75rem;
            }
          }
        }
        
      }
    }
  }
</style>
