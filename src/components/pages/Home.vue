<template>
  <div class="scroll-container" ref="scrollContainer">
    <scroll :data="hotData" class="scroll">
      <div class="home">
        <div class="nav-warpper">
          <ul>
            <li v-for="(nav, i) in menuNav" :key="i" :class="{active : i === navIndex}" @click="changeNav(i)">
              {{ nav }}
            </li>
          </ul>
        </div>
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
                <img v-lazy="data.src" alt="pic">
              </div>
              <div class="voice-text">
                {{ data.character }}
              </div>
            </div>
          </div>
        </div>
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
    </scroll>
  </div>
</template>

<script>
import Slider from '../common/Slider'
import Scroll from '../common/Scroll'
import Tab from '../common/Tab'
import { tabData, swiperData, hotData, recommendData } from '../../common/js/data.js'
import { setTimeout } from 'timers'
export default {
  name: 'Home',
  data() {
    return {
      tabData: tabData,
      swiperData: [],
      hotData: [],
      recommendData: [],
      menuNav: ['推荐', '列表', '歌单'],
      navIndex: 0
    }
  },
  created() {
    this.getSwiperData()
    this.getHotData()
    this.getRecommendData()
  },
  mounted() {
    this.setScollHeight()
  },
  methods: {
    setScollHeight() {
      let scrollContainer = this.$refs.scrollContainer
      let clientHeight = scrollContainer.clientHeight
      scrollContainer.style.height = clientHeight - 42 + 'px'
    },
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
    changeNav(index) {
      this.navIndex = index
    }
  },
  components: {
    Slider,
    Scroll,
    Tab
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/css/variable';
  .scroll-container {
    height: 100%;
    overflow: hidden;
    padding: 0 10px;
    .scroll {
      height: 100%;
    }
  }
  .nav-warpper {
    padding: 5px 0;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        padding: 2px 5px;
        &.active {
          border-bottom: 1px solid red;
        }
      }
    }
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
    margin-top: 10px;
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
      background: #f8f6f5;
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
