<template>
  <div class="home">
    <div class="slider-wrapper">
      <slider>
        <div v-for="(recommend, i) in recommends" :key="i">
          <a :href="recommend.linkUrl">
            <img :src="recommend.imgSrc" alt="">
          </a>
        </div>
      </slider>
    </div>
    <div class="tabs-wrapper">
      <ul class="tabs">
        <li>
          <div><img src="../../assets/英雄联盟(LOL)全家福.jpg" alt=""></div>
          <span>游戏</span>
        </li>
        <li>
          <div><img src="../../assets/英雄联盟(LOL)全家福.jpg" alt=""></div>
          <span>动漫</span>
        </li>
        <li>
          <div><img src="../../assets/萝莉-1.jpeg" alt=""></div>
          <span>萝莉</span>
        </li>
        <li>
          <div><img src="../../assets/御姐-1.jpeg" alt=""></div>
          <span>御姐</span>
        </li>
        <li>
          <div><img src="../../assets/英雄联盟(LOL)全家福.jpg" alt=""></div>
          <span>正太</span>
        </li>
        <li>
          <div><img src="../../assets/英雄联盟(LOL)全家福.jpg" alt=""></div>
          <span>大叔</span>
        </li>
      </ul>
    </div>
    <div class="recommend-wrapper">
      <div class="recommend-head">
        <div class="recommend-title">
          <i class="iconfont icon-acg-huo"></i> 大家都在听
        </div>
        <div class="recommend-refresh">
          <i class="iconfont icon-acg-shuaxin"></i>  换一换
        </div>
      </div>
      <div class="recommend-list">
        <div class="recommend-voice">
          <div class="voice-img">
            <img src="http://paxr4fk3y.bkt.clouddn.com/英雄联盟/cl8023/LOL-不祥之刃-卡特琳娜(skin3).jpg" alt="pic">
          </div>
          <div class="voice-text">
            我的大刀早已饥渴难
          </div>
        </div>
        <div class="recommend-voice">
          <div class="voice-img">
            <img src="http://paxr4fk3y.bkt.clouddn.com/英雄联盟/cl8023/LOL-不祥之刃-卡特琳娜(skin3).jpg" alt="pic">
          </div>
          <div class="voice-text">
            我的大刀早已饥渴难
          </div>
        </div>
        <div class="recommend-voice">
          <div class="voice-img">
            <img src="http://paxr4fk3y.bkt.clouddn.com/英雄联盟/cl8023/LOL-不祥之刃-卡特琳娜(skin3).jpg" alt="pic">
            <span class="paly-num"><i class="iconfont icon-acg-bofang"></i>33.2万</span>
          </div>
          <div class="voice-text">
            我的大刀早已饥渴难
          </div>
        </div>
        <div class="recommend-voice">
          <div class="voice-img">
            <img src="http://paxr4fk3y.bkt.clouddn.com/英雄联盟/cl8023/LOL-不祥之刃-卡特琳娜(skin3).jpg" alt="pic">
          </div>
          <div class="voice-text">
            我的大刀早已饥渴难
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '../common/Slider'
import Scroll from '../common/Scroll';
export default {
  name: 'Home',
  data() {
    return {
      recommends: [
        {
          imgSrc: 'http://paxr4fk3y.bkt.clouddn.com/英雄联盟/cl8023/LOL-不祥之刃-卡特琳娜(skin3).jpg',
          linkUrl: 'www.baidu.com'
        },
        {
          imgSrc: 'http://paxr4fk3y.bkt.clouddn.com/英雄联盟/cl8023/LOL-无双剑姬-菲奥娜(skin3).jpg',
          linkUrl: 'www.baidu.com'
        },
        {
          imgSrc: 'http://paxr4fk3y.bkt.clouddn.com/英雄联盟/cl8023/LOL-战争之王-潘森(skin3).jpg',
          linkUrl: 'www.baidu.com'
        }
      ]
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/css/variable';

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
