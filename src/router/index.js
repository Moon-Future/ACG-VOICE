import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import HomeSlider from '@/components/pages/HomeSlider'
import CharacterInfo from '@/components/pages/CharacterInfo'
import Upload from '@/components/common/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/slider',
      name: 'HomeSlider',
      component: HomeSlider
    },
    {
      path: '/characterInfo',
      name: 'CharacterInfo',
      component: CharacterInfo
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
