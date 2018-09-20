const Router = require('koa-router')
const router = new Router({
  prefix: '/api'
})
const character = require('./api/character')
const voice = require('./api/voice')

router.use('/character', character.routes())
router.use('/voice', voice.routes())

module.exports = router