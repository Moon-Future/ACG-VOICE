const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const Character = require('../database/schema/character')

router.get('/insertCharacterByJson', async (ctx) => {
  const characterData = JSON.parse(fs.readFileSync(path.join(__dirname, '../jsonData/character.json'), 'utf-8'))
  let saveCount = 0
	let nameObj = {}
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
      key: `${item.name}-${item.from}`
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

module.exports = router