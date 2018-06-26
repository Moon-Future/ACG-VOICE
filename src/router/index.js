import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import CharacterInfo from '@/components/pages/CharacterInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/characterInfo',
      name: 'CharacterInfo',
      component: CharacterInfo
    }
  ]
})
