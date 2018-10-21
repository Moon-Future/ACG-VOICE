const Router = require('koa-router')
const character = require('./api/character')
const image = require('./api/image')
const voice = require('./api/voice')
const home = require('./api/home')
const search = require('./api/search')
const router = new Router({
  prefix: '/api'
})

router.use('/character', character.routes())
router.use('/image', image.routes())
router.use('/voice', voice.routes())
router.use(home.routes())
router.use(search.routes())

module.exports = router