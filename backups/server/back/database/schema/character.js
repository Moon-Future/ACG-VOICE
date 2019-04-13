const mongoose = require('mongoose')
const Schema = mongoose.Schema

const characterSchema = new Schema({
  name: String,
  nickName: String,
  from: { type: String, default: '英雄联盟(LOL)' },
  sex: { type: Number, default: 1 }, // 男 1, 女 0
  age: { type: Number, default: 18 },
  birth: { type: Date, default: Date.now() },
  alias: { type: Array, default: [] },
  spell: String,
  avatar: String,
  avatarOfficial: String,
  key: { type: String, unique: true }, // name-form
  voice: [{type: Schema.Types.ObjectId, ref: 'voice'}],
  image: [{type: Schema.Types.ObjectId, ref: 'image'}]
}, {
  collections: 'character'
})

module.exports = mongoose.model('Character', characterSchema)