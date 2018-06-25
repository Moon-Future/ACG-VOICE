<template>
  <div class="acg-home">
    <search></search>
    <swiper :list="swiperImgs" auto></swiper>
    <div class="recommend-"></div>

    <flexbox :gutter="0" wrap="wrap" class="character-list">
      <flexbox-item class="character-item" :span="character.span" v-for="(character, i) in getCharacters" :key="i">
        <img :src="character.img" alt="">
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Search, Swiper, Flexbox, FlexboxItem } from 'vux'
export default {
  name: 'Home',
  data () {
    return {
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
          text: ''
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: ''
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: ''
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: ''
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: ''
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: ''
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: ''
        },
        {
          img: '../../../static/spider/images/LOL/九尾妖狐-阿狸(cover).jpg',
          text: ''
        }
      ]
    }
  },
  components: {
    Search,
    Swiper,
    Flexbox,
    FlexboxItem
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
          newObj = JSON.parse(JSON.stringify(this.characters[len - 1]))
          newObj.span = 12;
          this.characters.splice(len - 1, 1, newObj)
        } else if (rest === 2) {
          newObj = JSON.parse(JSON.stringify(this.characters[len - 1]))
          newObj.span = 1/2;
          this.characters.splice(len - 1, 1, newObj)
          newObj = JSON.parse(JSON.stringify(this.characters[len - 2]))
          newObj.span = 1/2;
          this.characters.splice(len - 2, 1, newObj)
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
    }
    img {
      width: 100%;
    }
  }
</style>
