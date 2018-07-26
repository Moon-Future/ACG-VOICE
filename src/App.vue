<template>
  <div id="app" @touchmove.prevent>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import BottomFooter from 'components/common/BottomFooter'
export default {
  name: 'App',
  components: {
    BottomFooter
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
