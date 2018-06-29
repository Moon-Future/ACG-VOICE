const Router = require('koa-router')
const { getUploadToken, writeToFile } = require('./upload')

const router = new Router({
  prefix: '/api'
})

router.get('/upload/getUploadToken', async (ctx, next) => {
  ctx.body = getUploadToken()
})

router.post('/upload/fileData', async (ctx, next) => {
  writeToFile(ctx)
})

module.exports = router