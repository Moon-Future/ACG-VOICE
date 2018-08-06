<template>
  <div id="app" @touchmove.prevent>
    <transition name="customer" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
      <keep-alive>
          <router-view/>
      </keep-alive>
    </transition>
    <bottom-footer></bottom-footer>
    <player></player>
  </div>
</template>

<script>
  import BottomFooter from 'components/common/BottomFooter'
  import Player from 'components/common/Player'
  export default {
    name: 'App',
    components: {
      BottomFooter,
      Player
    }
  }
</script>

<style lang="scss">
  @import 'common/css/reset.scss';
  @import 'common/css/variable.scss';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    // color: #2c3e50;
    font-size: 0.875rem;
  }
</style>
