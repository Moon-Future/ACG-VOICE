const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const app = new Koa()
const router = new Router()
app.use(cors())

router.get('/api', async (ctx, next) => {
  ctx.body = 'koa'
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log('listen at port 3000...')
})