<template>
  <div class="story-container">
    <h1>英雄故事</h1>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  
  .story-container {
    position: fixed;
    top: 2rem;
    bottom: 2rem;
    left: 0;
    right: 0;
    z-index: 100;
    background: $color-white;
  }
</style>
