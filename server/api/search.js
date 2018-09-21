const Router = require('koa-router')
const router = new Router()
const { wyySearch } = require('./searchFromWeb')

router.post('/search', async (ctx) => {
  try {
    const value = encodeURIComponent(ctx.request.body.value)
    if (value == '') {
      return
    }
    const result = await wyySearch.search(value)
    ctx.body = {code: 200, message: result}
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router