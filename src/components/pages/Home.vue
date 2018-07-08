<template>
<div class="scroll-container" ref="scrollContainer">
  <scroll :data="recommends" class="scroll">
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
          <div v-for="(tabData, i) in tabsData" :key="i">
            <!-- <div><img :src="tabData.src" alt=""></div> -->
            <span>{{ tabData.text }}</span>
          </div>
          <!-- <ul class="tabs">
            <li v-for="(tabData, i) in tabsData" :key="i">
              <div><img :src="tabData.src" alt=""></div>
              <span>{{ tabData.text }}</span>
            </li>
          </ul> -->
        </tab>
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
</div>
</template>

<script>
import Slider from '../common/Slider'
import Scroll from '../common/Scroll'
import Tab from '../common/Tab'
import { tabsData, swiperData, recommendData } from '../../common/js/data.js'
import { setTimeout } from 'timers'
export default {
  name: 'Home',
  data() {
    return {
      tabsData: tabsData,
      swiperData: [],
      recommends: [],
      menuNav: ['推荐', '列表', '歌单'],
      navIndex: 0
    }
  },
  created() {
    this.getSwiperData()
    this.getRecommend()
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
</style>
