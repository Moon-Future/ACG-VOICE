<template>
  <div class="character-list">
    <ul>
      <!-- <li v-for="(character, i) in characters" :key="i">
        <div class="avatar">
          <img v-lazy="avatar" alt="">
        </div>
        <div class="info">
          <p class="name">{{ character.name }} - {{ character.nickName }}</p>
          <p class="from">{{ character.from }}</p>
        </div>
      </li> -->
      <router-link to="/characterInfo" v-for="(character, i) in characters" :key="i" tag="li">
        <div class="avatar">
          <img v-lazy="avatar" alt="">
        </div>
        <div class="info">
          <p class="name">{{ character.name }} - {{ character.nickName }}</p>
          <p class="from">{{ character.from }}</p>
        </div>
      </router-link>
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
        data.sort((a, b) => {
          return a.firstLetter.charCodeAt(0) - b.firstLetter.charCodeAt(0)
        })
        this.characters = data;
      })
    }
  }
}
</script>

<style lang="scss">
  .character-list {
    li {
      display: flex;
      padding: 3px;
      border: 1px solid #fbfbfb;
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
        border-radius: 50%;
      }
    }
  }
</style>