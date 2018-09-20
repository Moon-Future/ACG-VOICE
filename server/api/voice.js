const Router = require('koa-router')
const router = new Router()
// const Voice = require('../database/schema/voice')
const Character = require('../database/schema/character')

router.post('/getVoiceByKey', async (ctx) => {
  try {
    const params = ctx.request.body
    const key = params.key || '亚托克斯-英雄联盟(LOL)'
    const result = Character.find({key}).exec()
    ctx.body = {code: 200, message: result}
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})
