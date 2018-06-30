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
          <i class="iconfont" v-bind:class="[character.playOr ? 'icon-acg-timeout' : 'icon-acg-play-circle']"  @click="playVoice(character, i)"></i>{{ character.voiceText }}
        </p>
        <!-- <i class="iconfont icon-acg-play-circle-copy"></i> -->
      </flexbox-item>
    </flexbox>
    <audio :src="voiceLink" id="home-palyer"></audio>
  </div>
</template>

<script>
let player = document.getElementById('home-palyer')
import { Search, Swiper, Tab, TabItem, Flexbox, FlexboxItem } from 'vux'
export default {
  name: 'Home',
  data () {
    return {
      voiceLink: '',
      vocieTypes: ['萝莉音', '御姐音', '少女音', '正太音', '男神音', '大叔音', '静音', '林正音'],
      swiperImgs: [
        {
          url: 'javascript:',
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E7%86%94%E5%B2%A9%E5%B7%A8%E5%85%BD-%E5%A2%A8%E8%8F%B2%E7%89%B9%28skin4%29.jpg',
          title: '熔岩巨兽-墨菲特'
        },
        {
          url: 'javascript:',
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E5%9C%A3%E6%9E%AA%E6%B8%B8%E4%BE%A0-%E5%8D%A2%E9%94%A1%E5%AE%89%28skin1%29.jpg',
          title: '圣枪游侠-卢锡安'
        },
        {
          url: 'javascript:',
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E4%BB%99%E7%81%B5%E5%A5%B3%E5%B7%AB-%E7%92%90%E7%92%90%28skin2%29.jpg',
          title: '仙灵女巫-璐璐'
        }
      ],
      swiperImgsIndex: 0,
      characters: [
        {
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E5%86%B0%E6%99%B6%E5%87%A4%E5%87%B0-%E8%89%BE%E5%B0%BC%E7%BB%B4%E4%BA%9A%28cover%29.jpg',
          voiceText: '冰晶凤凰-艾尼维亚'
        },
        {
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E6%9A%97%E5%A4%9C%E7%8C%8E%E6%89%8B-%E8%96%87%E6%81%A9%28cover%29.jpg',
          voiceText: '暗夜猎手-薇恩'
        },
        {
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E6%9A%97%E8%A3%94%E5%89%91%E9%AD%94-%E4%BA%9A%E6%89%98%E5%85%8B%E6%96%AF%28cover%29.jpg',
          name: '暗影剑魔',
          voiceText: '心怀恐惧的死去，或者，手染鲜血的获胜',
          voiceLink: 'http://pb5gh80a0.bkt.clouddn.com/%E5%BF%83%E6%80%80%E6%81%90%E6%83%A7%E7%9A%84%E6%AD%BB%E5%8E%BB%EF%BC%8C%E6%88%96%E8%80%85%EF%BC%8C%E6%89%8B%E6%9F%93%E9%B2%9C%E8%A1%80%E7%9A%84%E8%8E%B7%E8%83%9C.wav'
        },
        {
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E6%9A%97%E5%BD%B1%E4%B9%8B%E6%8B%B3-%E9%98%BF%E5%8D%A1%E4%B8%BD%28cover%29.jpg',
          voiceText: '暗影之拳-阿卡丽'
        },
        {
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E5%8C%97%E5%9C%B0%E4%B9%8B%E6%80%92-%E7%91%9F%E5%BA%84%E5%A6%AE%28cover%29.jpg',
          voiceText: '北地之怒-瑟庄妮'
        },
        {
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E6%9A%97%E9%BB%91%E5%85%83%E9%A6%96-%E8%BE%9B%E5%BE%B7%E6%8B%89%28cover%29.jpg',
          voiceText: '暗黑元首-辛德拉'
        },
        {
          img: 'http://paxr4fk3y.bkt.clouddn.com/%E4%B8%8D%E7%A5%A5%E4%B9%8B%E5%88%83-%E5%8D%A1%E7%89%B9%E7%90%B3%E5%A8%9C%28cover%29.jpg',
          voiceText: '不祥之刃-卡特琳娜'
        },
        {
          img: '../../../server/spider/files/images/LOL/不祥之刃-卡特琳娜(cover).jpg',
          voiceText: '拉克丝'
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
    playVoice(character, index) {
      if (character.voiceLink === '' || character.voiceLink === undefined) {
        return
      }
      if (character.playOr === true) {
        player.pause()
      } else {
        this.voiceLink = character.voiceLink
        player.play()
      }
      character.playOr = !character.playOr
      this.characters.splice(index, 1, character)
    }
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
