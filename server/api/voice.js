const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const Voice = require('../database/schema/voice')
const { getRandom } = require('./base')
const { wyySearch } = require('./searchFromWeb')

router.get('/insertVoiceByJson', async (ctx) => {
  const voiceList = JSON.parse(fs.readFileSync(path.join(__dirname, '../jsonData/voice.json'), 'utf-8'))
	const voiceListLen = voiceList.length
	const characterList = JSON.parse(fs.readFileSync(path.join(__dirname, '../jsonData/character.json'), 'utf-8'))
  let saveCount = 0
  let currentTime = new Date().getTime()
	for (let i = 0, len = characterList.length; i < len; i++) {
		let item = characterList[i]
		let indexs = getRandom(0, voiceListLen - 1, 13)
		indexs.forEach(index => {
			let voice = voiceList[index]
			if (voice.src) {
				let oneVoice = new Voice({
          name: voice.name,
          src: voice.src,
          srcWeb: voice.src,
          createdTime: currentTime,
          from: item.from,
          characterName: item.name,
          id: `${voice.name}-${item.name}-${item.from}`,
          key: `${item.name}-${item.from}` // name-from
				})
				oneVoice.save().then(() => {
					saveCount++
					console.log('插入成功 ' + saveCount)
				}).catch(err => {
					console.log('插入失败' + err)
				})
			}
		})
	}
  ctx.body = '开始导入 voice 数据'
})

router.post('/getVoiceByKey', async (ctx) => {
  try {
    const params = ctx.request.body
    const platform = params.platform
    let result
    if (platform === 'wyy') {
      result = await wyySearch.getSongById(params)
    }
    ctx.body = {code: 200, message: result}
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

router.post('/getLyric', async (ctx) => {
  try {
    const params = ctx.request.body
    const platform = params.platform
    let result
    if (platform === 'wyy') {
      result = await wyySearch.getLyric(params)
    }
    if (result === '') {
      ctx.body = {code: 500, message: '没有找到歌词'}
    } else {
      ctx.body = {code: 200, message: result}
    }
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router
