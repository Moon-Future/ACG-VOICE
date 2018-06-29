const Router = require('koa-router')
const { getUploadToken } = require('./upload')

const router = new Router({
  prefix: '/api'
})

router.get('/upload/image', async (ctx, next) => {
  ctx.body = 'koa2'
})

module.exports = router