<template>
  <div class="list-container">
    <ul class="voice-list">
      <li v-for="(item, i) in data" :key="i">
        <div class="list-num" v-if="showRank">{{ i + 1 }}</div>
        <div class="list-text">
          {{ item.text }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'VoiceList',
    props: {
      data: {
        type: Array,
        default: null
      },
      showRank: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .voice-list {
    li {
      display: flex;
      padding: 10px;
      .list-num {
        margin: 0 10px;
        display: flex;
        justify-content: center;
        flex-flow: column;
      }
      .list-text {
        line-height: 1rem;
      }
    }
  }
</style>
