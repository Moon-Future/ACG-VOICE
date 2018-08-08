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
			key: `${item.character}-${from}`,
			character: item.character,
			name: item.name,
			src: item.src || '#',
			size: item.size || '#',
			type: item.type || '#',
			lastUpd: item.lastUpd || curTime,
			bucket: item.bucket || 'acg-Image',
			position: item.position || '#',
			from: from,
			srcOfficial: item.skinOfficial || '#'
		})
		oneImage.save().then(() => {
			saveCount++
			console.log('插入成功 ' + saveCount)
		}).catch(err => {
			console.log('插入失败' + err)
		})
	}
}

async function importLOLHead() {
	await connect()
	let content = JSON.parse(fs.readFileSync(path.join(filePath, 'LOL/Data/avatar.json')))
	let saveCount = 0
	let nameObj = {}
	for (let i = 0, len = content.length; i < len; i++) {
		let item = content[i]
		let from = item.from || '#'
		let name = item.name
		let oneCharacter = new Character({
			key: `${name}-${from}`,
			name: name,
			nameEn: item.nameEn,
			spell: item.spell,
			nickName: item.nickName,
			from: from,
			avatar: item.avatar,
			avatarOfficial: item.avatarOfficial
		})
		if (nameObj[name] === undefined) {
			oneCharacter.save().then(() => {
				saveCount++
				console.log('插入成功 ' + saveCount)
			}).catch(err => {
				console.log('插入失败' + err)
			})
		} else {
			nameObj[name] = true
		}
	}
}

// importLOLSkin()
// importLOLHead()

const funcMap = {
	importLOLHead,
	importLOLSkin
}

let argv = process.argv
argv.splice(0, 2)
if (argv.length === 0) {
	return;
}

try {
	funcMap[argv[0]]();
} catch(e) {
	throw new Error(e)
}