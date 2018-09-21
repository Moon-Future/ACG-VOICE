const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const { getRandom } = require('./base')
const Character = require('../database/schema/character')
const Image = require('../database/schema/image')
const Voice = require('../database/schema/voice')

router.get('/insertCharacterByJson', async (ctx) => {
  const characterData = JSON.parse(fs.readFileSync(path.join(__dirname, '../jsonData/character.json'), 'utf-8'))
  let saveCount = 0
  let nameObj = {}
  let currentTime = new Date().getTime()
	for (let i = 0, len = characterData.length; i < len; i++) {
		let item = characterData[i]
		let oneCharacter = new Character({
      name: item.name,
      nickName: item.nickName,
      from: item.from,
      alias: [item.nameEn],
      spell: item.spell,
      avatar: item.avatar,
      avatarWeb: item.avatarOfficial,
      key: `${item.name}-${item.from}`,
      createdTime: currentTime
    })
    console.log('name', item.name)
		if (nameObj[item.name] === undefined) {
			oneCharacter.save().then(() => {
				saveCount++
				console.log('插入成功 ' + saveCount)
			}).catch(err => {
				console.log('插入失败' + err)
			})
		} else {
			nameObj[item.name] = true
		}
  }
  ctx.body = '开始导入 Character 数据'
})

router.get('/getCharacterList', async (ctx) => {
  try {
    const result = await Character.find({}).lean().exec()
    result.forEach(element => {
      element.firstLetter = element.spell.substr(0, 1).toLocaleUpperCase()
      element.avatar = element.avatar || element.avatarWeb
    })
    ctx.body = {code: 200, message: result}
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

router.post('/getCharacterInfo', async (ctx) => {
  try {
    const key = ctx.request.body.key
    const characterData = await Character.find({key}).exec()
    const imageData = await Image.find({key}).exec()
    const voiceData = await Voice.find({key}).exec()
    const length = imageData.length
    characterData.forEach(element => {
      element.avatar = element.avatar || element.avatarWeb
    })
    imageData.forEach(element => {
      element.src = element.src || element.srcWeb
    })
    voiceData.forEach(element => {
      if (!element.coverimg) {
        element.coverimg = imageData[getRandom(0, length)].src
      }
    })
    ctx.body = {code: 200, message: {characterData: characterData[0], imageData, voiceData}}
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router