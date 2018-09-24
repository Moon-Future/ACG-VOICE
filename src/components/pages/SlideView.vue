<template>
  <div class="container">
    <!-- <ul class="example">
      <li v-for="(item, i) in data" :key="i">{{ item }}</li>
    </ul> -->

    <ul class="example"
      infinite-scroll-disabled="true"
      infinite-scroll-distance="10">
      <li v-for="(item, i) in data" :key="i">{{ item }}</li>
    </ul>

    <div class="top">

    </div>
    <div class="content">
      slide view page
    </div>
    <div class="right">
      
    </div>
    <div class="footer">
      
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5', '1', '2', '3', '4', '5', '1', '2', '3', '4', '5', '1', '2', '3', '4', '5', '1', '2', '3', '4', '5', '1', '2', '3', '4', '5']
      }
    }
  }
</script>

<style lang="scss" scoped>
@import 'common/css/variable.scss';

  .container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: $color-background;
    color: $color-text;
    z-index: 150;
  }

  .example {
    li {
      padding: 10px;
      text-align: center;
    }
  }
</style>
