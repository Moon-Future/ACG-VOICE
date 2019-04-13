const mongoose = require('mongoose')
const Schema = mongoose.Schema
const currentTime = new Date().getTime()

const imageSchema = new Schema({
  name: { type: String, unique: true },
  src: String,
  srcWeb: String,
  size: String,
  type: { type: String, default: 'image/jpeg' },
  createdTime: { type: Number, default: currentTime },
  upadteTime: { type: Number, default: null },
  hot: { type: Number, default: 0 },
  recommend: { type: Number, default: 0 },
  position: { type: String, default: '' }, // head, cover, skin,
  from: { type: String, default: 'ACG' },
  character: { type: Schema.Types.ObjectId, ref: 'character' },
  characterName: String,
  id: { type: String, unique: true }, // name-character-from 唯一
  key: String // name-from
}, {
  collections: 'image'
})

module.exports = mongoose.model('Image', imageSchema, 'image')