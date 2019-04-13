const mongoose = require('mongoose')
const Schema = mongoose.Schema
const curTime = new Date().getTime()

const characterSchema = new Schema({
  name: { type: String, unique: true },
  alias: { type: String, default: '#' },
  spell: {type: String, default: '#' },
  nickName: { type: String },
  from: { type: String },
  sex: { type: Number, default: 1 }, // 男 1, 女 0
  age: { type: Number, default: 18 },
  avatar: { type: String, default: '#' },
  avatarOfficial: { type: String, default: '#' },
  key: { type: String, default: '#' },
})

const imgaeSchema = new Schema({
  character: { type: String },
  name: { type: String, unique: true },
  src: { type: String },
  size: { type: String, default: '#' },
  type: { type: String, default: 'image/jpeg' },
  lastUpd: { type: Number, default: curTime },
  bucket: { type: String, default: 'acg-Image' },
  recommend: { type: Number, default: 0 },
  hot: { type: Number, default: 0 },
  position: { type: String, default: '' }, // head, cover, skin,
  from: { type: String, default: '英雄联盟(LOL)' },
  key: { type: String, default: '#' },
  srcOfficial: { type: String, default: '#' }
})

const voiceSchema = new Schema({
  character: { type: String },
  name: { type: String },
  src: { type: String },
  srcOfficial: { type: String, default: '#' },
  lyric: { type: String, default: '#' },
  size: { type: String, default: '#' },
  type: { type: String, default: 'wav' },
  lastUpd: { type: Number, default: curTime },
  recommend: { type: Number, default: 0 },
  hot: { type: Number, default: 0 },
  from: { type: String, default: '英雄联盟(LOL)' },
  key: { type: String, default: '#' }
})

module.exports = {
  Character: mongoose.model('Character', characterSchema, 'character'),
  Image: mongoose.model('Image', imgaeSchema, 'image'),
  Voice: mongoose.model('Voice', voiceSchema, 'voice')
}
