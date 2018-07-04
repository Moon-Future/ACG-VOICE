<template>
  <div class="swiper">
    <div class="image-froup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot"></span>  
    </div>
  </div>  
</template>

<script>
import BScroll from 'better-scroll' 

export default {
  name: 'swiper'
}
</script>

<style lang="scss" scoped>

</style>
