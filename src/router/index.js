import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Recommend from '@/components/pages/Recommend'
import CharacterInfo from '@/components/pages/CharacterInfo'
import CharacterList from '@/components/pages/CharacterList'
import VoiceList from '@/components/pages/VoiceList'
import Upload from '@/components/common/Upload'
import Story from '@/components/pages/Story'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/character',
      name: 'CharacterList',
      component: CharacterList
    },
    {
      path: '/characterInfo/:name',
      name: 'CharacterInfo',
      component: CharacterInfo
    },
    {
      path: '/story',
      name: 'Story',
      component: Story
    },
    {
      path: '/voiceList',
      name: 'VoiceList',
      component: VoiceList
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
