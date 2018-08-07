<template>
  <div id="app" @touchmove.prevent>
    <transition :enter-active-class="enterAcitve" :leave-active-class="leaveActive">
      <keep-alive>
          <router-view class="router-view"/>
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
    data() {
      return {
        enterAcitve: 'animated slideInRight',
        leaveActive: 'animated slideOutLeft'
      }
    },
    components: {
      BottomFooter,
      Player
    },
    watch: {
      $route(to, from) {
        if (to.name === 'CharacterInfo') {
          this.enterAcitve = 'animated slideInRight'
          this.leaveActive = 'animated slideOutLeft'
        } else {
          this.enterAcitve = 'animated slideInLeft'
          this.leaveActive = 'animated slideOutRight'
        }
      }
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
    .router-view {
      // position: absolute;
      // width: 100%;
      // height: 100%;
    }
  }
</style>
