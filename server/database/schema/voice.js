const mongoose = require('mongoose')
const Schema = mongoose.Schema
const currentTime = new Date().getTime()

const voiceSchema = new Schema({
  name: String,
  src: String,
  srcWeb: String,
  lyric: String,
  coverimg: String,
  size: String,
  type: { type: String, default: 'wav' },
  createdTime: { type: Number, default: currentTime },
  upadteTime: { type: Number, default: null },
  hot: { type: Number, default: 0 },
  recommend: { type: Number, default: 0 },
  from: { type: String, default: 'ACG' },
  character: { type: Schema.Types.ObjectId, ref: 'character' },
  characterName: String,
  id: { type: String, unique: true }, // name-character-from 唯一
  key: String // name-from
}, {
  collections: 'voice'
})

module.exports = mongoose.model('Voice', voiceSchema, 'voice')