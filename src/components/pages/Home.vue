<template>
<div class="scroll-container" ref="scrollContainer">
  <scroll :data="hotsData" class="scroll">
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
            <div><img :src="tabData.src" alt=""></div>
            <span>{{ tabData.text }}</span>
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
          <div class="hot-voice" v-for="(hot, i) in hotsData" :key="i">
            <div class="voice-img">
              <img v-lazy="hot.src" alt="pic">
            </div>
            <div class="voice-text">
              {{ hot.character }}
            </div>
          </div>
        </div>
      </div>
      <div class="recommend-wrapper">

      </div>
    </div>
  </scroll>
</div>
</template>

<script>
import Slider from '../common/Slider'
import Scroll from '../common/Scroll'
import Tab from '../common/Tab'
import { tabsData, swiperData, hotData } from '../../common/js/data.js'
import { setTimeout } from 'timers'
export default {
  name: 'Home',
  data() {
    return {
      tabsData: tabsData,
      swiperData: [],
      hotsData: [],
      menuNav: ['推荐', '列表', '歌单'],
      navIndex: 0
    }
  },
  created() {
    this.getSwiperData()
    this.getHotData()
    // this.getRecommendData()
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
      //   this.hotsData = res.data
      // })
      
      setTimeout(() => {
        this.hotsData = hotData
      }, 1000)
    },
    changeHotData() {
      // this.$http.get('/api/getHot').then((res) => {
      //   this.hotsData = res.data
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
</style>
