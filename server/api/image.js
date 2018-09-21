const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const Image = require('../database/schema/image')

router.get('/insertImageByJson', async (ctx) => {
  const imageData = JSON.parse(fs.readFileSync(path.join(__dirname, '../jsonData/image.json'), 'utf-8'))
  let saveCount = 0
  let currentTime = new Date().getTime()
	for (let i = 0, len = imageData.length; i < len; i++) {
		let item = imageData[i]
		let oneImage = new Image({
      name: item.name,
      src: item.src,
      srcWeb: item.skinOfficial,
      size: item.size,
      type: item.type,
      createdTime: currentTime,
      position: item.position,
      from: item.from,
      characterName: item.character,
      id: `${item.name}-${item.character}-${item.from}`,
      key: `${item.character}-${item.from}`
    })
		oneImage.save().then(() => {
      saveCount++
      console.log('插入成功 ' + saveCount)
    }).catch(err => {
      console.log('插入失败' + err)
    })
  }
  ctx.body = '开始导入 image 数据'
})

module.exports = router