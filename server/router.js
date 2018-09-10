const Router = require('koa-router')
const { getUploadToken, writeToFile } = require('./upload')
const api = require('./api')

const router = new Router({
  prefix: '/api'
})

router.get('/upload/getUploadToken', async (ctx, next) => {
  ctx.body = getUploadToken()
})

router.post('/upload/fileData', async (ctx, next) => {
  writeToFile(ctx)
})

router.get('/getHomeSwiper', async (ctx, next) => {
  let result = await api.getHomeSwiper()
  ctx.body = result
})

router.get('/getHomeHot', async (ctx, next) => {
  let result = await api.getHomeHot()
  ctx.body = result
})

router.get('/getRecommend', async (ctx, next) => {
  let result = await api.getRecommend()
  ctx.body = result
})

router.get('/getCharacterList', async (ctx, next) => {
  let result = await api.getCharacterList()
  ctx.body = result
})

router.get('/getCharacterSkin', async (ctx, next) => {
  let result = await api.getCharacterSkin(ctx.query)
  ctx.body = result
})

router.get('/getCharacterAvatar', async (ctx, next) => {
  let result = await api.getCharacterAvatar(ctx.query)
  ctx.body = result
})

router.get('/getCharacterSkinAndAvatar', async (ctx, next) => {
  let result = await api.getCharacterSkinAndAvatar(ctx.query)
  ctx.body = result
})

router.get('/getCharacterVoice', async (ctx, next) => {
  let result = await api.getCharacterVoice(ctx.query)
  ctx.body = result
})

router.get('/search', async (ctx, next) => {
  let result = await api.search(ctx.query)
  ctx.body = result
})

router.get('/getVoice', async (ctx, next) => {
  let result = await api.getVoice(ctx.query)
  ctx.body = result
})


module.exports = router