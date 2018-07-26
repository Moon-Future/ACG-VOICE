const fs = require('fs')
const path = require('path')
const connect = require('./init') 
const { Character, Image } = require('./schema')
const filePath = path.join(__dirname, '../../tool/spider/File')
const curTime = new Date().getTime()


async function importLOLSkin() {
	await connect()
	let content = JSON.parse(fs.readFileSync(path.join(filePath, 'LOL/Data/skin.json')))
	let saveCount = 0
	for (let i = 0, len = content.length; i < len; i++) {
		let item = content[i]
		let from = item.from || '#'
		let oneImage = new Image({
			character: item.character,
			name: item.name,
			src: item.src || '#',
			size: item.size || '#',
			type: item.type || '#',
			lastUpd: item.lastUpd || curTime,
			bucket: item.bucket || 'acg-Image',
			position: item.position || '#',
			from: from,
			srcOfficial: item.skinOfficial || '#',
			findKey: `${item.character}-${from}`
		})
		oneImage.save().then(() => {
			saveCount++
			console.log('插入成功 ' + saveCount)
		}).catch(err => {
			console.log('插入失败' + err)
		})
	}
}

// importLOLSkin()


// ;(async () => {
// 	// return;
// 	await connect()
// 	let imageInfo = JSON.parse(fs.readFileSync(imagePath, 'utf-8'))
// 	let saveCount = 0
// 	let nameObj = {}
// 	for (let key in imageInfo) {
// 		let fileName = imageInfo[key].name
// 		let spell = imageInfo[key].firstLetter
// 		let name = fileName.match(/-(.*)\(/)[1].split('-')[1]
// 		let nameEn = imageInfo[key].nameEn
// 		let imgSrcOfficial = imageInfo[key].imgSrcOfficial
// 		let nickName = fileName.match(/-(.*)\(/)[1].split('-')[0]
// 		let position = fileName.match(/[(](.*)[)]/)[1].replace(/\d+/, '')
		
// 		if (nameObj[name] === undefined && position === 'head') {
// 			let oneCharacter = new Character({
// 				name: name,
// 				nameEn,
// 				spell,
// 				nickName,
// 				from: '英雄联盟(LOL)',
// 				avatar: imageInfo[key].link,
// 				avatarOfficial: imgSrcOfficial
// 			})
// 			nameObj[name] = true
// 			oneCharacter.save();
// 		}
// 	}
// })()