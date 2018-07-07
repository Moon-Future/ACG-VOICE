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

router.get('/getRecommend', async (ctx, next) => {
  let result = await api.getRecommend()
  ctx.body = result
})

module.exports = router