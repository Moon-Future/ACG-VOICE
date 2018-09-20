const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const router = require('./router')

app.use(bodyParser())
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log('listen at port 3000...')
})