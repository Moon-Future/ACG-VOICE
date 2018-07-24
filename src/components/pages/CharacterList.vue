<template>
  <div class="character-list">
    <ul>
      <li class="group" v-for="(character, i) in characters" :key="i">
        <h1>{{ character.letter }}</h1>
        <ul>
          <router-link class="item" to="/characterInfo" v-for="(item, i) in character.items" :key="i" tag="li">
            <div class="avatar">
              <img v-lazy="avatar" alt="">
            </div>
            <div class="info">
              <p class="name">{{ item.name }} - {{ item.nickName }}</p>
              <p class="from">{{ item.from }}</p>
            </div>
          </router-link>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import apiUrl from '@/serviceAPI.config.js'
import avatar from '@/assets/avatar_template.jpeg'
export default {
  name: 'CharacterList',
  data() {
    return {
      characters: [],
      avatar: avatar
    }
  },
  created() {
    this.getCharaterList()
  },
  methods: {
    getCharaterList() {
      this.$http.get(apiUrl.getCharacterList).then(res => {
        let data = res.data
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
    }
  }
}
</script>

<style lang="scss">
  @import '../../common/css/variable';
  .character-list {
    color: $color-text;
    li.group {
      h1 {
        line-height: 1.5rem;
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
</style>