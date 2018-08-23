<template>
  <div class="scroll-container animated slideInRight">
    <scroll ref="characterList" 
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scroll="scroll">
      <div class="list-container">
        <ul class="character-list">
          <li class="group" v-for="(character, i) in characters" :key="i" ref="listGroup">
            <h2>{{ character.letter }}</h2>
            <ul>
              <li class="item" v-for="(item, i) in character.items" :key="i" @click="gotoInfo(item)">
                <div class="avatar">
                  <img v-lazy="item.avatar" alt="">
                </div>
                <div class="info">
                  <p class="name">{{ item.name }} - {{ item.nickName }}</p>
                  <p class="from">{{ item.from }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroll>
    <div class="shortcut-list" @touchstart="onShortcutTocuhStart" @touchmove.stop.prevent="onShortcutTocuhMove">
      <ul>
        <li v-for="(shortcut, i) in shortcutList" 
            :key="i"
            :data-index="i"
            :class="{'active': currentIndex === i}">
          {{ shortcut }}
        </li>
      </ul>
    </div>
    <div class="fixed-title" v-show="fixedTitle" ref="fixedTitle">
      <h1>{{ fixedTitle }}</h1>
    </div>
  </div>
</template>

<script>
  import Scroll from 'components/common/Scroll'
  import { getData } from 'common/js/dom.js'
  import apiUrl from '@/serviceAPI.config.js'
  import avatar from '@/assets/avatar_template.jpeg'
  import { mapMutations } from 'vuex'

  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 28

  export default {
    name: 'CharacterList',
    components: {
      Scroll
    },
    data() {
      return {
        characters: [],
        characterLength: 0,
        avatar: 'http://ossweb-img.qq.com/images/lol/img/champion/Ezreal.png',
        scrollY: -1,
        currentIndex: 0,
        probeType: 3,
        diff: -1
      }
    },
    created() {
      this.getCharaterList()
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
    },
    computed: {
      shortcutList() {
        return this.characters.map(ele => {
            return ele.letter
          })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.characters[this.currentIndex] ? this.characters[this.currentIndex].letter : ''
      }
    },
    methods: {
      getCharaterList() {
        this.$http.get(apiUrl.getCharacterList).then(res => {
          let data = res.data
          this.characterLength = data.length
          let group = {}
          data.sort((a, b) => {
            return a.firstLetter.charCodeAt(0) - b.firstLetter.charCodeAt(0)
          })
          for (let i = 0, len = data.length; i < len; i++) {
            let letter = data[i].firstLetter
            if (group[letter] === undefined) {
              group[letter] = {
                letter: letter,
                items: []
              }
            }
            group[letter].items.push(data[i])
          }
          for (let key in group) {
            this.characters.push(group[key])
          }
          this.characters.sort((a, b) => {
            return a.letter.charCodeAt(0) - b.letter.charCodeAt(0)
          })
        })
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      onShortcutTocuhStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortcutTocuhMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      gotoInfo(character) {
        this.$router.push(`/characterInfo/${character.key}`)
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0, len = list.length; i < len; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight - 2) {
          index = this.listHeight - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.characterList.scrollToElement(this.$refs.listGroup[index])
      }
    },
    watch: {
      characters() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        for (let i = 0, len = listHeight.length; i < len - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixedTitle.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      }
    }
  }
</script>

<style lang="scss">
  @import 'common/css/variable.scss';
  .scroll-container {
    position: fixed;
    top: 4rem;
    bottom: 2rem;
    width: 100%;
    background: $color-background;
    color: $color-text;
  }
  .character-list {
    li.group {
      h2 {
        line-height: 28px;
        background: $color-background-b;
        padding-left: 1rem;
      }
    }
    li.item {
      display: flex;
      padding: 3px;
      border: 1px solid #3e3e3e;
      .avatar {
        display: flex;
        padding: 0 1rem;
      }
      .info {
        display: flex;
        flex-flow: column;
        justify-content: center;
        width: 70%;
        p {
          padding: 3px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      img {
        width: 3rem;
        height: 3rem;
        // border-radius: 50%;
      }
    }
  }
  .shortcut-list {
    position: fixed;
    top: 55%;
    transform: translateY(-50%);
    right: 0;
    text-align: center;
    background: #000;
    font-size: 14px;
    li {
      padding: 2px;
      &.active {
        color: $color-active;
        font-weight: bold;
      }
    }
  }
  .fixed-title {
    position: fixed;
    top: 0;
    width: 100%;
    line-height: 28px;
    background: $color-background-b;
    padding-left: 1rem;
  }
</style>