const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voiceSchema = new Schema({
  name: String,
  src: String,
  srcWeb: String,
  lyric: String,
  size: String,
  type: { type: String, default: 'wav' },
  createdTime: { type: Date, default: Date.now() },
  lastupdTime: Date,
  hot: { type: Number, default: 0 },
  from: { type: String, default: '英雄联盟(LOL)' },
  character: { type: Schema.Types.ObjectId, ref: 'character' },
  key: { type: String, unique: true } // name-from
}, {
  collections: 'voice'
})

module.exports = mongoose.model('Voice', voiceSchema)