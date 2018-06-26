<template>
  <div class="acg-home">
    <search></search>
    <swiper :list="swiperImgs" auto></swiper>
    <tab bar-active-color="#668599" :line-width="1">
      <tab-item v-for="(voiceType, i) in vocieTypes" :key="i">{{ voiceType }}</tab-item>
    </tab>
    <flexbox :gutter="0" wrap="wrap" class="character-list">
      <flexbox-item class="character-item" :span="character.span" v-for="(character, i) in getCharacters" :key="i">
        <img :src="character.img" alt="">
        <p>
          <i class="iconfont" v-bind:class="[character.playOr ? 'icon-acg-timeout' : 'icon-acg-play-circle']"></i>{{ character.text }}
        </p>
        <!-- <i class="iconfont icon-acg-play-circle-copy"></i> -->
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Search, Swiper, Tab, TabItem, Flexbox, FlexboxItem } from 'vux'
export default {
  name: 'Home',
  data () {
    return {
      vocieTypes: ['萝莉音', '御姐音', '少女音', '正太音', '男神音', '大叔音', '静音', '林正音'],
      swiperImgs: [
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          title: '不祥之刃'
        },
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          title: '九尾妖狐'
        },
        {
          url: 'javascript:',
          // img: '~/server/spider/files/images/LOL/光辉女郎-光辉女郎(skin8).jpg',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
          title: '光辉女郎'
        }
      ],
      swiperImgsIndex: 0,
      characters: [
        {
          img: '../../../static/spider/images/LOL/不祥之刃-卡特琳娜(cover).jpg',
          text: '永远不要质疑我的忠诚，你不会了解我为之忍受的一切'
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: '人心善变'
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: '人心善变，甚于最深奥的魔法。'
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: '人心善变，甚于最深奥的魔法。'
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: '人心善变，甚于最深奥的魔法。'
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: '人心善变，甚于最深奥的魔法。'
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: '人心善变，甚于最深奥的魔法。'
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: '人心善变，甚于最深奥的魔法。'
        }
      ]
    }
  },
  components: {
    Search,
    Swiper,
    Flexbox,
    FlexboxItem,
    Tab,
    TabItem
  },
  methods: {

  },
  computed: {
    getCharacters() {
      let len = this.characters.length
      let rest, newObj
      this.characters.map((obj) => {
        obj.span = 1/3
      })
      if (len === 1) {
        this.characters.map((obj) => {
          obj.span = 12
        })
      } else if (len === 2) {
        this.characters.map((obj) => {
          obj.span = 1/2
        })
      } else {
        rest = len % 3
        if (rest === 1) {
          this.$set(this.characters[len - 1], 'span', 12)
        } else if (rest === 2) {
          this.$set(this.characters[len - 1], 'span', 1/2)
          this.$set(this.characters[len - 2], 'span', 1/2)
        }
      }
      return this.characters
    }
  }
}
</script>

<style lang="scss">
  .character-list {
    margin-top: 10px;
    .character-item {
      padding: 0px 2px;
      box-sizing: border-box;
      position: relative;
    }
    img {
      width: 100%;
    }
    p {
      font-size: 0.1rem;
      padding: 0 3px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      position: absolute;
      bottom: 0.6rem;
      color: #fff;
      i.iconfont {
        position: relative;
        top: 0.125rem;
        cursor: pointer;
      }
    }
  }
</style>
