const fs = require('fs')
const path = require('path')
const connect = require('./init') 
const { Character, Image } = require('./schema')
const imagePath = path.join(__dirname, '../imageLink-node-压缩版-1530426812949.json')

;(async () => {
	// return;
	await connect()
	let imageInfo = JSON.parse(fs.readFileSync(imagePath, 'utf-8'))
	let saveCount = 0
	let nameObj = {}
	for (let key in imageInfo) {
		let fileName = imageInfo[key].name
		let spell = imageInfo[key].firstLetter
		let character = fileName.match(/-(.*)\(/)[1].split('-')[1]
		let nickName = fileName.match(/-(.*)\(/)[1].split('-')[0]
		let position = fileName.match(/[(](.*)[)]/)[1].replace(/\d+/, '')
		// let oneImage = new Image({
		// 	character: character,
		// 	name: imageInfo[key].name,
		// 	src: imageInfo[key].link,
		// 	size: imageInfo[key].fsize,
		// 	type: imageInfo[key].mimeType,
		// 	lastUpd: imageInfo[key].lastUpd,
		// 	bucket: imageInfo[key].bucket,
		// 	position
		// })
		// oneImage.save().then(() => {
		// 	saveCount++
		// 	console.log('插入成功 ' + saveCount)
		// }).catch(err => {
		// 	console.log('插入失败' + err)
		// })

		if (nameObj[character] === undefined && position === 'head') {
			let oneCharacter = new Character({
				name: character,
				spell,
				nickName,
				from: '英雄联盟(LOL)',
				avatar: imageInfo[key].link
			})
			nameObj[character] = true
			oneCharacter.save();
		}
	}
})()