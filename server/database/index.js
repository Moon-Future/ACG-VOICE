const fs = require('fs')
const path = require('path')
const connect = require('./init') 
const { Image } = require('./schema')
const imagePath = path.join(__dirname, '../imageLink-node-压缩版-1530426812949.json')

;(async () => {
	await connect()
	let imageInfo = JSON.parse(fs.readFileSync(imagePath, 'utf-8'))
	let saveCount = 0
	return
	for (let key in imageInfo) {
		let oneImage = new Image({
			name: imageInfo[key].name,
			src: imageInfo[key].link,
			size: imageInfo[key].fsize,
			type: imageInfo[key].mimeType,
			lastUpd: imageInfo[key].lastUpd,
			bucket: imageInfo[key].bucket
		})
		oneImage.save().then(() => {
			saveCount++
			console.log('插入成功 ' + saveCount)
		}).catch(err => {
			console.log('插入失败' + err)
		})
	}
})()