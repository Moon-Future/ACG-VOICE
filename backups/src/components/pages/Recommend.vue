<template>
  <div class="scroll-container">
    <scroll>
      <div class="content">
        <div class="slider-wrapper">
          <slider :data="recommendData">
            <div v-for="(data, i) in recommendData" :key="i" @click="gotoInfo(data)">
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
            <div class="hot-refresh" @click="getHomeData(true)">
              <i class="iconfont icon-acg-shuaxin"></i>  换一换
            </div>
          </div>
          <div class="hot-list">
            <div class="hot-voice" v-for="(data, i) in hotData" :key="i">
              <div class="voice-img" @click="gotoInfo(data)">
                <img v-lazy="data.src" :src="data.src" alt="pic">
              </div>
              <div class="voice-text">
                {{ data.character }}
              </div>
            </div>
          </div>
        </div>
        <div class="devide-line"></div>
        <div class="album-wrapper">
          <div class="album-head">
            <div class="album-title">
              专辑
            </div>
          </div>
          <div class="album-content" v-for="(data, i) in recommendData" :key="i">
            <div class="album-img">
              <img :src="data.src" alt="">
            </div>
            <div class="album-descr">
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
  import Scroll from 'components/common/Scroll'
  import Slider from 'components/common/Slider'
  import Tab from 'components/common/Tab'
  import { tabData } from 'common/js/data.js'
  import apiUrl from '@/serviceAPI.config.js'
  import { mapMutations, mapActions } from 'vuex'
  export default {
    name: 'recommend',
    data() {
      return {
        tabData: tabData,
        hotData: [],
        recommendData: []
      }
    },
    components: {
      Scroll,
      Slider,
      Tab
    },
    created() {
      this.getHomeData()
    },
    methods: {
      getHomeData(flag = false) {
        this.$http.post(apiUrl.getHomeData, {flag}).then(res => {
          if (res.data.code === 200) {
            if (!flag) {
              this.recommendData = res.data.message.recommendData
            }
            this.hotData = res.data.message.hotData
          }
        })
      },
      gotoInfo(character) {
        this.$router.push(`/characterInfo/${character.key}`)
      },
      ...mapActions([
        'selectOne'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  @import 'common/css/mixin.scss';
  .devide-line {
    @include devide-line(5px);
  }
  .scroll-container {
    position: fixed;
    top: 4rem;
    bottom: 2rem;
    width: 100%;
    background: $color-background;
    .content {
      background: $color-white;
      color: #000;
    }
  }
  .slider-wrapper {
    position: relative;
    width: 100%;
    height: 10rem;
    overflow: hidden;
  }
  .tabs-wrapper {
    margin-top: 5px;
    overflow: hidden;
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
            // height: 5rem;
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
  .album-wrapper {
    padding: 5px;
    margin-top: 10px;
    display: flex;
    flex-flow: column;
    .album-head {
      text-align: left;
    }
    .album-content {
      background: $color-background;
      color: $color-text;
      border-radius: 10px;
      margin: 5px 0;
      padding: 10px;
      display: flex;
      .album-img {
        img {
          width: 3rem;
          height: 3rem;
        }
      }
      .album-descr {
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