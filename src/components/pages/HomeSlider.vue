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
    
  </div>
</template>

<script>
import Slider from '../common/slider'
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
</style>
