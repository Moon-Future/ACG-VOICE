<template>
  <div class="recommend">
    <div class="slider-wrapper">
      <slider :data="swiperData">
        <div v-for="(data, i) in swiperData" :key="i">
          <a :href="data.linkUrl">
            <img :src="data.src" alt="">
          </a>
        </div>
      </slider>
    </div>
    <div class="tabs-wrapper">
      <tab>
        <div v-for="(data, i) in tabData" :key="i">
          <div><img :src="data.src" alt=""></div>
          <span>{{ data.text }}</span>
        </div>
      </tab>
    </div>
    <div class="devide-line"></div>
    <div class="hot-wrapper">
      <div class="hot-head">
        <div class="hot-title">
          <i class="iconfont icon-acg-huo"></i> 大家都在听
        </div>
        <div class="hot-refresh" @click="changeHotData">
          <i class="iconfont icon-acg-shuaxin"></i>  换一换
        </div>
      </div>
      <div class="hot-list">
        <div class="hot-voice" v-for="(data, i) in hotData" :key="i">
          <div class="voice-img">
            <router-link to="/characterInfo"><img v-lazy="data.src" alt="pic"></router-link>
          </div>
          <div class="voice-text">
            {{ data.character }}
          </div>
        </div>
      </div>
    </div>
    <div class="devide-line"></div>
    <div class="recommend-wrapper">
      <div class="recommend-head">
        <div class="recommend-title">
          专辑
        </div>
      </div>
      <div class="recommend-content" v-for="(data, i) in recommendData" :key="i">
        <div class="recommend-img">
          <img :src="data.src" alt="">
        </div>
        <div class="recommend-descr">
          <h1>英雄联盟</h1>
          <p>ncvbvbvnifbsjvnfcvbvbvnifbsjvnfskbv哈哈哈ncvbvbvnifbsjvnfskbv哈哈哈</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '../common/Slider'
import Tab from '../common/Tab'
import { tabData, swiperData, hotData, recommendData } from '../../common/js/data.js'
import { setTimeout } from 'timers'
export default {
  name: 'recommend',
  data() {
    return {
      tabData: tabData,
      swiperData: [],
      hotData: [],
      recommendData: [],
      menuNav: ['推荐', '角色', '歌单'],
      navIndex: 0
    }
  },
  components: {
    Slider,
    Tab
  },
  created() {
    this.getSwiperData()
    this.getHotData()
    this.getRecommendData()
  },
  methods: {
    getSwiperData() {
      setTimeout(() => {
        this.swiperData = swiperData
      }, 2000)
    },
    getHotData() {
      // this.$http.get('/api/getHot').then((res) => {
      //   this.hotData = res.data
      // })
      
      setTimeout(() => {
        this.hotData = hotData
      }, 1000)
    },
    getRecommendData() {
      setTimeout(() => {
        this.recommendData = recommendData
      }, 1000)
    },
    changeHotData() {
      // this.$http.get('/api/getHot').then((res) => {
      //   this.hotData = res.data
      // })
    },
  }
}
</script>

<style lang="scss">
  @import 'common/css/variable.scss';
  @import 'common/css/mixin.scss';
  .devide-line {
    @include devide-line(5px);
  }
  .slider-wrapper {
    position: relative;
    width: 100%;
    height: 9.5rem;
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
          margin-bottom: 5px;
        }
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
      }
    }
  }
  .hot-wrapper {
    margin: 10px 0;
    .hot-head {
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      .hot-title {
        i {
          color: #d4237a
        }
      }
    }
    .hot-list {
      display: flex;
      flex-wrap: wrap;
      text-align: left;
      .hot-voice {
        flex: 0 0 50%;
        box-sizing: border-box;
        padding: 5px;
        font-size: 0.75rem;
        .voice-img {
          position: relative;
          img {
            width: 100%;
            height: 4.5rem;
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
  .recommend-wrapper {
    padding: 5px;
    margin-top: 10px;
    display: flex;
    flex-flow: column;
    .recommend-head {
      text-align: left;
    }
    .recommend-content {
      background: $color-background-purple;
      color: $color-text;
      border-radius: 10px;
      margin: 5px 0;
      padding: 10px;
      display: flex;
      .recommend-img {
        img {
          width: 3rem;
          height: 3rem;
        }
      }
      .recommend-descr {
        text-align: left;
        padding: 0 10px;
        font-size: 0.75rem;
        line-height: 1rem;
        h1 {
          font-weight: bold;
          margin-bottom: 3px;
        }
      }
    }
  }
</style>