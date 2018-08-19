const fs = require('fs')
const path = require('path')
const connect = require('./init') 
const { Character, Image, Voice } = require('./schema')
const filePath = path.join(__dirname, '../../tool/spider/File')
const curTime = new Date().getTime()

function getRandomInt(min, max, n = 1) {
	let result = []
	for (let i = 0; i < n; i++) {
		let randomInt = Math.floor(Math.random() * (max - min + 1) + min);
		while(result.indexOf(randomInt) !== -1) {
			randomInt = Math.floor(Math.random() * (max - min + 1) + min)
		}
		result.push(randomInt)
	}
  return result
}

async function importLOLSkin() {
	await connect()
	let content = JSON.parse(fs.readFileSync(path.join(filePath, 'LOL/Data/skin.json')))
	let saveCount = 0
	for (let i = 0, len = content.length; i < len; i++) {
		let item = content[i]
		let comeFrom = item.from || '#'
		let oneImage = new Image({
			key: `${item.character}-${comeFrom}`,
			character: item.character,
			name: item.name,
			src: item.src || '#',
			size: item.size || '#',
			type: item.type || '#',
			lastUpd: item.lastUpd || curTime,
			bucket: item.bucket || 'acg-Image',
			position: item.position || '#',
			from: comeFrom,
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
		let comeFrom = item.from || '#'
		let name = item.name
		let oneCharacter = new Character({
			key: `${name}-${comeFrom}`,
			name: name,
			alias: item.nameEn,
			spell: item.spell,
			nickName: item.nickName,
			from: comeFrom,
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

async function importLOLVoice() {
	await connect()
	// const songList = JSON.parse(fs.readFileSync(path.join(__dirname, './songlist.json'), 'utf-8'))
	const songList = JSON.parse(fs.readFileSync(path.join(__dirname, './song.json'), 'utf-8'))
	const songListLen = songList.length
	const characterList = JSON.parse(fs.readFileSync(path.join(filePath, 'LOL/Data/avatar.json')))
	let saveCount = 0
	console.log('songList', songList)
	for (let i = 0, len = characterList.length; i < len; i++) {
		let item = characterList[i]
		let comeFrom = item.from || '#'
		let indexs = getRandomInt(0, songListLen - 1, 11)
		indexs.forEach(index => {
			let song = songList[index]
			if (song.src) {
				let oneVoice = new Voice({
					key: `${item.name}-${comeFrom}`,
					character: item.name,
					name: song.name,
					src: song.src || '#',
					srcOfficial: song.src || '#',
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
}

// importLOLSkin()
// importLOLHead()

const funcMap = {
	importLOLHead,
	importLOLSkin,
	importLOLVoice
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