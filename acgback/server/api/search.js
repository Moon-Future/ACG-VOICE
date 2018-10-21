const Router = require('koa-router')
const router = new Router()
const { ajax } = require('./base')
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

router.post('/searchSuggest', async (ctx) => {
  try {
    const value = encodeURIComponent(ctx.request.body.value)
    const url = `http://sug.qianqian.com/info/suggestion?format=json&word=${value}&version=2&from=0&third_type=0&client_type=0`
    const suggest = await ajax(url)
    if (suggest && suggest.code === 500) {
      ctx.body = {code: 500, message: '服务器傲娇啦...'}
      return
    }
    let result = [];
    if (suggest.error_message === 'failed') {
      ctx.body = {code: 200, message: result}
      return
    }
    suggest.data.artist.forEach(element => {
      result.push(element.artistname)
    });
    suggest.data.song.forEach(element => {
      result.push(element.songname)
    });
    ctx.body = {code: 200, message: result}
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router