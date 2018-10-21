const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
  name: String,
  src: String,
  srcWeb: String,
  size: String,
  type: { type: String, default: 'image/jpeg' },
  lastUpd: { type: Number, default: curTime },
  hot: { type: Number, default: 0 },
  position: { type: String, default: '' }, // head, cover, skin,
  from: { type: String, default: '英雄联盟(LOL)' },
  character: { type: Schema.Types.ObjectId, ref: 'character' },
  key: { type: String, unique: true } // name-from
}, {
  collections: 'image'
})

module.exports = mongoose.model('Image', imageSchema)