const Router = require('koa-router')
const router = new Router()
const { getRandom } = require('./base')
const Image = require('../database/schema/image')

router.post('/getHomeData', async (ctx) => {
  try {
    const flag = ctx.request.body.flag
    const result = await Image.find({position: 'skin'}).exec()
    const indexs = getRandom(0, result.length, 11)
    let recommendData = []
    let hotData = []
    indexs.forEach((index, i) => {
      let item = result[index]
      item.src = item.src || item.srcWeb
      i <= 4 ? recommendData.push(result[index]) : hotData.push(result[index])
    });
    ctx.body = !flag ? {code: 200, message: {recommendData, hotData}} : {code: 200, message: {hotData}}
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router